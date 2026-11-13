# Agent 规则

细节按需加载，不要把 skill 整篇读进上下文。简单 Bug（文案、显隐、单字段、明显空值、换一个已知 URL）只加载当前任务必须的那一个 skill。Token、编排器阈值、编码默认走编排器：加载 `dsh-token-policy`，此处不展开。

## 会话时间硬约束（P0，细节见 skill/hook）
- 计划确认轮必须把可预见待定项（提交方式/推送/是否重建）一次问清（hook 拦截二次 ask）。
- 跑 `playwright test` 前必须过 e2e 预检（**暂缓，落点仓确定后启用**，设计见 `.plan/p0-hooks-skills-20261113.md` 附录）。
- 定位顺序与 lint 命令模板见 `zentao-analyzer` skill。

## 编排器选型（主动遵守，不等 gate 拒绝）

- 执行优先使用带绝对 `workdir` 的结构化 `execution:{program,args}` 快路径；需要模型规划时走 `orchestrate {op:"full"}`。直跑窄工具遵守共享硬预算；首次 stall 后换窄命令，不重复同形态编排。
- **`op:"tool"` 只做纯文本加工**（摘要、改写、图像判读、代码文本生成）：**绝不**用它跑构建/命令/读盘。若把执行需求投给 `op:"tool"`，模型只会回「我没有执行能力」，等于没做，并会把活全推回主模型，token 与耗时双爆（实例：某会话 57 次调用仅 1 次走编排器，且是 `op:"tool"` 跑 build 失败，主模型 hy3 吃掉 2.14M token、耗时 12 分钟）。
- 这条是**选型阶段**就该做对的判断，不能指望 `orchestrator-gate`：gate 只在被拒绝时才提示，主模型若一开始就选 `op:"tool"` 根本不会触发拦截。
- 单文件分页 read、已知模块 grep/glob 可直跑；跨模块或大范围定位走编排器，只收摘要。引用文本中的执行词不构成执行意图。
- **探索纪律：子代理探索首选，主模型 pwsh 盲搜兜底（P0-2，2026-11-13 复盘）**：优先级从高到低——① **默认首选＝派 `dsh-explore` 只读子代理**（未知根/未知层级/跨模块/批量≥3/需试错定位时一律先派，见 skill；子代理会话对 agent-guard `exploration` 三规则整体豁免，可放开试错，主模型只收 ≤30 行结论后带 offset/limit 局部读）；② 已知**具体目录**的定位，主模型可直接用带 `path` 的窄 grep/glob；③ **兜底**＝主模型自己发 `pwsh Get-ChildItem`/`Select-String` 盲搜，**仅当**「派子代理失败/超时」或「只差一条命令即可定位」时使用，且**同一任务连续盲搜 ≤2 次**，超限必须改派子代理。**主会话禁裸 grep 探索**——agent-guard `exploration` 拦截已生效（整读门槛/重复盲搜/未知根试错，子代理豁免），warn 灰度中。（复盘：glob 4 次全败、pwsh 列目录 3 次全成；pwsh 不被 agent-guard 拦，主模型盲搜的物理延迟与上下文膨胀必须外包给子代理承受。）
- **局部改动固定路径（P0-2，2026-11-13）**：改样式类/局部行时先 `grep -n "类名|符号"` 拿行号 → `read offset/limit ±30 行`，禁止脑内推演行号后整读。整读双门槛（须同时满足）：同目录文件数 ≤5 且 grep 唯一命中，**且预估读取 ≤150 行**；任一不满足必须 grep 缩行号（反例：483 行组件整读两遍只改 3 行 CSS）。

## 并行扇出（强制）

- **同类批量对象 ≥3 时，禁止主模型串行逐个处理**：必须扇出到 spawn_teammate（多对象并行首选）、workflow（大规模编排）或 orchestrate `{op:"full"}`（编排器内部并行）。串行逐个对象处理会成倍拉长耗时并烧穿主模型上下文。
- 辅助判据（引导，非硬规则）：预估步骤 >300 或等效 token >5M 的任务，应优先编排器拆解。
- 默认连续 5 次 read 整读 / 5 次 grep 会被拒绝（阈值以插件配置 `fanoutStreakThreshold` 为准）；带 offset/limit 的分页读不受限；收到拒绝必须改道不得原样重试。

## 计划审批（强制，所有会话生效）

- **任何「修改 / 修复 / 实现 / 配置改动」动手前，必须先产出 Markdown 计划，不能只建 todo list 就开干。**
- 计划文件放仓库根 `.plan/<sessionId>.md`（或用 dsh 的 plan 模板 `.plan/TEMPLATE.md`），**极简 4 段式骨架，禁止扩写**：①**前因后果**（≤3 句，说清痛点）②**现状与证据**（只写文件:行号/字段名，**严禁**贴大段源码或完整 JSON/YAML，只写 diff 要点）③**实施方案**（逐步写清改哪里，不写具体实现代码）④**验证计划**（只写怎么跑测试）。**禁止单列「风险与回滚」章节**——回滚靠 git：确需一句则写"变更受 git 管理，git revert 即可"。
- 计划先交**高级模型审核（reviewer = 编排器 `plan_reviewer` 池，当前 `workbuddy/deepseek-v4.1-flash`）**：调用编排器 `op:"plan_review"`。审核不通过（verdict=reject）被打回时，主控按 issues/suggestions 修改计划后**重新送审，直到通过**。
- 审核通过后，**终稿必须提交用户人工确认**（用 `ask_user_question` 给出"确认实施 / 继续修改"选项）；用户确认前不得改动代码。确认后把计划 frontmatter 置 `status: approved`、`human_confirmed: true`。
- `dsh-plan-gate` 会在 edit/write 落地前校验：无"已审核通过且已人工确认"的计划则拒绝改动。这是硬门，不要绕过。

## 计划审批边界（成本约束，降低 plan_review 开销）

- **只在计划含 `edit`/`write` 代码改动时才送 `plan_review`**；纯文档交付、纯分析、纯复盘直接交用户，不送审。
- **首轮即只发「变更段 + 证据」**（改动行 + 对应验证命令），不发整篇；被打回后同样只发变更段增量，禁止整篇重发。
- **同一计划 >2 轮给提示（不阻断）、>3 轮硬拒**；确需越过须在计划 frontmatter 置 `review_override: true` 显式解锁。
- **计划前置事实清单（bug6520 复盘 O6：缺 headTitleList 定义方式一轮被 P0 打回，复审多烧 ~7k token）**：计划涉及修改某个 data/computed/props/字段时，动笔前先 `grep <字段名>` 拿到定义行号，并把「定义方式（data/computed/接口返回）」写进「现状与证据」。缺定义行的计划不得送审。

## 文档写作与文件落地（成本约束，禁止整篇重写）

- **新建文件用 `write`，已有文件一律 `edit`**；禁止对已存在文件整篇 `write` 覆盖（典型反例：方案 v2 整篇覆盖 v1，一次全量 write 的代价会在后续每一步复利放大）。
- **计划/方案文档先出骨架（≤1.5k）**，再逐节 `edit` 增量补章节；禁止「想清楚后一次性 5k 全文 write」。
- **写前先定结构：骨架 → 逐节 edit → 定稿**，全程不重读全文；某节要改写也只 replace 该节，不发整篇。
- **合并/拆分 edit（P0-1，2026-11-13 复盘）**：同类多文件/多段修改**合并成一次 edit**；常驻 instructions 类文件（AGENTS.md 等）批量改——一次 edit 多段，**禁止逐条 edit 反复重发全文**（复盘实例：2 次 edit 触发 3 次全文 instructions 重发；step 28 一次 5.8k output 重写 5 节）。一次大改拆成 2–3 次中等 edit，避免单步过大。

## 长任务日志与半分钟监听（强制，所有会话生效）

- **任何预计可能超过 1 分钟的任务（build、全量测试、批量查询、长编排、大目录检索、部署）都必须加日志 + 可观测监听**，禁止静默长时间阻塞等待。
- **前台长任务硬约束（heal-4fixes Fix2）**：预期 >30s 的 `build`/`test`/`install`（`npm [run] build|test`、`vite build`、`pytest`、`vitest`、`jest` 等）**禁止在主模型 `pwsh` 前台直跑**；改用 `orchestrate {op:"full", execution:{program,args}}` 结构化通道，或 `pwsh` 加 `run_in_background: true` 让日志落 `.task-state` 再半分钟读一次。`agent-guard` 已对该类前台命令出 `foreground-build` warn（不改命令、不阻断，灰度），收到告警即改道。
- 用 `dsh/scripts/task-watchdog.ps1` 以 `run_in_background: true` 启动：它写 `.task-state/<name>.state.json` 并每 30 秒打印一次心跳；主控**每半分钟**用 `job_output` 读一次状态，出现 `STALL` 或长时间无心跳要告警/止损，不要干等。
- 长操作一律走编排器 `op:"full"`，并依赖其进度日志判断是否卡住；`orchestrate` 若返回 `stalled`/超时，必须立即查 `.task-state` 与 stderr 尾部，而不是重试同一形态。
- **build 基线异步化 + 豁免时限（P0-3，2026-11-13）**：预计要改文件的会话，开工（edit/write 之前）即用 `task-watchdog.ps1` 后台起基线 build（结果落 `.task-state/build-baseline.state.json`，并发 ≤1），或读最近一次构建结果；改动仅含 scoped CSS/注释/文案的 CSS-only 豁免**只能在改动开始前声明**——一旦已开始改文件，必须有基线或写「未执行+原因」，禁止改完再豁免。
- **stall 熔断（P0-3，2026-11-13）**：同一会话内 orchestrate 对同一命令 stall 一次即打标记（记 `.task-state/<name>.state.json`：name/cmd/status/heartbeatAt/stderrTail≤500）；再调前必须换形态（查 state 文件、改用窄命令）或写明「未执行+原因」，禁止同形态重试。

## 落地

- 用户指定的 worktree / 目录是硬约束：不进、不改、不合并他人 worktree。
- 开工：加载 `worktree-snapshot`，只读它的输出。禁止现场拼 `git status` / `git worktree list`，禁止递归列举 worktree 目录。
- 提交：加载 `submodule-commit`，按清单执行，不临场推演顺序。
- 出现 Option 1/2/3 并列推演 = 缺事实，立刻查一条命令。
- 意图含「修改/修复/实现 + 验证 + 提交」时，先 `todo_write` 把阶段外化，不在推理里反复重述阶段目标。

## 禁止

- 未知具体路径时，禁止全仓 `grep` / `read`；禁止 `src/**` 全量 grep，先缩到具体模块。
- 找不到文件先 `mcp__openviking__search`（`mode=context`，`detail=abstract`）。不要把 `viking://` 当磁盘路径读。
- DBX 长文本读不全时改 `git log` 或 `UNION ALL` 分段（细则在 `zentao-analyzer` 的 `references/dbx.md`），禁止同一形态连试三次。
- 禁止提交 `env/.env` 与 `public/version.json`。`git pull` / `git rebase` 前先 `git status --short <子模块路径>`，脏的环境文件先 stash。**多子模块/需限定范围时禁止裸 `git status`（无范围）——易回灌大量未跟踪文件；根仓或已带 `git -C <dir>` 可裸用（R5 hook `bare-git-status` 会告警，见 agent-guard）。**
- 自动化环境的 `git commit` / `rebase --continue` / `merge` 必须先设 `GIT_EDITOR=true`。
- 未跑构建必须写「未执行」。构建、部署、回写证据不齐不收尾。

## 提问与收尾

- 修改、修复、配置、实现直接做完可逆部分并验证。只有高风险、不可逆、越权，或缺少无法推断的信息时才问。
- 要用户选择时只用 `ask_user_question`，禁止在正文末尾提问。已回答且范围未变的不重复问。
- 改动落在 Git 仓库时，收尾问：仅提交 / 提交并推送 / 暂不处理。用户本轮已明确说不用提交或直接提交推送时不再问。
- **提交前一次性校验（P0-6，2026-11-13 复盘）**：提交前一次性核对脏文件、子模块状态、待推送范围（`git status --short <submodule>`），避免提交来回返工（复盘实例：step 51→53 提交返工）。
- 收尾前 `job_list`，停掉不再需要的后台任务。工具参数报错先加载 `tool-call-hygiene` 再重试一次。
- `repo-safety`、`web-deploy` 仅当本会话技能目录已经列出时才加载；未注册则忽略，不要因此报错。
