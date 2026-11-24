# Agent 规则

细节按需加载，不要把 skill 整篇读进上下文。简单 Bug（文案、显隐、单字段、明显空值、换一个已知 URL）只加载当前任务必须的那一个 skill。Token、编排器阈值、编码默认走编排器：加载 `dsh-token-policy`，此处不展开。

## 会话时间硬约束（P0，细节见 skill/hook）
- 计划确认轮必须把可预见待定项（提交方式/推送/是否重建）一次问清（hook 拦截二次 ask）。**前端任务例外**：提交/推送/禅道回写的提问按「前端任务验证门」（见下）延至验证后，不在计划确认轮问。
- **前端任务验证门（P0，2026-11-19，强制；2026-11-19 补强证据入会话/禅道附图/产物清零）**：凡涉及前端 UI / 页面 / 样式 / 交互改动的任务，完成后必须依次执行：① 用 `agent-browser` 实机打开改动页面验证；② 产出**录屏或截图**作为验证证据，**必须发进会话**——用 `present` 展示文件并在正文用 `![验证证据](绝对路径)` 行内嵌图让用户肉眼可见，**禁止只落盘到项目目录就算「交用户」**；③ 弹 `ask_user_question` 让用户确认通过；④ 用户确认后，才提交推送代码（若是 Git 仓库）、回写禅道（若有禅道链接），**回写 comment 必须把该验证图/视频贴进去（见 `zentao-analyzer` 回写规则），未附图/视频不得回写**；⑤ 收尾前清理全部过程产物。**顺序是硬约束**：②展示 → ③用户确认 → ④上传禅道落图 → ⑤最后删本地产物（保证确认时图链有效、禅道已留存后再清理）。无录屏/截图证据、或用户未确认前，**禁止**提交/推送/回写。提交类提问只在第③步弹出，**不得在任务开始时（计划确认轮）弹出**。ask-guard 对此验证后提问放行，视为规则规定的门控而非遗漏二次 ask。
- 跑 `playwright test` 前必须过 e2e 预检（**暂缓，落点仓确定后启用**，设计见 `.plan/p0-hooks-skills-20261113.md` 附录）。
- 定位顺序与 lint 命令模板见 `zentao-analyzer` skill。

## 编排器选型（主动遵守，不等 gate 拒绝）

- 执行优先使用带绝对 `workdir` 的结构化 `execution:{program,args}` 快路径；需要模型规划时走 `orchestrate {op:"full"}`。直跑窄工具遵守共享硬预算；首次 stall 后换窄命令，不重复同形态编排。
- **`op:"tool"` 只做纯文本加工**（摘要、改写、图像判读、代码文本生成）：**绝不**用它跑构建/命令/读盘。若把执行需求投给 `op:"tool"`，模型只会回「我没有执行能力」，等于没做，并会把活全推回主模型，token 与耗时双爆（实例：某会话 57 次调用仅 1 次走编排器，且是 `op:"tool"` 跑 build 失败，主模型 hy3 吃掉 2.14M token、耗时 12 分钟）。
- 这条是**选型阶段**就该做对的判断，不能指望 `orchestrator-gate`：gate 只在被拒绝时才提示，主模型若一开始就选 `op:"tool"` 根本不会触发拦截。
- 单文件分页 read、已知模块 grep/glob 可直跑；跨模块或大范围定位走编排器，只收摘要。引用文本中的执行词不构成执行意图。
- **探索纪律：探索一律先派只读子代理，主模型 pwsh 盲搜兜底（P0-2，2026-11-14 强化）**：**默认动作＝凡"找东西"的探索，先派 `dsh-explore` 只读子代理，主控只收 ≤30 行结论后带 offset/limit 局部读**——把探索的物理延迟与上下文膨胀外包出去，**核心收益是释放主控上下文与注意力**，让主控专注决策/收口。优先级从高到低——① **默认首选＝派 `dsh-explore` 只读子代理**（未知根/未知层级/跨模块/批量≥3/需试错定位时一律先派，见 skill；子代理会话对 agent-guard `exploration` 三规则整体豁免，可放开试错）；② 已知**具体目录**的定位，主模型可直接用带 `path` 的窄 grep/glob；③ **兜底**＝主模型自己发 `pwsh Get-ChildItem`/`Select-String` 盲搜，**仅当**「派子代理失败/超时」或「只差一条命令即可定位」时使用，且**同一任务连续盲搜 ≤2 次**，超限必须改派子代理。**主会话禁裸 grep 探索**——agent-guard `exploration` 门禁（整读门槛/重复盲搜/未知根试错，子代理豁免）现已 `enabled:true`、`mode:'warn'`——**仅告警不阻断**，主控不得因"没被拦"就臆断合规，仍须严格按本行优先级执行。（复盘：glob 4 次全败、pwsh 列目录 3 次全成；pwsh 不被 agent-guard 拦，主模型盲搜的物理延迟与上下文膨胀必须外包给子代理承受。）
- **局部改动固定路径（P0-2，2026-11-13）**：改样式类/局部行时先 `grep -n "类名|符号"` 拿行号 → `read offset/limit ±30 行`，禁止脑内推演行号后整读。整读双门槛（须同时满足）：同目录文件数 ≤5 且 grep 唯一命中，**且预估读取 ≤150 行**；任一不满足必须 grep 缩行号（反例：483 行组件整读两遍只改 3 行 CSS）。
- **脱敏视图不可作 edit 依据（2026-11-14 复盘）**：工具对含 token 赋值或 `===` 比较等敏感行会脱敏显示（显示为掩码），此时不得据脱敏视图猜 `old_string`；须先 `grep -n` 取行号 → `read offset/limit` 局部读真实内容再 `edit`。反例：context-store.mjs 的 token 赋值行被掩码，据掩码猜 `old_string` 导致 FS_EDIT_NOT_FOUND，随后整篇 write 靠记忆补语义引发回归。
- **拒绝/失败即改形态（P0-1，2026-11-14）**：同一工具/同一命令/同一门禁的**同形态**调用，被拒或失败后**最多再试 0 次**——必须改变形态（换工具、换参数、缩范围、换命令）或停下查事实，禁止原样重发。本条针对门禁拒绝与工具失败重试；与「连续盲搜 ≤2 次」（探索特例）并行不悖。

## 并行扇出（强制；2026-11-24 依 1348 会话实测校准）

- **同类批量对象 ≥3 时，禁止主模型串行逐个处理**：必须并行化——**首选 orchestrate `{op:"full"}`（编排器内部并行，实测均 8.9k 等效/步、缓存命中率 0.957，三组最优）**。`spawn_teammate`/`workflow` 已在全部预设禁用（工具目录里没有就是没有，不要尝试调用；仅 full-tools 预设会话可用，且实测建团会话均 16.0k 等效/步、命中率 0.925，性价比为负，默认不选）。串行逐个对象处理会成倍拉长耗时并烧穿主模型上下文。
- 辅助判据（引导，非硬规则）：预估步骤 >300 或等效 token >5M 的任务，应优先编排器拆解。
- 默认连续 5 次 read 整读 / 5 次 grep 会被拒绝（阈值以插件配置 `fanoutStreakThreshold` 为准）；带 offset/limit 的分页读不受限；收到拒绝必须改道不得原样重试。
- **被拒不 abort（P2-1，2026-11-14）**：门禁拒绝只是**一个 step** 的结果，不是 turn 的终止条件——收到拒绝必须窄化后继续本 turn，禁止直接结束整轮。
- **派发子代理带行号锚点（2026-11-14 复盘）**：向子代理（含 fork 子代理）派发批量改文件/逐条删除的任务时，**必须给出文件:行号锚点**（如 `evaluation.ts:36/45/55/65…` 为 mock 分支逐条删），不能只给文件路径——否则 fork 子代理会因整读截断而在中途放弃（复盘：task-2 仅给路径致子代理放弃）。

## 探索阶段按动作类型选模型（异构多模型，2026-11-14）

- **默认探索仍首选 `dsh-explore` 只读子代理。** `spawn_teammate`/`workflow` 已在全部预设禁用（见并行扇出）；仅 full-tools 预设会话在确需异构模型时可升级到 `workflow` 的 `agent(prompt,{provider,model})`（`spawn_teammate` 不支持 per-spawn 模型，成员继承 Lead）。standard 会话需要异构模型时改走 orchestrate 子任务或回退主控模型执行，不要尝试调用 workflow。
- **（仅 full-tools）`workflow agent()` 的 `provider`/`model` 覆盖不受 `allowedModels` 白名单约束**，须自行确保该 id **已在网关注册**；`provider` 必须**显式给出**（如 `{provider:"magpie", model:...}`）。**未注册 / 返回 null / 超时即回退主控模型执行并记录原因，不重试同形态。**
- **按级别选型，不写死版本号**（具体 id 以 roster / settings.yaml 已注册项为准）：**探索/检索=flash 级**、**代码生成=composer 级**、**规划拆解=luna 级**。**不给主控换静态强模型**（避免高频读盘拉贵模型）。

## 计划审批（强制，所有会话生效）

- **任何「修改 / 修复 / 实现 / 配置改动」动手前，必须先产出 Markdown 计划，不能只建 todo list 就开干。**
- **禅道 bug 工单前置复现**：type=bug 工单的计划须先含 `agent-browser` 复现证据（只读复现先于写计划，五类字段＝现象/页面/组件/接口/证据路径）。失败出口（与 zentao-analyzer SKILL.md 逐字一致）：站点不可达 / 登录失败 / browser 不可用 / 非浏览器可复现 → 注明原因后走原流程，不阻断写计划。此步不替代修复后验证门（见「前端任务验证门」与 zentao-analyzer 回写硬门）。
- 计划文件放全局目录 `D:\plan\<工作区目录名>\<sessionId>.md`（模板 `D:\plan\TEMPLATE.md`，可用环境变量 `DSH_PLAN_ROOT` 改根）；**不得写入工作区自身的 `.plan`**，极简 4 段式骨架，禁止扩写：①**前因后果**（≤3 句，说清痛点）②**现状与证据**（只写文件:行号/字段名，**严禁**贴大段源码或完整 JSON/YAML，只写 diff 要点）③**实施方案**（逐步写清改哪里，不写具体实现代码）④**验证计划**（只写怎么跑测试）。**禁止单列「风险与回滚」章节**——回滚靠 git：确需一句则写"变更受 git 管理，git revert 即可"。
- 计划先交**高级模型审核（reviewer = 编排器 `plan_reviewer` 池，当前 `workbuddy/deepseek-v4.1-flash`）**：调用编排器 `op:"plan_review"`。**送审必须用 `plan_path`（禁止在请求里手打整篇 plan 正文）**；审核不通过（verdict=reject）被打回时，主控按 issues/suggestions 修改计划后**重新送审，直到通过**。
- 审核通过后，**终稿必须提交用户人工确认（用 `ask_user_question` 给出"确认实施 / 继续修改"选项）；用户确认前不得改动代码。确认后把返回的 `approved_sha256` 原值回填 frontmatter 并置 `status: approved`、`human_confirmed: true`，禁止提前手写 approved**。
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
- **小文件禁整写（2026-11-14 复盘）**：≤40 行的小文件禁止整篇 `write`，必须先 `read` 全文再逐段 `edit`；JS 文件每次 `edit` 后立即 `node --check`（非 JS 文件用对应语法检查或跳过，不硬套 `node --check`）。本规则与上条「已有文件一律 edit」同源，合并执行。
- **测试不得反向扩展生产 API（2026-11-14 复盘）**：白盒断言不得因测试需要而新增生产导出；若某个导出仅测试用（如 cost-meter 的 inspectSize），改为用既有出口（inspect/apply 返回值）做**行为断言**（如 LRU：hot 存活 / 最早淘汰 / 最新在），**不承诺精确内部计数（size 等）**。

## 长任务日志与半分钟监听（强制，所有会话生效）

- **任何预计可能超过 1 分钟的任务（build、全量测试、批量查询、长编排、大目录检索、部署）都必须加日志 + 可观测监听**，禁止静默长时间阻塞等待。
- **前台长任务硬约束（heal-4fixes Fix2）**：预期 >30s 的 `build`/`test`/`install`（`npm [run] build|test`、`vite build`、`pytest`、`vitest`、`jest` 等）**禁止在主模型 `pwsh` 前台直跑**；改用 `orchestrate {op:"full", execution:{program,args}}` 结构化通道，或 `pwsh` 加 `run_in_background: true` 让日志落 `.task-state` 再半分钟读一次。`agent-guard` 已对该类前台命令出 `foreground-build` warn（不改命令、不阻断，灰度），收到告警即改道。
- 用 `dsh/scripts/task-watchdog.ps1` 以 `run_in_background: true` 启动：它写 `.task-state/<name>.state.json` 并每 30 秒打印一次心跳；主控**每半分钟**用 `job_output` 读一次状态，出现 `STALL` 或长时间无心跳要告警/止损，不要干等。
- 长操作一律走编排器 `op:"full"`，并依赖其进度日志判断是否卡住；`orchestrate` 若返回 `stalled`/超时，必须立即查 `.task-state` 与 stderr 尾部，而不是重试同一形态。
- **长命令不走 orchestrate execution（P0-4，2026-11-14）**：`orchestrate execution` 只用于**确定性短命令**；>30s 的 build/test/install 一律 `pwsh run_in_background:true` + `task-watchdog.ps1`，不得投给 orchestrate execution（实测 INVALID×2 + 编排失败×1）。
- **build 基线异步化 + 豁免时限（P0-3，2026-11-13）**：预计要改文件的会话，开工（edit/write 之前）即用 `task-watchdog.ps1` 后台起基线 build（结果落 `.task-state/build-baseline.state.json`，并发 ≤1），或读最近一次构建结果；改动仅含 scoped CSS/注释/文案的 CSS-only 豁免**只能在改动开始前声明**——一旦已开始改文件，必须有基线或写「未执行+原因」，禁止改完再豁免。
- **stall 熔断（P0-3，2026-11-13）**：同一会话内 orchestrate 对同一命令 stall 一次即打标记（记 `.task-state/<name>.state.json`：name/cmd/status/heartbeatAt/stderrTail≤500）；再调前必须换形态（查 state 文件、改用窄命令）或写明「未执行+原因」，禁止同形态重试。

## 交接排程启动延迟（P0，所有会话生效）

- **任何成本交接 / 链式接续的下一跳排程，必须在 30 秒内启动**：`schedule_create` 的 `DTSTART` 取「当前本地时刻 + 约 10–20 秒」（留最小安全余量确保仍在未来，但总计 ≤30 秒），`RRULE:FREQ=DAILY;COUNT=1` 一次性投递；**禁止**把 DTSTART 设成 +N 分钟 / +N 小时（旧 hop 曾设 +2 分钟致用户久等，已明确否决）。
- DTSTART 用 `Get-Date -Format 'yyyyMMddTHHmmss'`（配 `TZID=Asia/Shanghai`）现算现用，禁止手敲固定分钟数；DTSTART 必须晚于调用时刻，否则 `COUNT=1` 不会投递。
- 交接接续用 `target=new` 或 `new_once` 开新会话（瞬时上下文，避免旧会话成本累积）；仅本会话提醒/跟进才用 `this_session`。
- **下一跳 schedule prompt 只保留四项**：交接文档路径 + 读第 9 节 + chain 元信息（chain_id/hop，**禁带 maxHops**）+ 一句目标；禁止在 prompt 里重抄「禁止重跑清单/待办明细/终止条件」（交接文档第 3/4/9 节已有），把重复上下文压到最低。
- **交接链路不设最大跳数、任务未完成不得停止（P0，2026-11-23）**：成本交接 / 链式接续的 schedule prompt 一律**禁止设置 maxHops**，也不得标注「最后一跳」。链路终止条件只看交接文档第 4 节「未完成项」是否清空、第 9 节目标是否达成，**与跳数无关**；任何一跳不得因「到达 maxHops / 最后一跳」主动终止。只有任务真正完成（未完成项清零、目标达成）才停止接续，否则继续排下一跳。反例（已否决）：历史 `chain-20261123-portal-task2741-quicknav-role` hop7/maxHops=10、`禅道6779资讯中心详情` hop10/maxHops=10 既带 maxHops 又标「最后一跳」。

## 部署面板硬拦截（P0，所有会话生效）
- **部署必注册**：任何前端项目部署必须先经部署面板注册（项目身份 + 环境），禁止绕过面板直接改 nginx 站点/手配端口；部署严格按 5 环境 `local/dev/test/uat/prod`（对应本地/公司开发/公司测试/客户测试/生产），`port=port_base+env_index` 且端口全局唯一，禁止环境名/端口段之外的部署。查询入口 `skill("deploy-env")` → `query_env.py <project> <env>` 或看板 `/api/state`（单源，禁猜端口/网关）。
- **bug 复现先查面板**：凡 bug 复现需要地址、账号、密码的，第一步必须查部署面板（`query_env.py` / `/api/state`），直接用返回的 `frontend_url`/`backend_gateway`/账号；查不到才用 `ask_user_question` 问用户，用户给出后用 `agent-browser` 实机验证正确。
- **验证通过必回写**：地址/账号/环境等验证正确后，必须回写面板注册表（`deploy-env/upsert_env.py` 或看板 `POST /api/registry/upsert`）；密码走 `privacy_upsert` 存真实值→把 `{{ov_privacy:...}}` 引用写入 `secret_ref`→`POST /api/secrets/inject` 注入，明文密码绝不入库。用户在会话中指出的部署信息错误（端口/网关/账号/环境/项目名），同样当即更新面板，不留到下次。

## 落地

- 用户指定的 worktree / 目录是硬约束：不进、不改、不合并他人 worktree。
- 开工：加载 `worktree-snapshot`，只读它的输出。禁止现场拼 `git status` / `git worktree list`，禁止递归列举 worktree 目录。
- 提交：加载 `submodule-commit`，按清单执行，不临场推演顺序。
- 出现 Option 1/2/3 并列推演 = 缺事实，立刻查一条命令。
- **长 reasoning 即缺事实（P1-2，2026-11-14）**：单步推理超约 1.5k token 仍无工具调用＝缺事实，立即发**一条**窄命令（`grep -n` / `read offset/limit` / `ls`）取证再继续，禁止继续空转推理。
- 意图含「修改/修复/实现 + 验证 + 提交」时，先 `todo_write` 把阶段外化，不在推理里反复重述阶段目标。

## 记忆时效性验证与优化（P1）

- **触发**：auto-recall 召回 `viking://` 事实记忆时即做时效验证，不照单全收。每条记忆先读 frontmatter；**无 frontmatter / 空证据一律标 suspect**（不采信为当前事实，也不删）。
- **四态判定**（按证据，不靠相似度）：VALID（现状一致）、STALE（被新值覆盖）、CONFLICT（同主体互斥值）、INVALID（幻觉/测试垃圾/隐私违规）。现状证据优先级：本会话用户新陈述 > 本轮工具实时返回 > 召回记忆交叉一致性 > `source_of_truth` 权威记忆；新证据时间须晚于记忆 `updated_at` 且语义冲突才判过期。证据不足 → 只标 `needs_review`，不动内容。
- **动作优先级：修正 > 归档 > 删除**。STALE→原地 `edit` 改正文+frontmatter（`updated_at`/`valid_until`/`change_log`）；CONFLICT 或仅历史有效→归档降级（写 `_archive/` 并打 `archived/stale` 标签，检索默认过滤）；INVALID→删除。
- **禁止 agent 自由删除长期稳定事实**（如用户固定偏好、底层规则）；删除仅限确认的幻觉/测试垃圾/隐私，且需高置信。拿不准一律归档+过滤，不删。
- **归档检索过滤**：召回排序对 `updated_at` 新、`confidence` 高、非 archived 加权；多条冲突时采信更新时间新的，旧冲突记忆仅作历史参考。
- **审计与 24h 冷却**：每次优化记审计（URI/动作/证据/时间）；同一 URI 24h 内不重复优化，防抖动。若当前记忆工具不支持归档目录或冷却字段，**降级为仅标注 + 禁止删除**，不得以不支持为由跳过验证或一刀切删。
- reindex 由 SDK/CLI 在 edit/write/forget 后自动触发，无需手动 reindex 步骤。

## suspect 记忆消费约束（灰度·软提示）

- 生效范围：仅对带 `status:suspect` 的记忆生效，读到 suspect 才加载；不改平台召回打分、不剔除 suspect（保留兜底召回）。稳定性未判定通过前，仅软提示灰度，不扩量、不切常态化。
- 软排序口径（agent 侧消费，非平台 API）：`valid` 基准默认优先；`suspect` 与无 status 的存量记忆同档后置、权重压低但保留在候选池；同档内按语义相似度排序；penalty 初值 0.25（相对 base_score∈[0,1]），灰度期按观测可调，不设硬阈值过滤。
- 命中 `status:suspect` 时：
  1. 优先采信 `status=valid` 的事实；同主题 valid 与 suspect 冲突时以 valid 为准。
  2. suspect 仅作参考线索，使用前必须显式校验（本会话新陈述 / 实时工具返回 / 权威记忆交叉验证）；校验通过方可作事实使用，否则不使用。
  3. 输出依赖 suspect（即使已校验）建议标注【来源记忆待复核】，除非已被 valid 覆盖。
  4. 禁止将 suspect 作为删除/归档/提交/对外输出等不可逆操作的唯一依据。
- 消费日志（阶段 C 数据源）：命中 suspect 的会话记录三字段——会话标识、命中 suspect 条数、直接采信 case 数；召回平台不输出 status/confidence/rank，以本日志替代召回埋点。

## 禁止

- 未知具体路径时，禁止全仓 `grep` / `read`；禁止 `src/**` 全量 grep，先缩到具体模块。
- 找不到文件/开始排障/设计出方案前，先 `mcp__openviking__search`（`mode=context`，`detail=abstract`）查历史是否处理过、是否已有结论，再考虑 grep/glob 或直接动手。不要把 `viking://` 当磁盘路径读。
- DBX 长文本读不全时改 `git log` 或 `UNION ALL` 分段（细则在 `zentao-analyzer` 的 `references/dbx.md`），禁止同一形态连试三次。
- **OpenViking 检索失败即换（P1-1，2026-11-14）**：`mcp__openviking__search/find/read` **失败或超时 1 次**即改走 `session_search`/`grep`，禁止同形态重试；OpenViking 慢（实测 p-max ~5.7s、曾 120s 超时）不作为重试理由。**例外：`content/read` 的 `peers/github.com-tyvt-skills/memories/profile.md` 固定 404 属已知失效路径，不是重试问题，直接跳过，不套用「失败即换」也不重试。**
- 禁止提交 `env/.env` 与 `public/version.json`。`git pull` / `git rebase` 前先 `git status --short <子模块路径>`，脏的环境文件先 stash。**多子模块/需限定范围时禁止裸 `git status`（无范围）——易回灌大量未跟踪文件；根仓或已带 `git -C <dir>` 可裸用（R5 hook `bare-git-status` 会告警，见 agent-guard）。**
- 自动化环境的 `git commit` / `rebase --continue` / `merge` 必须先设 `GIT_EDITOR=true`。
- 未跑构建必须写「未执行」。构建、部署、回写证据不齐不收尾。

## 提问与收尾

- 修改、修复、配置、实现直接做完可逆部分并验证。只有高风险、不可逆、越权，或缺少无法推断的信息时才问。
- **不确定先问（clarify-first）**：遇到只能由用户提供的信息（账号密码/token、仓库地址/分支、部署环境地址、数据库连接串/库名）且无法从代码或配置推断时，加载 `clarify-first` skill，直接弹选项问，不要检索试错或硬猜；能 grep/read 得到的代码事实不必问。
- 要用户选择时只用 `ask_user_question`，禁止在正文末尾提问。已回答且范围未变的不重复问。
- **一次问清（2026-11-14 复盘；2026-11-19 前端例外）**：计划确认轮须把可预见待定项（上限取值、是否实施、严谨度补充、**提交方式：仅提交/提交并推送/暂不处理**）合并为**一次** `ask_user_question`（带默认选项），不得拆成多轮；**计划确认轮＝合并问「实施与否 + 提交方式」，不得等实施完再单独问提交**；已有 ask-guard 拦截二次 ask，此处为「未覆盖项并入首次提问」的正面清单。反例：turn3 三次人工等待、其中一次 ask 等待约 22 分钟。**前端例外：涉及 UI/页面/样式/交互的改动，提交方式/推送/禅道回写不并入计划确认轮，按「前端任务验证门」延至 agent-browser 验证出证据、用户确认后才弹；ask-guard 对该验证后提问放行。**
- 改动落在 Git 仓库时，收尾问：仅提交 / 提交并推送 / 暂不处理。用户本轮已明确说不用提交或直接提交推送时不再问。**前端任务以「前端任务验证门」为准：必须先验证+证据+用户确认，再弹此问，不在任务开始时弹。**
- **提交前一次性校验（P0-6，2026-11-13 复盘）**：提交前一次性核对脏文件、子模块状态、待推送范围（`git status --short <submodule>`），避免提交来回返工（复盘实例：step 51→53 提交返工）。
- **过程产物清零（P0，2026-11-19，强制）**：任务完成后，项目目录禁止残留任何过程产物——验证截图/录屏、`.tmp-*` 临时目录、`.task-state` 中间状态等，全部删除且**连目录一起删**。① 产物一律落项目外临时目录（Linux/macOS `${TMPDIR:-/tmp}`、Windows `$env:TEMP`），不写进项目目录；② 删除前校验路径非空且前缀命中预期临时根（禁 `rm -rf` 变量为空、禁裸删工作区）；③ 先列目录确认再删（dry-run），删后复核。前端任务的时序见「前端任务验证门」：图先入会话+落禅道，最后才清理。
- **收尾总结按 `concise-report`**：结论第一行 + 关键改动/证据（文件:行号、跑没跑测试）+ 待定项，删过程复述与客套，不丢信息；默认极简，用户说“展开”再详述。
- 收尾前 `job_list`，停掉不再需要的后台任务。工具参数报错先加载 `tool-call-hygiene` 再重试一次。
- `repo-safety`、`web-deploy` 仅当本会话技能目录已经列出时才加载；未注册则忽略，不要因此报错。
