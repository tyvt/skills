---
status: approved
human_confirmed: true
approved_sha256: 6d5007e2189d9b80c185ccf9f55d5ee0981efc79e1130b0cc8b89330b8714273
approved_version: 1
session: heal-bad-debt-4fixes
created: 2026-11-13
---

# 架构级 Fix 方案：让模型更聪明、更省钱（4 个坏账 Fix）

## 1. 前因后果

上一轮构建性能排查（vite build 慢）复盘暴露四类「坏账」模式，每个都是模型白烧 token/时间的固定套路：

1. **报错文案不可执行**：agent-guard 拦下递归列举时只说「改用 glob 收窄」，模型原地试探，多走 1–3 步才纠正。
2. **长任务前台直跑**：模型在主模型前台直接跑 `vite build`，阻塞 + 海量日志回灌，触发多次 compaction（本机实测等效成本 ~1.03M，memory `vite_build_stuck`）。而编排器已有结构化执行通道，模型没被强制去用。
3. **一次性脚本裸写**：直接写 mjs / 复杂 pwsh 管道，环境不兼容（CommonJS vs `type:module`）、解析器行为误判，语法错反复自愈。
4. **盲猜式性能排查**：靠手动消融跑 4–5 次全量构建才定位真凶（1.85MB SVG 内联），无专用 profiling 入口。

本方案把四件事落到**已有代码的具体位置**，尽可能零新组件、可回滚、可观测。

## 2. 现状与证据（已核对代码）

基线：`agent-guard selftest` 98/98 pass；`orchestrator pytest` 137 pass（改动前记录，用于区分预存在失败）。

**Fix 1 落点**：`dsh/agent-guard/lib/scope.js`
- `pwshHint()` 第 104–105 行返回固定文案「改用 glob 指定 pattern，或 Get-ChildItem <具体目录> -Filter <通配> 收窄…」，无「可直接复制」的真实命令。
- glob/grep 拒绝文案在第 76–82 行，已是占位符 `<模块>`，非当前命令改写后的可复制串。

**Fix 2 证据**：执行通道已存在，不新建 runner。
- `src/execution.py` 第 20 行 `_PROGRAMS={git,python,node,npm,pnpm,bun}`，第 49–51 行白名单仅 `build/test/lint`，`subprocess` 隔离执行——「build/test 外包」已有归属。
- 缺口在**主模型侧**：`pwsh` 前台直跑 build 无任何告警/拦截（agent-guard `rules.js` 无 build/npm/vite 规则）。
- AGENTS.md 已有「长任务 watchdog」规则，但只覆盖「走编排器时监听」，未硬约束「预期 >30s 命令禁止前台直跑」。

**Fix 3 落点**：`src/graph.py`
- `PLANNER_SYSTEM`（第 55 行）**只管选工具**，不产出代码——不能在此塞「写代码自检」。
- 真正产出代码处：`code_editor`/`code_edit_with_signal` 分支第 1237–1239 行仅 insert `NO_LOCAL_FILE_SYSTEM`，是注入自检的唯一系统提示位；`pwsh` 生成分支第 1085–1099 行有独立 system prompt。

**Fix 4 落点**：`dsh-explore/SKILL.md` 是现成单文件 skill 模板（frontmatter + 正文）。新建 `vite-build-profiler/SKILL.md` 同类结构。

**结论**：四件都是**文本/规则级改动**，无 schema/依赖变更；Fix 2 是唯一有误伤风险的（新增拦截规则），默认 warn 灰度。

## 3. 分步实施方案（每步落哪个文件、怎么验证）

### Fix 1 — 报错文案带可复制示范（scope.js，纯文本）
- `pwshHint(command)`：用正则从原命令提取列表目标（`Get-ChildItem <path>` 的 path、`-Recurse` 是否带 `-Filter`），回填一条可直接复制的改写命令；无 path 时给 `<path>` 占位并提示先 `mcp__openviking__search` 定位。
- glob/grep 拒绝文案：把 `<模块>` 替换为「从当前 pattern 推导的目录占位 + 真实 pattern 语法」。
- 验证：`selftest.mjs` 新增 3 条断言（pwsh 提示含 `Get-ChildItem`+`-Filter`、glob 提示含 `pattern:`、grep 提示含 `include:`）；node selftest 保持 98+ 全绿。

### Fix 2 — 前台长任务告警（rules.js 新增规则 + AGENTS.md）
- `agent-guard/lib/rules.js` 新增 `warnForegroundBuild(tool,args)`：`tool==='pwsh'` 且命令**词边界**匹配 `\bnpm|\bpnpm|\bbun\b.*\b(build|test)\b|\bvite\s+build\b|\bpytest\b|\bvitest\b|\bjest\b`；**放行**条件按语法判定而非子串：命令含后台运算符 `&`、`Start-Job`、`Start-Process`、流式重定向 `*>`/`2>` 到文件时放行（管道 `|` **不放行**，管道到 `Select-Object` 仍是前台阻塞）。命中返回 warn（不改命令、不阻断，灰度）。
- 在 `lib/index.js` 的 warn 收集处注册（与 `warnPwshBuffering` 同队列）。
- AGENTS.md「长任务日志与半分钟监听」节补：预期 >30s 的 build/test/install 禁止前台直跑，改 `orchestrate{op:"full",execution:...}` 或 `run_in_background:true`；**与运行时一致，仅 warn 不阻断**。
- 验证：`selftest.mjs` 新增 5 条（npm run build 告警、npm test 告警、`&`/`Start-Job` 后台放行、`*> log` 放行、管道 `| Select-Object` 仍告警、非 pwsh 放行）。

### Fix 3 — 代码工具与 pwsh 生成注入「三秒自检」（graph.py）
- 新增常量 `CODE_SELFCHECK_SYSTEM`：写前**从给定上下文判断**是否需要 `type:module`（mjs/import 一致性）——不要求读取被禁的本地 `package.json`，改为「若上下文含 module/import 信息则遵循，否则默认 ESM 并在回复标注」；复杂 pwsh 管道先跑一条 `Write-Output` 验证解析器；禁止脚本内并发启动多个耗时任务（串行保基准）。
- **两处注入**：(a) 第 1238 行 `_NO_LOCAL_READ_TOOLS` 分支，`code_editor`/`code_edit_with_signal` 时 append；(b) 第 1085–1099 行 `pwsh` 生成 system prompt 末尾追加同一自检要点（pwsh 产码是独立系统提示，必须单点覆盖）。
- 验证：`pytest` 全绿；新增断言两处系统提示均含自检关键句（`test_tool_signal_split.py` 或新用例）。

### Fix 4 — 新建 skill（vite-build-profiler/SKILL.md）
- 结构仿 `dsh-explore`：frontmatter（name/description 触发「排查打包慢/包体积」）+「何时用/怎么用/产出/约束」。内容：优先 `rollup-plugin-visualizer` 或 `vite --mode production --report`，产出 treemap 报告路径，禁止盲猜消融。
- 验证：无自动化测试，人工核对 frontmatter 合法、正文可执行；为纯文档，按 AGENTS.md 不送 plan_review 的「纯文档」边界，但**本方案整体含代码，仍整篇送审**。

## 4. 风险与回滚

- **Fix 2 误伤**：新增 warn 规则可能对合法前台短作业刷屏 → 默认 **warn 灰度、不改命令、不阻断**；误报高则整条规则删掉即可回滚（单函数）。
- **Fix 1/3 纯文本**：只影响提示文案/系统提示，无行为分支，风险≈0；回滚=还原字符串。
- **Fix 4 新 skill**：新增文件，删目录即回滚；不影响宿主除非被显式加载。
- **通用回滚**：四件互相独立，可单件 revert；均在 git 仓库，`git checkout -- <file>` 即可。

## 5. 验证计划

1. 改动前基线已记录：agent-guard 98/98、pytest 137 pass。
2. 改动后重跑：`node selftest.mjs`（期望 ≥98 且新增用例全绿）、`python -m pytest -q`（期望 137+ 全绿）。
3. 手搓真实命令验证 Fix 1：发一条 `Get-ChildItem . -Recurse` 看拒绝文案是否带可复制命令；Fix 2 发 `npm run build` 看是否出 warn。
4. `git diff` 复核：显式只允许这 7 处改动 —— `dsh/agent-guard/lib/scope.js`、`dsh/agent-guard/lib/rules.js`、`dsh/agent-guard/lib/index.js`、`dsh/agent-guard/selftest.mjs`、`dsh/AGENTS.md`（或根 AGENTS.md 对应节）、`dsh/langgraph-orchestrator/src/graph.py`、测试文件（`tests/test_tool_signal_split.py` 或新用例）、新 `vite-build-profiler/SKILL.md`；无越界改动。
