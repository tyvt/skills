---
status: approved
human_confirmed: true
approved_sha256: 2e9622a5c0a5489836a375fb74430f1203feef7a49000186e2b7e6f22d690c03
approved_version: 3
---

# 探索阶段（非编排器）多模型分工优化方案

需求优先级：**效率第一，质量第二，成本第三。**

## 一、前因后果（痛点）

当前探索阶段（进编排器之前的自由 agent 阶段）**全程只有一个主控模型 `auto/deepseek-v4.1-flash`** 在干四件事：规划下一步、读文件、写代码、探索目录。这个模型快、便宜，但推理深度和代码质量弱；而质量型/探索型任务本来应该交给更合适的模型。结果：主控既当廉价苦力又当大脑，强模型闲置。

## 二、现状与证据（已核实的机制）

| 事实 | 位置 |
|---|---|
| 主控模型 = `auto/deepseek-v4.1-flash`，`reasoningEffort: off` | `~/.dsh/profiles/web/cordis.patch.yml:31-35` (`agent-default-model`) |
| 这是**单一全局模型**，主 agent 与子 agent 都继承它 | 同上；子 agent 无独立 model 字段 |
| `tool-subagent` 在 standard preset 的 delegation 分组内 `disabled: true`，无 per-spawn 模型覆盖 | `cordis.patch.yml:272-289` |
| 编排器 `op:"full"` **已按工具分了模型池**：planner=`codex/gpt-6-luna`、code_editor=`workbuddy/deepseek-v4.1-flash`、pwsh=`workbuddy/deepseek-v4.1-flash`、file_reader=`auto/deepseek-v4.1-flash` | `dsh/langgraph-orchestrator/config.yaml` tools 段 |
| 编排器真实落盘只能走 `pwsh` 工具的「自然语言→命令」路径，其模型池也是 deepseek-flash | config.yaml `pwsh`、graph.py `node_execute` |
| 网关可用更强模型：`codex/gpt-6.1-sol`、`minimax-code/MiniMax-M3.1-Flash`、`workbuddy/glm-5.3-flash` 等 | `cordis.patch.yml:220-249` 模型表 |

**结论**：瓶颈不在"没有强模型"，而在 **① 主控是单模型全程硬扛；② 探索阶段的每个动作没有"按动作类型分派到不同模型"的路由**。编排器阶段已有工具级路由，探索阶段完全没有。

## 三、实施方案（核心思路：动作类型 → 模型，分三层落地）

### 总原则
把探索阶段的动作按"价值密度"分四类，各配不同模型档，**主控只保留编排/决策/收口**：

- **决策/规划类**（定方向、拆解、判定）→ 强推理模型，低频高价值，贵也值。
- **探索/检索类**（找文件、定位符号、读结构）→ 廉价快速模型，高频，只回 ≤30 行结论。
- **代码生成类**（写/改源码）→ 代码强模型，中频，质量敏感。
- **收口/汇总类**（把结果拼成答复）→ 廉价模型。

### 层一：探索外包（立即可用，零改配置，效率收益最大）
把探索阶段所有"找东西"的动作**强制外包子代理**，而不是主控自己 grep/read：
- 主控不再逐文件盲搜；遇到未知根/跨模块/批量≥3，一律 `spawn_teammate` 只读探索代理（`dsh-explore` 模板），主控只收 ≤30 行结论 + 行号，再局部 read。
- **收益口径（修正）**：收益是**主控上下文/注意力释放** + 探索并行，而不是"探索用廉价模型"。主控不再被逐文件读盘撑爆上下文与注意力，可专注决策/收口。
- 效果：主控上下文瘦身 + 探索并行 = 效率提升（质量不受损，因为探索只回定位结论）。

### 层二：按动作给子代理指定不同模型（机制已存在，属配置；先取证结论在下方「六」）
**关键结论：per-spawn 模型覆盖不是要新写代码，平台已内建，只是未启用。** 依据 `dsh-tool-subagent/lib/index.js`：
- 子代理创建时支持从工具调用传入 `provider` + `model` + `reasoning_effort`（`requestedAgentOptions`），可覆盖父模型。
- 但受两道闸：
  1. **`enabled`（每工具实例的 child model selection 开关）**：关闭时任何模型请求直接抛 "child model selection is disabled for this tool instance"。
  2. **`policy`（Session 级 allowed-route 白名单 = `subagent-model-selection` 命名空间）**：`assertAllowedModelSelection` 规定——
     - **无 policy 记录时：子代理只能用父模型同一 route**（这正是"所有子代理都等于主控模型"的根因）；
     - **有 policy 时：只能选 `policy.routes` 里的 route**，否则抛 "route not allowed for this Session"。
- 开关入口在 Settings → Plugins → Subagent（`dsh-client-ui-settings-subagent`，含 model selection 段），底层写 `subagent-model-selection` 命名空间。

**因此层二=配置工作，不是编码**：
- 在 Settings→Subagent 打开 model selection，并把"角色模型白名单 routes"写入——**权威映射见文末「附：统一路由表」**（explore/执行→glm-flash 或 cursor/deepseek-v41-flash-1017；抗坏工具→deepseek-flash 系【非 glm-flash】；code→composer-2.5/gpt-6.1-sol；plan/对抗→gpt-6-luna；summarize→强判读档；安全→强模型+guard）。route 格式 `{provider:"magpie", model:"..."}`。
- 主控派子代理时按类型传对应 provider/model；不在白名单的 route 会被拒（安全兜底）。

### 层三：探索阶段也走编排器工具路由（人少活多时）
对于"检索+读+判读"混合的可并行批量任务，直接用 `orchestrate {op:"full"}`，它已内建工具级模型路由（planner/文件/代码/pwsh 各用各的池）：
- 把探索请求写成"只检索定位并返回文件:行号与摘要，不修改文件"，编排器内部自动用 file_reader/pwsh 廉价池跑检索，planner 用 gpt-6。
- 补齐一个缺口：`pwsh` 池目前只有 deepseek-flash，可选给它加一个"只读检索专用"更廉价/更快的档（或保持，因为它已是最廉价）。

### 不建议做的事（省成本）
- 不要给主控换成静态强模型——那会把高频廉价动作（读盘）也拉到贵模型上，成本爆炸、效率反而降。
- 不要所有子代理都用强模型——探索类用强模型是纯浪费。

## 四、推荐落地顺序（效率优先）

1. **先做层一**（零配置改动）：把"探索子代理 + ≤30 行结论"变成探索阶段默认动作。改的是 AGENTS.md 探索纪律的强化 + 实际使用习惯，**立刻见效、零风险**。
2. **再做层二**（需计划审批 + 改插件配置）：打通 per-spawn 模型覆盖或角色 preset，让"廉价探索 / 强代码 / 强规划"三类子代理各用各的模型。这是"探索阶段多模型"的正式落地。
3. **层三按需**：批量混合任务直接投 `op:"full"`。

## 五、验证计划
- 层一：跑一个未知目录定位任务，确认主控上下文里只有 ≤30 行结论、无逐文件盲搜、无 agent-guard exploration 拦截。
- 层二：派一个 explore 子代理与一个 code 子代理，从 Models 面板（dsh_token_models 插件）确认两者 token 计费落在不同模型名下。
- 层三：`orchestrate {op:"full"}` 一个"检索定位不修改"请求，确认返回文件:行号摘要且未改文件。

## 六、层二取证结论（P1/P2/P2b 三条事实，2026-11-14 核实）

### 决策性发现：三条 spawn 路径对"per-spawn 模型"的支持完全不同（决定改哪里）
| 路径 | 能否带 per-spawn 模型 | 受 policy 闸？ | 本 preset 状态 |
|---|---|---|---|
| **workflow `agent(prompt,{provider,model})`** | **能**（`request.agentOptions={provider,model}` 直达 `startActivation`） | **否**（policy 校验只在 model-facing `subagent` 工具里） | **已启用，现在就能用** |
| model-facing `subagent` 工具 | 能 | **是**（`assertAllowedModelSelection` 白名单） | **`disabled: true`**（standard preset） |
| `spawn_teammate`（Team） | **不能**（request 无 model，成员继承 Lead 的 `root.options.model`） | — | 已启用 |

> 核心：`startActivation`→`resolveChildAgentOptions` 只把 `request.agentOptions.provider/model` 合并到子会话（`dsh-subagent/lib/index.js:316,1406`），**服务层不做白名单校验**；白名单 `assertAllowedModelSelection` 仅存在于 `dsh-tool-subagent/lib/index.js:89-96`。spawn provider 声明 `capabilities.agentOptions: true`（`dsh-subagent-spawn-in-process/lib/index.js:21`），所以 workflow 传 model 会被真实采纳。

### 三条事实
| # | 问题 | 结论 | 证据 |
|---|---|---|---|
| **P1** | 策略**持久化位置** | policy 不是全局 settings.yaml，而是**每会话的 durable projection**：`agent/created` 时把当前 `enabled+allowedModels` 快照作为会话事件 `subagent/model-selection-policy {allowedModels}` **追加进 session log**；子代理再从父会话继承该 policy。配置项 `enabled`/`allowedModels` 本身是 **`.volatile()`（不落盘，仅存活于 Settings UI 运行时内存）**。 | `dsh-tool-subagent/lib/model-selection-settings.js:44-58,75-117` |
| **P2** | **route 格式** | `routes: Array<{ provider: string(min1), model: string(min1) }>`，`.strict()`、**不得重复**（同 provider+model）。示例 `{provider:"magpie", model:"cursor/composer-2.5"}`。 | `model-selection-settings.js:8-11,25-39,47-50` |
| **P2b** | **enabled 范围** | **两个独立开关**：① 每**工具实例** `modelSelection: true`（`dsh-tool-subagent` config，决定工具 schema 是否暴露 provider/model 参数，见 `index.js:351`）；② **Settings 表单主开关** `SubagentModelSelectionConfig.enabled`（默认 `false`，volatile），决定新顶层会话是否被写入 policy（`model-selection-settings.js:76,98,109`）。二者都需开。 | `dsh-tool-subagent/lib/index.js:351,394`; `model-selection-settings.js:76,98` |

### 据此修正的层二落地形态（效率优先，最小改动）
- **主路线（零配置、今天可用）＝用 `workflow` 的 `agent(prompt,{provider,model})` 承载多模型探索**：探索类子代理 `{model:"workbuddy/glm-5.3-flash"}`（或 auto 系 flash），代码类 `{model:"cursor/composer-2.5"}` / `{model:"codex/gpt-6.1-sol"}`，规划类 `{model:"codex/gpt-6-luna"}`。**不经 policy 闸、不改任何配置**，模型名取自 settings.yaml 已注册的 39 个 id。
- **补充路线（若要用 `subagent` 工具做"模型可选"的交互式派生）＝需改配置**：`tool-subagent` 由 `disabled:true` 打开 + `modelSelection:true` + Settings 表单开 `enabled` 并填白名单 routes。属配置改动，按审批流程走。
- **`spawn_teammate` 维持不变**：Team 成员继承 Lead 模型，本方案不靠它做模型差异化（它适合并行任务管理，不适合按类型换模型）。

> 结论：**层二的"探索阶段多模型"主线其实零配置即可落地（走 workflow agent 模型覆盖）；`subagent` 白名单是可选增强，不是必需。** 这大幅降低了实施成本与风险，符合"效率第一、成本第三"。

## 七、层二变更段（送审用，仅含要改的文件与证据）

**变更 A（主，必做）——AGENTS.md 增加"探索阶段按动作类型选模型"一条**（纯文本 guidance，无代码）：
- 位置：`D:\repository\skills\dsh\AGENTS.md` 「并行扇出（强制）」段之后新增一段。
- 内容要点：
  - 探索阶段多对象/混合任务，**只能用 `workflow` 的 `agent(prompt,{provider,model})` 做按类型分工**；示例 `agent(prompt, {provider:"magpie", model:"cursor/composer-2.5"})`。**provider 固定 `magpie`**；**禁止用 `spawn_teammate` 换模**（成员继承 Lead 模型，换不掉）。
  - 分工与优先级（按序，失败再试下一个）：**探索/检索** → `workbuddy/glm-5.3-flash` → `auto/deepseek-v4.1-flash`；**代码生成** → `cursor/composer-2.5` → `codex/gpt-6.1-sol`；**规划/拆解** → `codex/gpt-6-luna`。
  - 模型 id 一律取自 `settings.yaml` 已注册项；不给主控换静态强模型。
  - **回退规则**：指定模型未注册或子代理调用失败时，回退主控模型执行并记录原因，不阻塞。
- 证据：workflow `agent` 支持 `provider/model` 覆盖且经 `startActivation`/`resolveChildAgentOptions` 真实采纳、不受 policy 闸（见「六」）。

**变更 B（可选增强，本次可不做）——启用 model-facing `subagent` 工具 + 模型白名单**：
- 位置：`C:\Users\Administrator\.dsh\profiles\web\cordis.patch.yml` 内 preset-standard delegation 分组，`tool-subagent` 由 `disabled: true` 改为启用并加 `modelSelection: true`；并需在 Settings→Subagent 开 `enabled` + 填 routes。
- 证据：P2b 双开关 + P1 policy 落会话日志（见「六」）；改动触及 preset 配置，风险高于变更 A，且与变更 A 功能重叠（变更 A 已能多模型）。

**本轮建议只做变更 A**（效率/成本/风险最优）：`workflow agent` 模型覆盖已能实现"探索阶段多模型"，无需动 preset 与 session policy 机制。变更 B 留作后续按需。

**模型 id 核对（回应审核 P1#1）**：变更 A 用到的 id 已逐一核对**全部已在 settings.yaml 注册**——`codex/gpt-6.1-sol` ✅、`cursor/composer-2.5` ✅、`codex/gpt-6-luna` ✅、`workbuddy/glm-5.3-flash` ✅、`auto/deepseek-v4.1-flash` ✅、`workbuddy/deepseek-v4.1-flash` ✅（provider 均为 `magpie`）。

**验证（变更 A，细化回应审核 P1#2 / P2#3）**：
1. **文档核对（对准本次纯文档改动）**：`git diff AGENTS.md` 确认新增段含"分派表（探索/代码/规划 + 优先级）"与"回退句"，且插在「并行扇出（强制）」段之后。
2. **采纳断言（不只靠 Models 面板）**：跑一个 workflow，脚本内两个 `agent()` 分别传完整 route `{provider:"magpie",model:"workbuddy/glm-5.3-flash"}` 与 `{provider:"magpie",model:"cursor/composer-2.5"}`；断言各 agent 返回自身结论且非 null，并**从子会话日志/agentOptions 断言 provider/model 被采纳**（证明 `resolveChildAgentOptions` 生效，非回退主控）。
3. **回退用例**：再跑一次传一个未注册 model 的 `agent()`，断言回退主控执行且不阻塞、记录原因。

## 八、落地与验证结果（2026-11-14 执行完成）

**变更 A 已实施**：`AGENTS.md`（= `D:\repository\skills\dsh\AGENTS.md`，`~/.dsh/AGENTS.md` 软链）新增「探索阶段按动作类型选模型（异构多模型，2026-11-14）」段，位于「并行扇出（强制）」段之后，90 行。含四要点：默认首选 dsh-explore、需异构升级 workflow agent()、spawn_teammate 换不了模、provider 显式且白名单不约束须网关注册、按级别不写死版本、未注册/null/超时回退主控不重试。

**验证结果（全部通过）**：
1. **双模型分派（采纳断言，非仅面板）**：workflow 两个 `agent()` 分别传 `{provider:"magpie",model:"workbuddy/glm-5.3-flash"}` 与 `{provider:"magpie",model:"cursor/composer-2.5"}`，均返回非 null；**从子会话 `session.v4.jsonl.zstd` 解帧取证**：agent1 `subagent/descriptor.agentModel="cursor/composer-2.5"` + `request/header.config.model="cursor/composer-2.5"`；agent2 `agentModel="workbuddy/glm-5.3-flash"` + `request/header.config.model="workbuddy/glm-5.3-flash"`。→ **模型覆盖被真实采纳（request/header 即实际请求模型），非回退主控**。
2. **回退用例**：`agent()` 传未注册 `magpie/this-model-does-not-exist-xyz` → resolved `null`，workflow 不抛出、整体不阻塞（脚本按 null 处理回退主控）。
3. **文档 diff**：新增段已核对含分派级别表 + 回退句，位置在「并行扇出（强制）」之后。

> 结论：变更 A 落地且验证通过——探索阶段已可按动作类型用 `workflow agent({provider,model})` 走多模型，零配置改动、零 preset 风险。变更 B（启用 subagent 工具+白名单）按约定未做。

---

## 附：统一路由表（v3 新增，2026-11-14；controller-bench 406 行实测依据，口径唯一权威）

> 依据：`controller-bench/results/{bench-full,score-full}.json`（14 模型 × 29 题 = 406 行，M1–M5 + T8–T11）；成本/耗时取自 bench-full。原则：**效率第一、质量第二、成本第三；安全/对抗保强模型。** 本表为**唯一权威**，与「层二」第 56 行、上文 110 行分派顺序、AGENTS.md「探索阶段按动作类型选模型」段一致。

| 动作/题型 | 权威模型 | 实测依据 | 易错点（务必排除） |
|---|---|---|---|
| 执行/检索/效率（M2/M5） | **workbuddy/glm-5.3-flash** 或 **cursor/deepseek-v41-flash-1017** | M5 满分 1.000；后者综合最快 3922ms | 不用 `workbuddy/deepseek-v4.1-flash` 作效率首选（M5 仅 0.846） |
| 抗坏工具/改道（M3） | **cursor/deepseek-v41-flash-1017** 或 **workbuddy/deepseek-v4.1-flash** | M3 0.932 / 0.919，deepseek-flash 系最强（套餐按量，非免费） | **不派 glm-flash**（M3 仅 0.737，明确短板） |
| 工具选择精准（M1，难题降级） | cursor/grok-4.7@256k 或 codex/gpt-5.6-terra | tool 0.88/0.87 | 峰值高但慢+计费，仅难题用 |
| 对抗/根因/多轮纠错（T，=plan 规划） | **codex/gpt-6-luna** | T 类 0.875 全场第一；deepseek-flash 垫底 0.605，Δ0.27 | planner（规划拆解）池首依据 |
| 代码生成 | cursor/composer-2.5 / codex/gpt-6.1-sol | 质量敏感 | — |
| 长输出判读汇总（M8 待测） | 强判读档（terra/sol），输入 >2k 行时 | token 效率维 | summarizer 池 |
| diff 评审/verifier（≠plan 规划） | plan_reviewer 池（现 grok-4.7，route 1.00） | 2026-11-14 verifier 新增 | 评审角色，勿与 plan 规划混淆 |
| 安全拒绝（M4-5） | **强模型 + security_guard 前置** | 弱模型 gpt-6-astra 唯一失守密码导出 | guard 不可省 |
| 低成本兜底 | workbuddy/deepseek-v4.1-flash | 套餐按量、最快 4.5s，M5 偏弱 | 仅兜底（非免费，仅 hy3 免费） |

**一句话规则**：执行/检索/效率→glm-flash 或 cursor/deepseek-v41-flash-1017（v4.1-flash 仅低成本兜底）；抗坏工具→deepseek-flash 系（非 glm-flash）；对抗/根因→gpt-6-luna；代码→composer/gpt-6.1-sol；安全→强模型+guard；**overall 排名不看，看题型派活**。

**route 字段说明（回应审核 P1-2）**：route 统一写成 `{provider:"magpie", model:"<带斜杠前缀的完整 model id>"}`——**斜杠前缀属于 `model` 字段**（如 `workbuddy/glm-5.3-flash`、`cursor/deepseek-v41-flash-1017`、`codex/gpt-6-luna` 都整体作为 model 值），`provider` 恒为 `magpie`。例：`{provider:"magpie", model:"workbuddy/glm-5.3-flash"}`。

**与第 110 行对齐（回应审核 P1-1）**：第 110 行既有顺序"探索/检索→workbuddy/glm-5.3-flash→auto/deepseek-v4.1-flash"与本表一致——**效率/探索首选 glm-flash（或更快的 cursor/deepseek-v41-flash-1017）；workbuddy/deepseek-v4.1-flash 仅列兜底**，不矛盾。

**口径修正留痕（2026-11-14 用户指正）**：①"免费 flash 系最强"是误表述，准确为 **deepseek-flash 系**最强、glm-flash 是 M3 短板；②执行/检索首选不能用 workbuddy/deepseek-v4.1-flash（M5 0.846 不达 0.9+），改 glm-flash / cursor-deepseek-v41-flash-1017。③**成本口径更正（2026-11-14 用户指正）**：仅 hy3 免费，glm-flash / deepseek-flash / composer / grok 等均为套餐按量计用量；本表"低成本兜底""最廉价档"仅指"套餐内最廉价档位"，非免费，成本选择应看套餐月费+用量而非 bench 的 cost=0 列。

**局限（口径诚实）**：本表基于单轮计划产出评测，端到端多轮执行/真实工具回报未覆盖；改池首前建议对首选模型做 1 周影子对照（同任务双跑比对成功率与 token）。
