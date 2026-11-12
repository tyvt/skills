# dsh-orchestrator-gate 设计文档（v9）

> 目标：让**所有后续会话**中「本应走 `orchestrate` 编排器的重活」无法被宿主直接执行，只能经编排器。
> 模式：**B 硬强制**（guard 逐调用拦截）｜生效范围：**全部会话全局**｜形态：**零依赖本地插件**。
> **v9 修订（八审）**：§3.4 移除 `ForEach-Object` 查找豁免（pipeline 执行器，脚本块按执行拦）(🟠1)、cost_bill.py 搜索豁免补 grep/rg/Select-String 避免误拦 `grep "cost_bill.py" logs/`(🟠2)、currentPath 初始化改 `exec.cwd ?? repoRoot` 并处理 `cd` 无参/`Set-Location -Path`(🟠3)、bash/terminal 字段多字段探测兜底(🟡4)、pathInSessions 改路径段匹配(🟡5)、npx 先剥前置再判 --version(🟡6)。
> **⚠️ 迭代收敛**：八轮审查把 §3.4 的边角豁免逐步收紧，剩余问题已降至"局部豁免边界"。**本轮起停止纸面迭代，进入编码**——把 §3.4 伪代码直接翻成代码 + selftest 用例兜边界，比继续在文档里推演更可靠。

---

## 1. 背景与现状（数据事实）

扫描 `~/.dsh/sessions/**/session.v4.jsonl.zstd`，最近 7 天 288 个有工具调用的会话：

- `orchestrate` 仅 **21 次**；`pwsh` **11,174 次**、`read` 4,654 次、`grep` 2,517 次。
- 全量 build/lint/`vue-tsc`/`tsc` **直跑 585 次**，其中 **582 次发生在完全没有 orchestrate 的会话**。
- 无 `offset/limit` 的整读 **1,535 次**。

结论：编排器在真实使用中基本被绕过。口头规则（`dsh-token-policy`）拦不住，需运行时硬拦截。

---

## 2. 为什么用 `tools.guard()` 而不是别的钩子

| 候选钩子 | 能否真拦截 | 结论 |
|---|---|---|
| `session/event` | 否，只读观测 | 仅用于记账/统计 |
| `agent/pre-step` (waterfall) | 半：`enter` 只能注入提示；`reject` 会以 `blocked` **终止整个 turn**，不能只拒一步 | 不作为主拦截 |
| `tools/pre-execute` (waterfall) | 能返回 `{kind:'deny', reason}` | **但**：工具注册表在 agent plane，插件在 host plane，跨 plane 收不到事件（`agent-guard` 源码实证，见 §8） |
| **`ctx.tools.guard(fn)`** | 能：返回字符串即拒绝该次执行，模型收到 `Error: <reason>` | ✅ **唯一可靠的强制点**，且单调不可被强放行 |

### 关键源码依据（已核对）

- `dsh-tools/lib/types/index.js`
  - `guard(guard)`（L531）：`synchronous check; a returned string denies the execution`，存在注册表 layer，`guardReason(exec)` **每次执行前**都跑，全局 layer 对所有作用域生效。
  - `prepareExecution`（L875-908）：`const denialReason = decision.kind === 'allow' ? this.guardReason(exec) : decision.reason;` → 若 `denialReason !== undefined`，把 `Error: ${denialReason}` 作为 `isError` 的 tool 结果返回给模型。**即被拦截时模型看到的是普通 tool 报错，可带明确改法**。
- `dsh-agent-loop/lib/index.js`
  - `agent/pre-step`（L909）waterfall；`reject` → `turnEnds={kind:'blocked'}`（L960-963），整轮终止，故不用于逐工具拦截。
- `dsh/agent-guard/lib/index.js`（L150-232）：生产范例，明确「host 侧 `ctx.on('tools/pre-execute')` 收不到事件，`ctx.tools.guard()` 是唯一可靠拦截点」。

---

## 3. 拦截规则（判定表）

`guard(exec)` 拿到 `exec.name`（工具名）与 `exec.arguments`（已深度冻结的 JSON）。命中下表即返回拒绝字符串。

> **v2 修订（基于审查意见）**：§3.1/3.2/3.4 逻辑已改；§3.3 记忆集前提已源码核实；新增 §3.6 误伤与逃生舱。

### 3.0 判定分两层：先分类，再匹配

实现时**必须区分**两种"放行"，避免误加白名单分支（审查 #6）：

- **A 类｜天然放行**：不命中任何规则的工具/参数（`edit`/`write`/`mcp_gateway`/`skill`/`todo_write`/`git`/`Get-ChildItem` 窄列举/带 range 的 read·grep/单条 SQL 等）。**不需要在白名单里列举**。
- **B 类｜白名单放行**：**命中规则字符串但需豁免**的窄例外，只有这几条：`orchestrate` 本身、单文件 `eslint`、单文件级 `tsc/vue-tsc`、子 ctx（`delegationDepth>0`）。

### 3.1 硬拦：全量 build / lint / 类型检查（需 argv 解析，非单条正则）

工具：`pwsh` / `bash` / `terminal`，字段 `arguments.command`（已核实 pwsh 参数名为 `command`，见 §8）。

**实现方式**：不做纯正则，改**轻量 argv 解析**——把 `command` 按常见 shell 分隔符切成简单指令段，识别 `npm|pnpm|yarn [run] <script>`、`npx|pnpm exec <bin>`、直接 `<bin>` 三类。审查 #3：

- **npm/pnpm/yarn**：`<script>` **精确匹配**（修 🟡：`rebuild`/`prebuild` 不误伤）——script 名 == `build`/`lint` 或以其为 `:` 前缀变体（`build`、`build:*`、`lint`、`lint:*`）→ 拦；不按子串。
- **公共前置（修五审 🟡6 + 六审 🟡6 + 七审 🟡4 + 八审 🟡6）**：**bin 集合以 §3.1 各子规则出现的为限** = `{npm, pnpm, yarn, npx, eslint, tsc, vue-tsc, vite}`。规则：**先剥 `npx`/`pnpm exec`/`npm exec` 等前缀取真实 bin**（如 `npx eslint --version` 取 bin=eslint），若该 bin **直接**跟 `--version`/`--help`（或 `-v`/`-h`）、且无其他执行性参数 → **放行**（纯查询、无副作用）；`npx --version`（npx 自身版本）同样放行。⚠️ **`npm/pnpm/yarn run <script> --version` 不适用本豁免**：`--version` 是传给脚本的参数，命令实际执行了 build/lint → 仍按该脚本规则判定。此条优先于下述各自规则。
- **vite**：`vite build <任意参数>` → 拦（vite 无 `build:*` 子命令）。`vite dev/preview` 放行。
- **eslint**：解析位置参数（去掉以 `-` 开头的选项；`npx [-y] eslint ...` 先剥 `npx` 与 `-y` 等前置选项再取 bin）：
  - **无位置参数且仅有 `--version`/`--help` → 放行**（见公共前置）；无位置参数（默认 cwd 递归）则拦。
  - 存在目录／存在通配符（`*` `?` `**` 或含 `*` 的串）→ 拦。
  - **仅当**所有位置参数都经 `fs.statSync(p).isFile()` 确认为**单个具体文件** → 放行（通配符一律视为非单文件）。
  - **statSync 基准（修三审 🔴2）**：相对路径按**段所在工作目录**解析——若该段前有 `cd`/`Set-Location`/`pushd` 前缀**或路径非绝对**，则**不做 statSync 单文件放行**（无法可靠定位 → 保守拦）。仅当路径是**绝对路径**（或能从 exec 工作目录可靠解析）时才用 `isFile()` 判定。statSync 抛异常一律按"非单文件 → 拦"处理，绝不让异常变成 fail-open 放行。
- **tsc / vue-tsc**：**统口径，不按工具名区分**。规则：解析 `-p/--project <path>`：
  - `<path>` 指向 **工程级配置**（`tsconfig.json` 等，非 `.ts` 单文件）→ 视为全量类型检查 → 拦。
  - 带 `--build`/`-b` → 拦。
  - **`tsc --version`/`--help` → 放行**（见公共前置）；**bare `tsc` / `tsc --noEmit`（无文件、无 `-p`、无 `-b`、无 version/help）→ 拦**。
  - **仅当**命令显式只检查单个文件（`tsc <绝对路径 file.ts> --noEmit`，且路径经 statSync 确认为 `.ts/.tsx` 文件）→ 放行；相对路径 + `cd` 前缀同 eslint 处理（保守拦）。
  - 一句话口径：**除显式单文件（且路径可绝对定位）或 --version/--help 外，其余 tsc/vue-tsc 调用一律拦**。
- 命令行里出现 `build`/`lint` 关键词但**不是执行**该脚本的（`echo "npm run build"`、git commit message、日志 grep）见 §3.6 误伤控制。

### 3.2 硬拦：仓库根 / 容器级 grep（放行条件收紧）

工具：`grep`

**需先确定"仓库根"**（修 🟠6）：来源优先级 `config.repoRoots`（按 cwd 前缀匹配最长的那个）→ `exec` 上下文的 workspace root。**取不到 repoRoot 时（修三审 🟠5）**：只拦 `path` 缺省/空/`.` 这三类**明确根级**形态；对**非空相对路径保守放行**并计 `counters.errors++`（提示 repoRoot 缺失），而不是一律拦（否则会误拦所有 grep，与"低误伤"灰度冲突）。是否"取不到就全拦"设为显式配置 `grepFailClosedWhenNoRepoRoot`（默认 false）。

**命中**：`path` 缺省（= 仓库根）、为空、`.`、或等于某个 repoRoot/其盘根前缀。

**放行条件（唯一）**：`path` 指向**具体模块目录**——规范化后**相对 repoRoot 的路径深度 ≥ `grepMinDepth`（默认 2）**，或命中 `moduleRoots` 白名单（如 `src/views/`、`dsh/`）。

⚠️ **`include` 不再单独作为放行条件**（审查 #1）：`include` 缩窄的是文件类型而非目录范围，`grep -r --include=*.ts .` 仍全仓扫描。include 只在"path 已合规"之外**额外**收窄，不改变放行判定。

理由：全仓 grep 打穿 prefix cache（bug6369 反样本，单步未命中 18k）。

### 3.3 硬拦：无 range 整读大文件

工具：`read`（字段 `file_path`/`offset`/`limit`）

guard 是**同步**函数，不能 `await` 读行数（审查 #5 相关）。双规则：

- **规则 3.3a（重复整读硬拦，零 IO、确定性）**：维护 **per-session**「已完整读过的文件」集。同会话再次**无 range 整读**同一文件 → 拦。理由文案**不承诺具体行号**（guard 同步、无行数，修 🟡）：`该文件本会话已整读过，请改用 offset 续读后半段，或先 grep 定位目标行再读`。
  - **前提已核实**：sessionId 可得——`exec.agent?.session?.header?.id`（与 `agent-guard` 取法一致，见 §8）。**故记忆集可按会话隔离，无跨会话污染**；若为 `exec.agent===undefined` 的全局执行，则退回不启用记忆集（只走 3.3b）。
- **规则 3.3b（字节近似门禁）**：`fs.statSync(file_path).size` 超阈值（`.vue` > 60KB / 其他 > 40KB，可配）且无 offset/limit → 拦。**判定（修四审 🟡4，写成可执行分支）**：
  - **绝对路径**：statSync 取 size，按阈值判定（超阈值 → 拦）。
  - **相对路径**：3.3b **不适用**（不取 size、不据此拦也不据此放行），仅 3.3a 仍适用。
  - **statSync 抛异常**：同相对路径——3.3b 不适用，交给其它规则；不吞成 fail-open。
  - 字节↔行数：`.vue` 约 60KB≈400~600 行、其他 40KB≈350~500 行（与 token-guard 行数门禁 500/300 目标一致，保守偏紧）。

### 3.4 硬拦：账单 / 大结果查询绕过编排器

工具：**`pwsh` / `bash` / `terminal`**（**命令字段多字段探测**：依次取 `arguments.command` / `arguments.script` / `arguments.cmd`，取到即用；均取不到则 bash/terminal 的 §3.4 为**已知未覆盖**，待 §7 实测项 **M3** 确认后生效——不静默假设已覆盖，修八审 🟡4）。与 §3.1 工具集合一致（修七审 🟠2）。

**判定（修四~八审）**——对 §3.6 按序切出的**每一段**取 argv，维护 `currentPath` 与派生 `inSessions = pathInSessions(currentPath)`：

```
currentPath = exec.cwd ?? repoRoot ?? null   # 修八审 🟡3：exec.cwd 优先，repoRoot 仅 fallback
for seg in 段序列:
  head = seg.argv[0]
  # (a) cd 链跟踪（修七审 🟠3 + 八审 🟡3）
  if head ∈ {cd, Set-Location, pushd}:
      target = 提取 path 参数（支持 `Set-Location -Path x` 剥 `-Path`；`cd` 无参数 → target='~' 视为不变）
      if target is null or currentPath is null:
          # 无法可靠定位 → 保守（硬强制宁可误拦）：后续按"在 sessions 内"处理
          currentPath = null; inSessionsFallback = true
      elif isAbsolute(target):    # node:path.isAbsolute，按平台（修七审 🟡7）
          currentPath = normalize(target)
      else:
          currentPath = normalize(join(currentPath, target))   # 相对/含 .. 拼接规范化
      # 注：cd 失败时后续命令在旧目录执行——预执行固有限制，按拼接成功假设，接受（修七审 🟡6）
      continue
  if currentPath is null: inSessions = inSessionsFallback        # 定位失败时保守
  else: inSessions = pathInSessions(currentPath)                  # 每段重算
  # (b) 纯数据/打印段跳过（在 buildLintNonExecHeads 且 不在 dataReadHeads）
  if head ∈ buildLintNonExecHeads and head ∉ dataReadHeads:
      continue
  # (c) cost_bill.py —— 区分"查找/搜索"与"执行/读取"（修五~八审）
  if seg.argv 含 "cost_bill.py":
      # ForEach-Object 是 pipeline 执行器，不豁免（修八审 🟠1）；其余搜索头可豁免
      searchHead = head ∈ {find, ls, dir, Get-ChildItem, Where-Object, Select-Object, grep, rg, Select-String}
      hasExecToken = 该段含 {--exec, -exec, -execdir, -ok, -okdir, -Command, Invoke-*, Start-Process}
      hasScriptBlock = 该段含 { ... } 脚本块（如 Where-Object { ... }）
      if searchHead and not hasExecToken and not (hasScriptBlock and 块内含执行类 token/命令):
          pass          # 搜索/过滤文件名或字符串（含 grep "cost_bill.py" logs/），不拦
      else:
          → 拦        # -exec/执行 token/ForEach-Object 脚本块执行/python cost_bill.py 等
  # (d) 读取类 + .sessions（含 cd 进入的 inSessions）
  if head ∈ dataReadHeads and (inSessions or 任一 arg 含 ".sessions"):
      → 拦
```

> `pathInSessions(p)`：按**路径段**匹配 `/[/\\]\.sessions([/\\]|$)/`（修八审 🟡5），`.sessions_backup` 不算；硬强制下宁可偏保守。

验证（含五~八审新增用例）：

| 命令 | 判定 |
|---|---|
| `python cost_bill.py` | (c) 执行 → **拦** ✅ |
| `cat .sessions/bill.json` | (d) 读取类 + .sessions → **拦** ✅ |
| `echo cost_bill.py` | (b) echo 跳过 → **放行** ✅ |
| `git commit -m "cost_bill.py"` | (b) git 跳过 → **放行** ✅ |
| `Select-String x .sessions` | Select-String ∈ dataRead → (d) 拦 ✅ |
| `cd .sessions && cat bill.json` | (a) cd 进入 inSessions → (d) cat 读取类 + inSessions → **拦** ✅（修五审 🟡4） |
| `echo "cd .sessions && cat bill.json"` | echo 段 (b) 跳过；引号内不切段 → **放行** ✅ |
| `find . -name "cost_bill.py"` | (c) cost_bill.py 仅在 `-name` 值、无 -exec → **放行** ✅ |
| `Get-ChildItem -Filter "cost_bill.py"` | 同上 → **放行** ✅ |
| `find . -name "cost_bill.py" -exec python {} \;` | (c) 含 -exec → **拦** ✅ |
| `Get-ChildItem \| ForEach-Object { python cost_bill.py }` | (c) ForEach-Object 是执行器、脚本块执行 → **拦** ✅（修八审 🟠1） |
| `grep "cost_bill.py" logs/` | (c) grep 搜索头、无执行 token → **放行** ✅（修八审 🟠2） |
| `grep "bill" .sessions/` | (d) grep ∈ dataRead + arg 含 .sessions → **拦** ✅ |
| `cd .sessions && cd sub && cat bill.json` | (a) currentPath 仍含 .sessions → (d) **拦** ✅ |
| `cd .sessions && cd .. && cat bill.json` | (a) currentPath 离开 .sessions → (d) 未命中 → **放行** ✅ |
| `cd .sessions/sub && cat bill.json` | (a) 相对路径纳入 currentPath、含 .sessions → (d) **拦** ✅ |
| exec.cwd=`repo/sub` 时 `cd .sessions && cat bill.json` | (a) 从 exec.cwd 拼接 → .../sub/.sessions → (d) **拦** ✅（修八审 🟡3） |
| `Get-ChildItem \| Where-Object { $_.Name -eq "cost_bill.py" }` | 查找类、脚本块无执行 token → **放行** ✅ |

⚠️ **删去"且非经 orchestrate"表述**（审查 #2）——进入本 guard 的 pwsh 天然就是宿主直跑；编排器内部是否触发 guard 统一由 §3.0 的 `delegationDepth>0` 放行处理。
| `find . -name "cost_bill.py" -exec python {} \;` | (c) 含 -exec → **拦** ✅（修六审 🟡4） |
| `cd .sessions && cd sub && cat bill.json` | (a) currentPath=.sessions/sub 仍含 .sessions → (d) **拦** ✅（修六审 🟠2/七审 🟠3） |
| `cd .sessions && cd .. && cat bill.json` | (a) currentPath 规范化为仓库根，不再含 .sessions → (d) 未命中 → **放行** ✅（精确判定，已真离开） |
| `cd .sessions/sub && cat bill.json` | (a) currentPath=.sessions/sub 含 .sessions → (d) **拦** ✅（相对路径也纳入） |
| `Get-ChildItem -Recurse \| Where-Object Name -eq "cost_bill.py"` | Where-Object ∈ 查找类、无执行 token → **放行** ✅（修六审 🟡5） |
| `Get-ChildItem -Recurse \| Where-Object { $_.Name -eq "cost_bill.py" }` | 脚本块写法，无执行 token → **放行** ✅（修七审 🟡5） |

⚠️ **删去"且非经 orchestrate"表述**（审查 #2）——进入本 guard 的 pwsh 天然就是宿主直跑；编排器内部是否触发 guard 统一由 §3.0 的 `delegationDepth>0` 放行处理。

→ 提示改用 `orchestrate op=tool`。

### 3.5 白名单放行（仅 B 类，见 §3.0）

- `orchestrate` 本身（op=list/full/tool）——**永不拦截**。
- **子 ctx 放行（已源码核实）**：`exec.agent?.session?.header?.delegationDepth > 0` → 放行。`delegationDepthOf()` 读的正是 `agent.session.header.delegationDepth`（见 §8 `dsh-subagent` L111-114）。这条**同时**覆盖编排器内部子 agent 的 `pwsh`/`file_reader`/`code_editor`，是防止"把编排器自己锁死"的关键，**必须默认开**。
- 单文件窄 `eslint`（§3.1 已解析判定）。
- 单文件级 `tsc/vue-tsc`（§3.1 统一口径）。

### 3.6 误伤控制与逃生舱（审查 #4）

**固有误伤场景**（正则/argv 匹配 `command` 字符串难免命中）：
- `echo "npm run build"` / `Write-Output "...lint..."`：命令**只是打印**关键词，不执行。
- `git commit -m "修复 npm run build 报错"`：commit message 含关键词。
- `grep "npm run build" logs/`：在日志里**搜**关键词。
- `cat package.json | Select-String "build"`：读取而非执行。

**缓解措施（v3 重写，修 🔴1/🔴2/🔴3）**：

1. **切段**（修 🔴2）：按**引号感知**的分隔符切段：`;` `&&` `||` `|`（PowerShell 的 `|` 也是 pipeline，右段独立检查）。切分时跟踪引号状态，引号内分隔符不切。**`\n` 仅对脚本文件场景有意义**（修五审 🟡7）：pwsh 工具传入的多为单行 `command`，`\n` 罕见，主要靠 `;`/`&&`/`||`/`|`；不要把换行处理过度设计（`-Command` 字符串里的 `\n` 常是续行，不宜当语句分隔）。
2. **每条规则对每一段"各自"做首 token 判定**（修三审 🔴1 + 四审 🟠3：**不存在跨规则统一的"skip 段"概念**——正是这个含混术语会让实现者把 `cat .sessions` 段对 §3.4 也跳过而漏拦）。具体：
   - **两份列表，各管各的规则**（不共用含混列表）：
     - `buildLintNonExecHeads`（**仅供 §3.1** 判"非 build/lint 执行头"）：`echo` `Write-Output` `Write-Host` `git` `grep` `Select-String` `cat` `Get-Content` `rg` `type`。首 token ∈ 此列表 → **§3.1 跳过该段**。
     - `dataReadHeads`（**仅供 §3.4** 判"读取类"）：`cat` `Get-Content` `Get-ChildItem` `Select-String` `rg` `grep` `find` `dir` `ls` `type`。首 token ∈ 此列表 → 进入 §3.4 读取类判定。
   - **§3.1 的跳过条件**：`head ∈ buildLintNonExecHeads`。（cat/grep 等读取头对 §3.1 跳过，不误报 build。）
   - **§3.4 的跳过条件**：`head ∈ buildLintNonExecHeads && head ∉ dataReadHeads`（只有 echo/git/Write-Output 等**纯数据/打印头**才对 §3.4 跳过；cat/grep/Select-String 因 ∈ dataReadHeads 而**不跳过**，继续做读取判定）。
   - 效果：`cat .sessions/bill.json` → §3.1 skip（不误报 build），但 §3.4 **不**跳过（cat ∈ dataRead）→ 命中读取类 + `.sessions` → 拦 ✅；`echo cost_bill.py` → §3.4 跳过 → 放行 ✅。
   - `cd`/`Set-Location`/`pushd` 不在任何 skip 列表，自身不命中 build/lint，但后续段独立检查 → `cd x && npm run build` 第二段被拦。
3. **不删引号内容，改词级 shell 解析**（修 🔴3）。对需要匹配的段按空白切词、去词两侧配对引号、**保留词内容**得 argv：
   - `npm run "build"` → `['npm','run','build']` → 命中 ✅
   - `git commit -m "npm run build"` → 首 token `git` ∈ buildLintNonExecHeads → §3.1 skip → 不命中 ✅
   - `Get-Content x | Select-String "build"` → 两段首 token ∈ buildLintNonExecHeads → §3.1 skip；但 §3.4 判读取类：若 arg 无 `.sessions` → 不拦 ✅
4. **逃生舱：不提供给模型，用户操作说明（无 guard 层感知机制）**（修 🔴1 + 三审 🟠4）。
   - **拒绝文案里绝不出现任何可用标记/token**（见 §4.2）。
   - §3.6-4 的"用户授权"**不是 guard 能感知的机制**：用户若确需直跑，只能**自己改 config**（`config.enabled:false` 或临时关某规则）再让模型执行。**前提：模型对插件 config 目录无写权限**（见 §7 实测项；若有写权限则逃生舱失效，优先级高于一切其它绕过）。
   - 软逃生：拒绝只是一次 `isError` tool 返回，**不阻塞 turn**，模型可改用 `orchestrate` 或缩到单模块重试——这是合规引导，不是绕过。
5. **外壳包装绕过（已知边界，不实现递归解析）**（修三审 🟠3 + 四审 🟠6）：`& npm run build`、`Start-Process npm ...`、`cmd /c "npm run build"`、`bash -c "npm run build"`、`pwsh -Command "npm run build"`、`.\build.ps1` 等首 token 不在识别/跳过列表 → **当前设计不覆盖，放行**。但**要可观测**：识别到段首 token ∈ `{&, Start-Process, cmd, bash, pwsh, sh}` 或匹配 `.\*.ps1`/`.sh` 时，`counters.shellWrapped++` 并 log.warn（不拦但在 notice/统计暴露），否则用户永远不知道多少 build 走外壳绕过了、硬强制实际覆盖率不可知。写入 §6 风险表；如需真正覆盖须递归解析参数串（复杂度爆炸，暂不做）。

> 配置项 `matchFirstSegmentOnly` 已弃用，改名 `matchAllExecutionSegments`（默认 true），语义反转避免埋坑。

---

## 4. 插件结构

```
dsh/orchestrator-gate/
├── package.json          # name: dsh-orchestrator-gate, type:module, dsh.bundle.patch
├── cordis.patch.yml      # 挂载 id/name/config
├── lib/
│   └── index.js          # export name / inject=[] / apply(ctx, cfg)
├── selftest.mjs          # 函数级自测（decideInterception 各分支，含 statSync 桩）
└── DESIGN.md             # 本文件
```

### 4.1 `lib/index.js` 骨架（思路，非最终代码）

```js
export const name = 'orchestrator-gate'
export const inject = []

// 判定函数：无 IO（statSync 除外，见 3.3b 说明）、只依赖入参 + 只读 config。
// 记忆集不在函数内读写，由调用方传入布尔 alreadyWholeRead（修三审 🟠6，保持可 selftest）。
export function decideInterception({ tool, args, config, session, isSubagent, alreadyWholeRead }) {
  // 返回 string = 拒绝理由；返回 null = 放行
  if (tool === 'orchestrate') return null
  if (config.passThroughSubagents && isSubagent) return null   // delegationDepth>0
  // 3.1 build/lint/typecheck：parseSegments(args.command) → 逐段 argv 判定（见 §3.6）
  // 3.2 根级 grep：path 深度/模块白名单（include 不作为放行依据）
  // 3.3a read：alreadyWholeRead===true 且无 offset/limit → 拦
  // 3.3b read：无 offset/limit + fs.statSync(file_path).size 超阈值 → 拦
  // 3.4 账单直查：head∈buildLintNonExecHeads 且 head∉dataReadHeads → 跳过该段；
  //     否则 argv 含 cost_bill.py → 拦，或 head∈dataReadHeads 且 arg 含 .sessions → 拦
  return null
}

import { statSync } from 'node:fs'   // 3.3b 字节门禁
// normalizeConfig / log：照 cost-meter 范式（config 归一 + 插件 logger），此处省略

// counters 作为可注入对象（修 🟡：selftest 可断言）
export function apply(ctx, raw, { counters = { rejected: 0, errors: 0 } } = {}) {
  const config = normalizeConfig(raw)
  const sessionWholeReads = new Map()            // sessionId -> Set(file_path)，3.3a（读写都在此层）
  if (!config.enabled) return
  const disposer = ctx.tools.guard((exec) => {
    try {
      const sess = exec?.agent?.session?.header    // { id, delegationDepth }
      const tool = exec?.name
      // 3.3a 记忆集：读 → 判定 → 写入，均在本回调（decideInterception 只收布尔）
      const memo = sess?.id !== undefined ? sessionWholeReads.get(sess.id) : undefined
      const alreadyWholeRead = tool === 'read' && isWholeRead(exec?.arguments) && (memo?.has(exec?.arguments?.file_path) ?? false)
      const hit = decideInterception({
        tool, args: exec?.arguments, config,
        session: sess?.id,                                   // 审查 #4：传 session
        isSubagent: (sess?.delegationDepth ?? 0) > 0,        // 审查 #4：传 isSubagent
        alreadyWholeRead,
      })
      // 仅在放行后记录"已整读"（被拦的不记，否则永远第二次才拦）
      if (!hit && tool === 'read' && sess?.id !== undefined && isWholeRead(exec?.arguments)) {
        if (!sessionWholeReads.has(sess.id)) sessionWholeReads.set(sess.id, new Set())
        sessionWholeReads.get(sess.id).add(exec?.arguments?.file_path)
      }
      if (hit) { counters.rejected++; log?.warn?.('orchestrator-gate: rejected %s: %s', tool, hit); return hit }
    } catch (e) { counters.errors++; log?.warn?.('orchestrator-gate error', e) }   // 审查 #7：errors 计数，超阈值告警
    return undefined
  })
  ctx.on('dispose', () => disposer?.())
}
// isWholeRead(args)：offset 与 limit 均缺省 → true。同 agent-guard 的 isWholeFileRead 口径。

### 4.2 拒绝文案模板（会被注入为 `Error: <reason>` 返回给模型）

```
[orchestrator-gate] 该操作必须走 orchestrate 编排器，禁止宿主直跑。
操作：<tool> <摘要>
改用：orchestrate {op:"full", request:"<把原命令意图写在这里>"}
或：orchestrate {op:"tool", tool:"pwsh", request:"<原命令>"}
（本规则全局强制。若确需直跑窄命令，请先缩到单文件/单模块。）
```

> **对模型可见的文案里不含任何 bypass token**（修 🔴1）。用户若确需临时直跑，**只能由用户本人修改 config**（`enabled:false`；若规则开关未硬编码，也可临时关闭对应规则）或卸载 patch 后执行——guard **不读**模型可写或对话可写的任何标记，故不存在"对话中授权"通道（修四审 🟠2 + 六审 🟡3）。

### 4.3 配置项（cordis.patch.yml config）

```yaml
enabled: true
scope: global              # global | workspace-list
blockBuildLint: true
blockRootGrep: true
blockWholeRead: true
blockBillingBypass: true

# 3.2 grep：path 合规判定
repoRoots:                 # 仓库根（按 cwd 前缀最长匹配）；缺省 fallback 视为仓库根→拦
  - "D:\\repository\\skills"
moduleRoots:               # 具体模块目录白名单（path 命中其一即放行）
  - "src/views/"
  - "dsh/"
grepMinDepth: 2            # 相对仓库根的路径深度 >= 此值视为"具体模块目录"
grepFailClosedWhenNoRepoRoot: false   # 取不到 repoRoot 时是否一律拦（默认 false=相对路径保守放行+计 errors）

# 3.3 整读门禁
wholeReadBytesVue: 61440   # 60KB
wholeReadBytesOther: 40960 # 40KB
wholeReadDedup: true       # 3.3a 同会话重复整读硬拦

# 3.1 类型检查口径
tscTreatProjectFlagAsFull: true   # -p tsconfig.json(工程级) 视为全量，拦
allowSingleFileTsc: true          # 仅单文件显式 tsc <file> --noEmit 放行
blockBareTsc: true                # bare tsc / tsc --noEmit 视为全量，拦
allowSingleFileTscNoEmit: false   # true 时 `tsc foo.ts`（单文件编译、不带 --noEmit）也放行；默认拦（走 orchestrate）

# 3.6 误伤控制
matchAllExecutionSegments: true   # 匹配所有段，各规则各自做首 token 判定（替代已弃用的 matchFirstSegmentOnly）
quoteAwareSplit: true             # 切段/切词均跟踪引号状态
# 注：无 escape-hatch token——逃生舱为用户侧动作：只能由用户本人修改 config（改 enabled 或临时关规则），
#     guard 不读模型可写或对话可写的标记，无"聊天显式授权"通道

# 放行
passThroughSubagents: true        # delegationDepth>0 放行（编排器内部，已核实字段）
```

---

## 5. 部署与回滚

- 挂载：与 cost-meter 一致——`package.json` 的 `dsh.bundle.patch` + `cordis.patch.yml` 的 `insert`。
- 生效：**需重启 Web**（与 cost-meter 改动一致，装的是安装副本）。重启前用 selftest 验证纯函数。
- 回滚（修五审 🟠2：按 §7.5 选的方案分两种）：
  - **若未采用 §7.5 方案 B（规则开关仍在 config）**：`config.enabled: false` 即全关（无需卸载）。
  - **若采用 §7.5 方案 B（核心规则开关硬编码、模型不可改）**：`enabled` 总开关保留在 config 并**由方案 A 的只读锁保护**，用户在有权限的账户下改 `enabled:false` 仍可全关；若连 config 也不可写，则回滚需**删除 patch insert 并重启 Web**（此为方案 B 的已知代价，已在 §7.5 声明）。
  - 两种都可在配置目录可写时用"删除 patch insert"作为最终兜底。
- **灰度顺序（已按审查 #5 调整）**：
  1. 先开 `blockRootGrep`（§3.2，不依赖记忆集，低误伤）。
  2. 再开 `blockWholeRead` **但先验证 3.3a 记忆集隔离**（sessionId 已核实可得，但仍需实测跨会话无污染）后再开。
  3. 最后开 `blockBuildLint`（§3.1，argv 解析最复杂、误伤面最大），且**必须在 §7 实测项 M1（子 ctx 是否触发 guard）结论出来之后**。
  4. `passThroughSubagents` 全程保持开。

---

## 6. 风险与误伤控制

| 风险 | 控制 |
|---|---|
| 误拦正常窄命令 | 3.0 区分 A/B 类；B 类白名单（orchestrate/单文件 eslint/单文件 tsc/子 ctx）；`enabled` 一键关 |
| 命令字符串含关键词误伤（echo/commit/日志 grep） | §3.6 每规则各自首 token 判定 + 词级 shell 解析（不删引号内容） |
| 整读门禁靠字节数近似 | 阈值可配；3.3a 重复整读用确定性记忆集，3.3b 字节门禁偏保守 |
| 编排器内部子工具被误拦锁死 | `passThroughSubagents`：`agent.session.header.delegationDepth>0` 放行（字段已源码核实） |
| guard 跨会话记忆集污染 | 3.3a 按 `agent.session.header.id` 隔离；`agent===undefined` 时退回不启用记忆集 |
| guard 抛异常静默放行（硬强制失效） | 审查 #7：`counters.errors` 计数 + 超阈值告警，避免 bug 隐形 |
| 全局生效影响所有项目 | 用户已选全局；保留 `scope`/`moduleRoots` 可退化按工作区白名单 |
| guard 同步限制无法读行数 | 3.3a 零 IO 记忆集 + 3.3b `fs.statSync` 字节近似，不阻塞 |
| skip 列表与 §3.4 读取类重叠致账单漏拦 | **修三审 🔴1**：拆两份列表（`buildLintNonExecHeads` 管 §3.1、`dataReadHeads` 管 §3.4），各规则独立判定，不跨规则一刀切 |
| statSync 相对路径+`cd` 前缀 → 误拦或 fail-open | **修三审 🔴2**：有 `cd` 前缀或非绝对路径不做单文件放行（保守拦）；statSync 异常按"非单文件→拦"，不转 fail-open |
| **外壳包装绕过（已知边界，不覆盖但可观测）** | **修三审 🟠3 + 四审 🟡6**：`& npm run build`、`Start-Process`、`cmd /c`、`bash -c`、`pwsh -Command`、`.\build.ps1` 首 token 不在识别/跳过列表 → 放行但 `counters.shellWrapped++` + log.warn。列明为"硬强制"边界，不实现递归解析 |
| 用户侧"显式授权"缺 guard 层机制 | **修三审 🟠4**：删除"聊天授权 guard 可感知"表述，降级为用户操作说明（用户自己改 config）；前提模型对 config 无写权限（§7 实测） |

---

## 7. 落地前的实测/核实清单

**已源码核实（本轮完成，无需再测）**：

1. ✅ `exec` 携带会话与子 ctx 信息：`exec.agent?.session?.header?.id`（sessionId）与 `exec.agent?.session?.header?.delegationDepth`（子 ctx 深度）均可取。`dsh-subagent` 的 `delegationDepthOf(agent)` 即读 `agent.session.header.delegationDepth`。**→ 记忆集隔离与子 ctx 放行方案成立**（审查 #5、#2）。
2. ✅ `pwsh` 工具参数名为 `command`（`dsh-tool-pwsh` L466 `name:"pwsh"`、L474 `command`）。**→ §3.1 字段名确定**（原 §7.3 已解决）。
3. ✅ `read` 参数 `file_path/offset/limit` 与 token-guard 一致。
4. ✅ `token-guard` read 门禁为**行数**——`.vue` > 500 行、其余 > 300 行（`token-guard/lib/index.js` L237-238 `wholeGate`）。本插件 3.3b 用**字节**近似（同步限制），二者口径不同但目标一致。

**仍需实测（实现时打日志/写 selftest 前必须跑）。以下用字母编号 M1~M5，避免与上文序号混淆、杜绝每轮误读**：

- **M1. 子 ctx 是否真的触发本 guard**（最大风险点，必测第一项）：编排器 `orchestrate` 执行期间，其内部调 `pwsh`/`file_reader` 时，本 guard 是否被调用？若被调用，`delegationDepth>0` 放行是否生效？**结论出来前不得开 `blockBuildLint`**。
- **M2. `ctx.tools.guard` 在本插件 ctx 上确实收到 agent plane 工具调用**（`agent-guard` 已证可行，复用路径即可，落地时软验证一次）。
- **M3. `bash`/`terminal` 工具的命令字段名**（可能非 `command`）——落地时各打一条 log。
- **M4. exec 是否提供工作目录**：确认 `exec` 上下文有无 `exec.cwd` / `exec.agent.session.header.cwd`。若有，§3.1 单文件放行可对相对路径可靠 statSync；若无，则相对路径一律按保守拦。
- **M5. argv 解析是复杂度重心**：npm/pnpm/yarn/npx/bin 识别 + eslint 位置参数 statSync + tsc `-p`/bare + 引号感知切段切词。**selftest 用例数预估 40+**。

**selftest 必须覆盖的正反例（S 组，随实现跑）**：

- **S1｜误伤正反例**：反例 `echo "npm run build"`、`git commit -m "npm run build 报错"`、`grep "build" log`、`Write-Output "a|b"`；正例（拦）`cd src && npm run build`、`Set-Location x; pnpm lint`、`npm run "build"`、`npx "eslint" .`；放行 `pnpm run rebuild`、`eslint --version`、`tsc --help`。
- **S2｜skip/§3.4 交叉 + cd 链**：拦 `python cost_bill.py`、`cat .sessions/bill.json`、`Select-String x .sessions`、`grep "bill" .sessions/`、`cd .sessions && cat bill.json`、`cd .sessions && cd sub && cat bill.json`（相对子目录仍在 sessions）；放行 `echo cost_bill.py`、`git commit -m "cost_bill.py"`、`Write-Output "see cost_bill.py"`、`find . -name "cost_bill.py"`、`Get-ChildItem -Filter "cost_bill.py"`、`echo "cd .sessions && cat bill.json"`、`cd .sessions && cd .. && cat bill.json`（已离开）。
- **S3｜statSync 基准**：`cd packages/app && npx eslint src/foo.ts` 必须**保守拦**（相对路径+cd 前缀不做单文件放行），不得 fail-open。
- **S4｜外壳包装基线**：`& npm run build`、`cmd /c "npm run build"`、`pwsh -Command "npm run build"` 作为"已知放行+计数"的回归基线。
- **S5｜find -exec**：`find . -name "cost_bill.py" -exec python {} \;` 必须**拦**（-exec 触发执行，不适用仅查找豁免）。

---

## 7.5 模型对 config/插件目录的写权限（修三审 🟠4 + 四审 🟡5）

**优先级与 §7 实测项 M1（子 ctx 是否触发 guard）同级（甚至更高）**：它决定"用户侧逃生舱"是否存在。逃生舱（用户改 config）**仅在模型对 `cordis.patch.yml`/插件 config 无写权限时成立**；若模型可写，模型可自行 `config.enabled:false` 绕过——优先级高于所有规则。落地时**必须实测并确认**，并采用下述**至少一个可执行方案**（推荐两条并用）：

- **方案 A｜host 层只读锁**：将 `~/.dsh/orchestrator-gate/cordis.patch.yml` 及插件目录设为只读——Windows 用 ACL（`icacls <dir> /deny <运行账户>:(W)`）或只读挂载；模型以该账户运行时无法改写 config。
- **方案 B｜核心规则开关硬编码 + enabled 总开关保留（修五审 🟠2）**：把"是否拦截 build/lint/grep/账单/整读"的**规则开关硬编码进插件**（不进 config，模型不可关），但**保留 `enabled` 总开关在 config**——用于用户回滚。`enabled` 由**方案 A 的只读锁**保护（模型不可写）。这样同时满足：① 模型无法逐条关规则；② 用户在可写账户下仍能 `enabled:false` 一键回滚（见 §5）。**不用**"enabled:false 也不生效"这种会切断回滚的设计。
- **两方案并用**：A 锁 config 文件 + B 硬编码规则开关，是最优组合。若只能选一：选 A（保住回滚通道，规则开关仍在 config 但文件只读），或选 B 但必须接受 §5 里"回滚改为删除 patch insert + 重启"的代价。

若两条都不可行（模型必然可写且无法只读锁），则**声明逃生舱与逐条回滚都不存在**——硬强制完全依赖规则本身，误伤只能靠缩范围解决，全关只能卸载 patch。

---

## 8. 参考资料（源码位置）

- `D:\nvm\v22.23.2\node_modules\@deepseek-ai\dsh-tools\lib\types\index.js`
  - L531 `guard()`；L535 `guardReason`；L875-908 `prepareExecution` 的 deny 处理（拒绝转为 `Error: <reason>` 的 isError 结果）；L367/L2898 `exec.agent.session`。
- `D:\nvm\v22.23.2\node_modules\@deepseek-ai\dsh-agent-loop\lib\index.js`
  - L909 `agent/pre-step` waterfall；L960-963 `reject → turnEnds={kind:'blocked'}`。
- `D:\nvm\v22.23.2\node_modules\@deepseek-ai\dsh-subagent\lib\index.js`
  - L111-114 `delegationDepthOf(agent)` → `agent.session.header.delegationDepth`（子 ctx 放行判定依据）。
- `D:\nvm\v22.23.2\node_modules\@deepseek-ai\dsh-tool-pwsh\lib\index.js`
  - L466 `name:"pwsh"`；L474 参数 `command`。
- `D:\repository\skills\dsh\agent-guard\lib\index.js`
  - L150-232：`ctx.tools.guard` 生产范例与跨 plane 坑的实证；`exec?.agent?.session?.header?.id` 取 sessionId 用法。
- `D:\repository\skills\dsh\cost-meter\lib\index.js`
  - 插件整体范式（export name/inject/apply、config 归一、notice 注入、selftest）。
- `D:\repository\skills\dsh\token-guard\lib\index.js`：L237-238 read 行数门禁 `.vue>500 / 其余>300`；L265 `tools/post-execute` 折叠范例（本插件 3.3b 字节阈值据此对齐口径）。

---

## 9. 待用户确认后执行

本文档是设计稿（v9）。确认后我再：① 新建 `dsh/orchestrator-gate/` 四件套；② 写 `selftest.mjs` 覆盖 §3 每条规则正反例 + §7 的 S1~S5 组，并补八审新增 `ForEach-Object { python cost_bill.py }`（拦）、`grep "cost_bill.py" logs/`（放行）、exec.cwd 子目录下 `cd .sessions && cat`（拦）（预估 40+ 用例）；③ 跑 selftest 通过；④ 交付并说明「需重启 Web 生效」。**`blockBuildLint` 默认不随插件首启开启**，等 **§7 实测项 M1（子 ctx 是否触发 guard）** 与 **§7.5（config 写权限）** 两项实测通过再手动打开；`blockRootGrep` 可先灰度（不依赖 M1，误伤面最小，作首个"guard 能收到事件"验证点）。
