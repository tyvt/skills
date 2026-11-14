# 通用问题整改方案 + OpenViking 根因（2026-11-14）

status: approved
human_confirmed: true
implement_scope: A层 + C-a（仅改 dsh/AGENTS.md 文案，零代码）
edit_style: 按节就近改写，允许多次 edit
commit: 仅提交

> 范围：只处理**通用/跨项目**问题；**P0-3（测试入口 npx vitest vs bun --cwd tools/testing）为项目级，本轮不处理**。
> 用户已确认：落 **A 层 + C-a**；B 层代码熔断暂缓。edit 按节就近、允许多次。C-a 措辞**排除已知 404 路径**（`profile.md` 固定 404 非重试问题，不纳入「失败即换」）。收尾仅提交。

## 一、问题来源与总览

用户给出「按成本排序的整改清单」8 条。本方案按两个维度重组：**A. 规则层（改 AGENTS.md，零代码）**、**B. 机制层（改 agent-guard，需代码与灰度）**。此外单列 **C. OpenViking 根因调查（P1-1）**。

| 编号 | 原问题（一句话） | 归属 | 本轮动作 |
|---|---|---|---|
| P0-1 | 同一门禁拒绝后原样重试 2–3 次 | 规则层 A1 + 机制层 B1 | 方案 |
| P0-2 | plan_review 手打 plan、approved 提前写 | 规则层 A2 | 方案 |
| P0-3 | 测试入口用错（项目级） | —— | **跳过** |
| P0-4 | orchestrate execution 硬跑长 build/命令 | 规则层 A3 | 方案 |
| P1-1 | OpenViking 失败 3 次仍调用 | 机制层 B2 + 根因 C | 调查已做，方案 |
| P1-2 | reasoning 单步 40k 无工具 | 规则层 A4 | 方案 |
| P1-3 | ask 拆两轮 | 规则层 A5 | 方案 |
| P2-1 | 首轮 glob 被拒后 aborted 整个 turn | 规则层 A6 | 方案 |

## 二、A 规则层（改 `dsh/AGENTS.md`，零代码）

> 目标文件：`D:\repository\skills\dsh\AGENTS.md`（即 `~/.dsh/AGENTS.md` 的软链目标，14778B）。全部为文案增补，受 git 管理，回滚 `git revert`。

### A1 ← P0-1：拒绝即改形态（同形态最多 1 次）
- **现状证据**：AGENTS.md 第 24 行已有「收到拒绝必须改道不得原样重试」，第 16 行有「同一任务连续盲搜 ≤2 次」，但**分散且无统一「同形态 = 最多 1 次」硬口径**，导致 grep/glob/eslint/build 各被拒后仍重试 2–3 次。
- **改动**：在「编排器选型」节末追加一条通用硬规则（一句话）：*「同一工具/同一命令/同一门禁的**同形态**调用，被拒或失败后**最多再试 0 次**——必须改变形态（换工具、换参数、缩范围、换机 or 走编排器）或停下查事实，禁止原样重发。」*
- **验证**：无需运行；文案评审确认与第 16、24 行不冲突（第 16 行的「≤2 次盲搜」是探索特例，本条针对门禁/失败重试，需在文案里点明二者关系避免歧义）。

### A2 ← P0-2：强制 plan_path + approved_sha256，禁手打
- **现状证据**：AGENTS.md 第 36–38 行已描述 plan_review 与 plan-gate，但**未固定「必须用 plan_path、必须以 plan_review 返回的 sha256 回填 approved_sha256」**，导致手打 plan 正文与提前写 approved 造成「假绿」。
- **改动**：改第 36 行，补一句硬约束：*「plan 送审必须用 `op:"plan_review"` 的 `plan_path`（禁止在请求里手打 plan 正文）；通过后把返回的 `approved_sha256` 原值回填 frontmatter，禁止提前手写 `status: approved`。」*
- **验证**：plan-gate 若无 sha256 校验则仅文案约束；如要硬卡，归入机制层（需另评估 plan-gate 代码，本方案暂记为「文案先行」）。

### A3 ← P0-4：长命令直走 pwsh 后台 + watchdog，不走 orchestrate execution
- **现状证据**：AGENTS.md 第 12 行鼓励 `execution:{program,args}` 快路径，第 59–60 行要求长任务走 watchdog；但**缺一条「长 build/命令不要投给 orchestrate execution（会 INVALID/编排失败），直接用 pwsh run_in_background + task-watchdog」的显式禁令**。
- **改动**：在「长任务」节第 59 行后追加一句：*「`orchestrate execution` 只用于**确定性的短命令**；>30s 的 build/test/install 一律 `pwsh run_in_background:true` + `task-watchdog.ps1`，不得投给 orchestrate execution（实测 INVALID×2 + 编排失败×1）。」*
- **验证**：文案评审。

### A4 ← P1-2：reasoning 单步缺事实即查一条命令，硬停
- **现状证据**：AGENTS.md「落地」节有「出现 Option 1/2/3 并列推演 = 缺事实，立刻查一条命令」，但**未覆盖「长 reasoning 无工具调用」这一形态**（单步 40k token 纯推演）。
- **改动**：在「落地」节该条后追加：*「单步推理超约 1.5k token 仍无工具调用＝缺事实，立即发**一条**窄命令（grep -n / read offset / ls）取证再继续，禁止继续空转推理。」*
- **验证**：文案评审。

### A5 ← P1-3：计划确认轮一次问清（实施 + 提交方式合并）
- **现状证据**：AGENTS.md 第（提问与收尾节）已有「一次问清」条目，列举（上限取值/是否实施/严谨度/提交方式）。P1-3 指的是**计划确认轮本身**就该把「实施 + 提交方式」合并问，避免二次 ask。
- **改动**：在该条「一次问清」的正面清单里显式加入「**提交方式（仅提交/提交并推送/暂不处理）**」，并点明「计划确认轮＝合并问实施与否 + 提交方式，不得等实施完再单独问提交」。
- **验证**：文案评审；ask-guard 已拦二次 ask，本条为正面清单补强。

### A6 ← P2-1：被拒即窄化重试，不 abort 整个 turn
- **现状证据**：AGENTS.md 第 24 行要求「改道不得原样重试」，但**未点明「不得因单次门禁拒绝而 abort 整个 turn」**。
- **改动**：在「并行扇出」节第 24 行末追加：*「门禁拒绝是一个 step 的结果，不是 turn 的终止条件——收到拒绝必须窄化后继续本 turn，禁止直接结束整轮。」*
- **验证**：文案评审。

**A 层合计**：6 处文案增补/改写，集中在 3 个文件节（编排器选型、计划审批、长任务、落地、提问与收尾、并行扇出）。按「合并 edit」规则，落届时合并为 2–3 次 edit。

## 三、B 机制层（改 agent-guard，需代码 + 灰度，成本高，建议 A 层先行观察再决定）

> 目标：`dsh/agent-guard/lib/`（纯函数 `rules.js` + 接线 `index.js` + 配置 `config.js`）。此层**本轮不实施**，仅列设计，A 层无效果时再上。

### B1 ← P0-1 的硬卡版：同工具失败/门禁拒绝重试熔断
- **现状证据**：`index.js:242 ctx.tools.guard()` 只在**调用前**（pre-execute）介入，能拦 scope/整读/探索漂移；但**看不到上一次调用的结果**，无法判「同一工具刚失败」。`config.js:62` 已有 `exploration{enabled,mode:off|warn|block}` 三态模板可照抄。
- **设计**：新增 `toolRetry{enabled, mode:'warn', maxSameFormRetries:1, windowMs}` 配置。需在 **post-execute / 工具结果事件**上累计每会话每 `toolName+归一化参数指纹` 的失败计数（**hook 确切名称待实现期确认**，本轮 orchestrate 探测零命中不可信，需真机核对 dsh 插件事件表）。超阈值时：warn 记 ledger；block 回拒绝并把「关闭同类调用/换工具」提示给模型。
- **阻塞点**：依赖「工具结果/错误事件」钩子——当前 agent-guard 未订阅，需先确认真机事件名，故**列为观察项**。

### B2 ← P1-1 的机制兜底：OpenViking 专用「失败 1 次即换」
- **现状证据**：见下节 C。OpenViking 慢/超时是真实存在的（`session_search` 本会话实测 120s 超时）。`rules.js` 目前只做参数形状修复（`queries→query`），无「失败即换」。
- **设计**：若实现 B1，OpenViking 系工具（`mcp__openviking__search/find/read`）阈值设为 **maxSameFormRetries=0**（失败 1 次即禁再调，改走 session_search/grep），并在拒绝提示里直接给出替代方案。**建议先 A 层文案（见 C 结论）低成本验证，再决定是否上代码。**

## 四、C OpenViking「失败 3 次仍调用」根因调查（P1-1）

### C1 数据事实（`request_audit`，窗口 2026-11-13T02:06Z → 2026-11-14T02:41Z，1024 行）
| 观测 | 值 | 含义 |
|---|---|---|
| `/mcp` 路由请求 | **19 次，全 200** | MCP 传输层**无一失败** |
| `search/search` 成功 | 15 次 200（caller=auto-recall） | 检索**服务端**正常 |
| `search/search` 失败 | **1 次 400**（probe-test，`body.wrong_field` 多余字段） | 唯一 400 是**参数形状**错误 |
| `content/read` 404 | **23 次**（`NOT_FOUND`） | profile.md 固定 404（既有 A2 已知） |
| `find` 路由 | 仅 1 次且**不入 request_audit 明细** | find 错误观测盲区（既有 A1 已知） |

### C2 根因判定
**「失败 3 次仍调用」不是 OpenViking 服务端问题**——服务端 `/mcp` 与 `search` 几乎全 200。真正失败发生在**两条 Agent 侧路径**：
1. **参数形状错**（`body.wrong_field` / `queries` vs `query`）：一次 INVALID_ARGUMENT 后模型原样重试。`rules.js` 已对 `search` 做 `queries→query` 确定性修复，但**只覆盖 search，且修复后若服务端仍报其它字段错，模型仍会连试**。
2. **超时/慢响应被模型当失败后重试**：本会话 `session_search` 实测**超时 120s**；慢查询期间模型可能判失败并同形态重试。服务端 200 但客户端超时 → 计数不在 audit 里，形成「服务端看着全绿、客户端在空转」的错配。
3. **无任何「失败即换」硬点**：`dsh/AGENTS.md:77`「禁止」节只说「DBX 长文本…禁止同一形态连试三次」，**未覆盖 OpenViking 检索工具**；agent-guard 无失败计数（见 B1/B2）。

### C3 方案（先文案，后机制，均属开放项）
- **C-a（文案，低成本、本轮可纳入 A 层）**：在 AGENTS.md「禁止」节（`:77` 现有 DBX 条之后）把「同一形态连试三次」规则**显式扩到 OpenViking 检索类工具**：*「`mcp__openviking__search/find/read` 失败或超时 **1 次**即改走 `session_search`/`grep`，禁止同形态重试；OpenViking 慢（实测 p-max 5.7s、本会话曾 120s 超时）不作为重试理由。」*
- **C-b（机制，依赖 B1/B2）**：实现工具失败熔断，OpenViking 阈值 0。
- **C-c（观测补盲，归属既有 openviking-optimization 计划 A0/A1）**：find/search 失败落 `request_audit`、`/mcp` 记 caller——否则「失败 3 次」永远无法从数据侧量化。**本轮不重复做**（已在 `openviking-optimization-20261113.md` A0/A1 跟踪）。

### C4 与既有计划的关系（避免重复造轮子）
- `openviking-optimization-20261113.md`（已 approved）：负责**成本/可观测性**（VLM 空转、404/409、caller 埋点）。
- `openviking-proactive-query-20261114.md`（已 approved）：负责**主动查询率低**（不是本问题）。
- **本 P1-1（失败重试循环）是第三个独立问题**，前两者均未覆盖。C-a 文案可立即并入，C-b 待 B1 落地。

## 五、实施顺序与验证计划

1. **第一波（本方案确认后即做）**：仅 A 层 + C-a 文案改动，合并为 2–3 次 edit 改 `dsh/AGENTS.md`；改后用 `read` 复核 diff 无重复/冲突；无构建。
2. **第二波（观察 A 层 1–2 天后）**：若「同形态重试」仍频发，评估 B1/B2 代码（需真机确认 post-execute 钩子名 → 写 rules.js 纯函数 + 单测 → config 三态灰度 warn → 观察）。
3. **验证口径**：A 层靠事后复盘（同类拒绝/失败后是否仍原样重试）；B 层靠 agent-guard ledger 计数（同 tool+参数指纹连续失败次数）。
4. 变更全程受 git 管理，回滚 `git revert`。

## 六、待用户决策
- 是否现在只落 A 层 + C-a（推荐，零代码、当天可验证）？还是连 B 层一起做？
- A 层改动落在 `dsh/AGENTS.md`（git 仓）→ 收尾是否提交？仅提交 / 提交推送 / 暂不处理。
