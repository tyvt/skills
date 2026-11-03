<!-- BEGIN long-term-memory-index -->
# 长期开发记忆库

从 Cursor、WorkBuddy、pi、zcode、Codex 的本地开发会话（含个人仓库来源）提炼的 **5537** 条技术经验。

## 关键约束：按需读取，一次只读一个文件

记忆库很大（约 3MB+），**绝不能通读**。正确用法：

1. 判断技术栈：小程序读 `--mp`，Web 后台读 `--web`；
2. 按主题找到对应文件，**一个文件 ≤40KB**，读一两个就够；
3. 主题分多个分片时（`-1`/`-2`），先读第 1 部分，不够再读下一片；
4. 只有问题明确指向某项目自己的组件/业务时，才读 `project/`；
5. 时效：🔵 约定类长期有效 ｜ 🟢 ≤7天 ｜ 🟡 ≤60天 ｜ 🔴 绑定旧实现，**引用前核对代码**。

## 主题索引

### 图表渲染（87 条）

小程序：`patterns/chart--mp.md`
Web后台：`patterns/chart--web-1.md` … 共 3 片

### 弹层层级与渲染（528 条）

小程序：`patterns/popup-layer--mp-1.md` … 共 2 片
Web后台：`patterns/popup-layer--web-1.md` … 共 16 片

### 样式作用域与主题（248 条）

小程序：`patterns/style-scope--mp-1.md` … 共 3 片
Web后台：`patterns/style-scope--web-1.md` … 共 6 片

### 接口与数据归一化 · 请求协议与加解密（176 条）

小程序：`patterns/data-api-protocol--mp.md`
Web后台：`patterns/data-api-protocol--web-1.md` … 共 6 片

### 图片与静态资源（271 条）

小程序：`patterns/image-static--mp-1.md` … 共 3 片
Web后台：`patterns/image-static--web-1.md` … 共 7 片

### 构建与调试（110 条）

小程序：`patterns/build-debug--mp.md`
Web后台：`patterns/build-debug--web-1.md` … 共 4 片

### 工程结构与约定（200 条）

小程序：`patterns/structure--mp.md`
Web后台：`patterns/structure--web-1.md` … 共 6 片

### 接口与数据归一化 · 字段容错与 0 值（455 条）

小程序：`patterns/data-api-fields--mp.md`
Web后台：`patterns/data-api-fields--web-1.md` … 共 16 片

### 表单与选择器（290 条）

小程序：`patterns/form-picker--mp-1.md` … 共 2 片
Web后台：`patterns/form-picker--web-1.md` … 共 8 片

### 接口与数据归一化 · 列表分页与 store（193 条）

小程序：`patterns/data-api-paging--mp.md`
Web后台：`patterns/data-api-paging--web-1.md` … 共 7 片

### 路由与跳转（240 条）

小程序：`patterns/navigation--mp-1.md` … 共 3 片
Web后台：`patterns/navigation--web-1.md` … 共 6 片

### 其他（941 条）

小程序：`patterns/misc--mp-1.md` … 共 3 片
Web后台：`patterns/misc--web-1.md` … 共 20 片

### 接口与数据归一化 · 其他（84 条）

小程序：`patterns/data-api-other--mp.md`
Web后台：`patterns/data-api-other--web-1.md` … 共 2 片

### 表格与布局（381 条）

小程序：`patterns/web-table--mp.md`
Web后台：`patterns/web-table--web-1.md` … 共 13 片

### 业务字典与编码（196 条）

小程序：`patterns/web-dict--mp.md`
Web后台：`patterns/web-dict--web-1.md` … 共 7 片

### E2E 与测试（145 条）

小程序：`patterns/web-e2e--mp.md`
Web后台：`patterns/web-e2e--web-1.md` … 共 6 片

### 接口与数据归一化 · 字典与状态映射（161 条）

小程序：`patterns/data-api-dict--mp.md`
Web后台：`patterns/data-api-dict--web-1.md` … 共 6 片

### 项目专属记忆

入口：`project/generated/index.md`（831 条，50 片；以此入口为准）。

<!-- END long-term-memory-index -->

## Token 与上下文（全局，所有 agent 默认遵守）

> 实测基线（2026-10-29 复核）：命中率 90.4%(10-26) → 96.1%(10-27) → 91.6%(10-28) → 97.5%(10-29)，
> 平均每步未命中 5973 → 3380 → 6694 → 3380；同日会话间差异达 **17 倍**（1266 ~ 22465/步）。
> 低效会话每步未命中 15k–22k（`8980f771` 42% / `5a6b17af` 38% / `c9e9d60d` 69%），
> 高效会话 1.3k（`4208fc64` 98% / `56f7fbda` 98%）。**差距不在步数，在每步未命中。**
> **首要变量是 provider 的缓存可靠性**（trae 38% / cursor 50% / opencode-free 69% vs workbuddy-ai-flash 98%），
> 其次才是读写习惯；中途切模型或工具清单变更会整段丢缓存。
> 详细规程见 skill `token-frugal`，可用 `node ~/.dsh/skills/token-frugal/audit-tokens.mjs [日期]` 审计。
>
> **成本口径（2026-11-02 复核，271 会话）：只盯未命中会严重低估。** 本机缓存读 19.44 亿 vs 未命中 1.34 亿（**14.5 倍**），命中率 93.6%；按缓存读≈未命中 1/10 单价折算，**成本约 59% 在缓存读、41% 在未命中**。因此统一用
> **等效成本 = cacheRead × 0.1 + uncached** 做排序与复盘口径，命中率再高也要看它。
> 两类病：① **总量型**——高命中率会话（97%+）因步数多、每步重发长历史，缓存读海量，占大头；② **重算型**——低缓存 provider + goal 续跑 + compaction 反复失败，每步未命中可达 5.7 万（健康会话约 2k）。
> **降本第一抓手是「压步数 × 压每步上下文」，不是再挤命中率**（命中率已 97% 时无空间，但步数砍半≈缓存读成本砍半）。

1. **压步数与每步上下文（第一抓手）**：长任务按「一批文件 / 一个子任务一个会话」拆开，单会话步数尽量压到一百内；上下文快照里「消息」常占 75–83%，历史越长每步重发越多，`pressureTokens` 接近 60% 窗口即收尾或开新会话，别靠 compaction 硬撑。
2. **读文件**：先 `grep` 定位行号，再用 `read` 的 `offset`/`limit`（默认约 400 行）；同一会话内同一文件**只整篇读一次**，后续只取片段，不重复整篇 `read`（2026-11-02 有会话重复整读 83 次）。
3. **大输出不回灌**：命令输出可能 >4KB 时，先 `Select-String`/`grep`/`head` 过滤或落盘分段；`job_output` 分段读。整段贴回历史会在后续**每一步**重发，是未命中飙升的主因。
4. **写文件不在对话里造**：大内容一次性 `write` 定稿；不要先写大段再多次 `edit`——每次 `edit` 的 `new_string` 都进历史。小改才用 `edit`。
5. **禅道 / 业务库 / 跨会话检索**：不要假设没有 MCP。调用 **`mcp_gateway`**：`server` 为 `dbx`（禅道与业务库）或 `context-mode`（大日志与历史会话）；省略 `tool` 先列工具，再带 `tool` + `arguments` 调用。
6. **长任务 / 调试**：一事一会话，`pressureTokens` 接近 60% 窗口即收尾或开新会话；调试先写诊断再动手，3 轮同一假设 = 白烧 2 轮全量未命中，必须换本质不同的方案。
7. **模型由用户选择，但选中后不中途切换**：具体用哪个模型以用户指定为准，本文件不预设默认模型。可在选择前提示各 provider 实测缓存可靠性（`workbuddy-ai/deepseek-v4.1-flash` 98%、`workbuddy-ai/deepseek-v4.1-flash-sg` 98%、`workbuddy/deepseek-v4.1-flash` 97.6%；`trae-cn` 38%、`cursor/grok-4.7@256k` 48.5%、`cursor/composer-2.5` 30%、`opencode-zen-free` 86%）供参考，不替用户做决定。**一旦选定，同一会话内不切模型、不动工具清单**——每次切换 = 整段前缀失效，把便宜缓存读打成全价未命中。
8. **compaction 反复失败立即换会话**：出现「summary is not smaller than the shadowed content」等压缩失败 ≥3–5 次，立即收尾换新会话，不要反复 resume 硬撑（2026-11-02 单会话 compaction 199 试/91 败，每败一次都是全量重算）。goal 轮数不做硬性上限，但撞到 compaction 持续失败或产出比 <5% 时，应如实汇报并按第 1 条拆片换会话。
9. **会话日志是多帧 zstd**：`~/.dsh/sessions/*/session.v4.jsonl.zstd` 由上千个 zstd 帧追加而成，`zlib.zstdDecompressSync(整个buf)` 只解第一帧（只得到 session 头一行）。要按 magic `28 B5 2F FD` 切帧逐帧解，否则审计会得出「0 工具错误/0 compaction」的假结论。`workflow-audit.mjs` 已内建，见 skill `token-frugal`。
10. **大工具结果只裁剪、不溢出**：`tool-result-pruner` 仅把头尾裁剪后**仍整段留在历史里、每步重发**；`spill-policy.maxInlineTokens:3000`（≈1.2 万字符）几乎不触发落盘。所以真正的省钱在**源头**：grep 先缩小范围、read 用 offset/limit、pwsh 先过滤（`Select-String`/`head`/落盘分段）。2026-11-02 实测单日工具结果 6183 条/8.5MB，其中 >8KB 的 186 条 2.2MB 全是 read/grep/pwsh 全量返回。

## 主动执行与确认方式（全局）

1. 用户提出修改、修复、配置、实现或其他行动请求时，应直接使用现有工具完成任务范围内的低风险、可逆操作，并进行适当验证；不要只给出方案、配置片段或操作步骤，让用户代为执行。普通代码、样式、文档、本地配置及 agent 规则修改，默认直接落地。
2. 根据上下文明确的目标和合理默认值自主处理常规实现选择；不因存在多种实现方式就要求用户选择。优先检查现有文件、配置、工具和会话上下文，避免询问可自行查明的信息。不要把明确的行动请求停留在“可以帮你”“是否需要我修改”或“你自行添加”。
3. 仅当存在真实的高风险、不可逆影响、超出已授权范围的外部操作，或缺少决定结果的关键信息且无法可靠推断时，才请求用户确认或补充信息。高风险示例包括删除不可恢复的重要数据、覆盖或丢弃用户改动、强制推送或重写共享历史、破坏性生产变更、泄露凭据及重大费用操作。已有明确授权且范围、影响未变化时，不重复确认；更高优先级的权限和工具限制仍须遵守。
4. 确需用户决定时，使用 `ask_user_question`（或当前环境等效的交互选项工具）弹出可点击选项，不能只在正文提问让用户手动输入。通常提供 2–4 个真实选项，推荐项放首位并标注“（推荐）”，每项用一句话说明具体影响；允许自由输入。风险确认单独成题，不与普通偏好混合。
5. 请求确认时简短解释必须确认的具体原因、操作范围及影响；如依据某条规则或工具限制，明确指出来源。先完成不依赖该决定的检查、准备和可审阅结果，再让用户确认最后的必要步骤。必须确认的操作在收到明确回答前不得执行，沉默或超时不视为同意。
6. 若当前环境没有选项工具或工具被禁用，应明确说明限制，再用简短编号选项作为替代，不得假称已弹窗。没有真实待定事项时，直接完成并汇报结果，不为弹窗而制造确认步骤。

### 问题卡片强制规则（全局，最高优先级交互约定）

**只要内容属于「需要用户定 / 需要用户确认 / 向用户提问」这三类，就必须用 `ask_user_question` 弹出问题卡片，禁止用正文纯文本呈现。** 正文只用于陈述已完成的结果与证据，不承担提问职能。

适用（必须弹卡片）：

| 场景 | 例子 |
| --- | --- |
| 需要用户**做选择** | 接口用 GET 还是 POST、改前端还是等后端、走 A 方案还是 B 方案 |
| 需要用户**确认**再执行 | 删除数据、强推、回写禅道、合并分支、部署 |
| 向用户**提问** | 环境确认、复现路径、账号凭证、字段含义 |
| 需要用户**补齐关键信息** | 缺接口文档、缺截图、缺权限码 |
| 任务收尾的**待定事项** | 是否提交/推送、是否清理临时文件、是否继续下一项 |

不适用（可以纯文本）：已经做完的结论、已执行的命令与结果、未验证项说明、风险提醒、进度汇报。**汇报不是提问，提问必须弹卡。**

硬性写法要求：

1. 一次可以问多题（`questions` 数组），但**每题只能一个决策点**；风险确认单独成题，不与普通偏好混在同一题里。
2. 每题给 2–4 个**真实可执行**的选项，推荐项放首位并标注「（推荐）」，每项一句话说清影响；同时允许用户自由输入。
3. 问题正文写清**背景 + 为什么要你定 + 各选项后果**，不要只写一句“是否继续”。
4. **不得**把待定事项写在正文末尾然后用“要吗？”结尾了事。**也不得**先纯文本问一遍、再补一个卡片；发现遗漏时应重新弹卡。
5. 用户已回答的事项不重复问；已有明确授权且范围未变时，不重复确认。

> 来源：用户明确要求（2026-11-02）——「需要我定的和确认的、问题的，一定要有问题卡片，不要直接纯文本返回给我」。
> 事故：bug 6023 收尾时把「是否提交推送 / 是否清理临时文件 / 是否回写禅道」三个待定事项写成正文问句，用户只能逐条打字回复。

## 文件链接与修改结果展示（全局）

1. 在 DeepSeek Harness Web GUI 中引用工作区文件时，使用相对于当前会话工作目录的 Markdown 链接，路径分隔符使用 `/`，目标路径用尖括号包裹。例如：`[ruoyi.js](<zhi2-web-admin/src/utils/ruoyi.js>)`。相对路径基准是会话工作目录，不是执行某条命令时临时指定的 workdir，也不是子仓库根目录。
2. 文件链接目标只包含真实文件路径，不附加 `:842`、`#L842` 或其他行号、列号、片段；不要对工作区内文件使用 Windows 盘符绝对路径或 `file://` 链接。用户已确认相对路径且不带行号的链接可以直接打开，旧格式曾提示文件不存在。
3. 需要定位代码时，将行号范围或搜索关键词写在链接外的正文中，例如“修改位于第 843–856 行，搜索 `leasePersonnelRoutes`”。
4. 完成修改后，在回复中提供主要修改文件的可点击链接，并说明改动用途；发出链接前核对文件存在及其相对路径。工作区外文件不得伪造成工作区内相对路径，应明确其位置并使用当前环境支持的打开方式。

## 工具调用卫生（全局，所有 agent 默认遵守）

工具调用失败绝大多数来自「模型行为 / 契约违反」而非 harness bug。出现以下错误码时，**先加载 `tool-call-hygiene` skill 取修正写法，再重试一次**，不要原样重复坏调用：`INVALID_ARGS`、`ESCALATION_ARGS`、`FS_NOT_OBSERVED`、`FS_STALE_VERSION`、`FS_NOT_FOUND`、`FS_NOT_TEXT`、`GOAL_TOOL_INVALID_UPDATE`、`GOAL_INVALID_TRANSITION`、`SEARCH_FAILED`、`SEARCH_RAW_OUTPUT_OVERFLOW`、`SEARCH_ABORTED`、`WEB_BLOCKED_URL`、`WEB_PROVIDER_ERROR`、`UNKNOWN_TOOL`、`TOOL_TIMEOUT`。

高频规则（完整版与自愈表见该 skill）：
1. `justification` 不是「理由」字段：只有和 `sandbox_permissions` 一起（一次性重试被沙箱拒绝的操作）才传；普通读写改不要传，也不要传空串。
2. 布尔字段（`run_in_background`、`replace_all`）必须是 `true`/`false`，不是 `"true"`/`"false"`。
3. `todo_write` 项只有 `content` + `status`，不要加 `id`/`activeForm`；顶层只用 `todos`。
4. 改/写已存在文件前先 `read`（fs-observation-policy）；新建文件不需要先读。
5. `FS_STALE_VERSION`（"file changed since it was read"）先重读当前内容再改，不要原样重试 `old_string`。
6. `read` 只读 UTF-8：图片用 `read_image`，GBK/GB2312 源码用 `pwsh`（`Get-Content -Encoding`）查看。
7. `grep` 的 `include` 是单个 glob（`{a,b}` 交替表示多个）；具体文件路径先用 `glob` 校验存在。
8. `update_goal` 的 `objective`/`max_goal_rounds` 仅配 `action:"edit"`；不要 resume 已激活的 goal。

审计近期会话失败率（只读，落盘脱敏统计）：

- `node "$env:USERPROFILE\.dsh\skills\tool-call-hygiene\scan.mjs"` —— 只统计**工具层**。
- `node "$env:USERPROFILE\.dsh\skills\tool-call-hygiene\audit.mjs"` —— 同时统计**工具层 + 供应商层**
  （`llm/retry` 的 503 / 429 / EOF），报告落在 `~/.dsh/reports/agent-failures-latest.json`。
  排查「agent 调用失败」时用这个，它覆盖面比 scan.mjs 全。

## 后台任务清理（全局，所有 agent 默认遵守）

1. 任务完成、给出最终结论之前，先用 `job_list` 核对本次会话启动过的所有后台任务（`run_in_background` / 超时转入后台的 pwsh、`job_output` 长任务等）。
2. 已经不再需要的后台任务一律用 `job_kill` 终止，并再次 `job_list` 确认没有残留的 `running` 任务；确认后再收尾回复。
3. 确实仍需继续运行的长期任务要保留，并在最终回复中说明其 job id 与用途，不要静默遗留。
4. 只清理**本次任务**产生的后台任务，不要误杀其他会话或他人仍在使用的任务。

## 前端项目本地部署（全局，所有 agent 默认遵守）

1. **本地禁止启动前端项目**：任何前端项目都不在本地启动开发服务器（`npm run dev`、`vite`、`webpack serve`、`next dev` 等一律不启动）。
2. **改完必编译**：前端项目修改完成后，一律先执行构建（如 `npm run build`），产出 `dist` 目录。
3. **用本地 nginx UI 部署**：构建后通过本地 nginx UI 部署站点，站点根目录（root）指向当前项目的 `dist` 目录。
   - 当前项目已有对应 nginx UI 站点：复用该站点，把 root 更新为本项目 `dist` 目录。
   - 当前项目还没有对应站点：新增一条站点配置，目录指向本项目 `dist` 目录。
4. **自动化测试同样处理**：E2E/集成等自动化测试也走「先构建 → 通过本地 nginx UI 部署的站点访问测试」，不启动前端本地服务、不连本地 dev server。
5. **验证以部署站点为准**：交付与联调验证一律针对 nginx UI 部署后的站点，而非本地开发服务器。
6. **统一使用 nginx UI 部署**：所有前端项目一律通过本地 nginx UI 部署站点，不使用其他本地静态服务器（如 `http-serve`、`live-server`、`serve`、`python -m http.server` 等）替代。

## 供应商失败（第二层，单日比工具层还多）

供应商抽风不会返回工具错误，而是直接终结整轮，2026-10-29 实测单日 71 次
（SERVER_5XX 50 / RATE_LIMIT 15 / TRANSPORT 6），其中 38 轮因此报废。

1. **重试预算**：内建 llm-retry 是「每会话每 provider 5 次」。预算用完后 provider 的
   503/429 直接变成致命错误。`dsh-agent-guard` 在预算之外再给 3 次带退避的恢复机会。
2. **额度型 429 重试无意义**：报错里的重置时间通常是几小时后，别原地转圈。
   连续 429/503 时换 provider 的同名模型继续（`workbuddy-ai/deepseek-v4.1-flash`
   → `opencode-zen-free/deepseek-v4.1-flash-free` 或 `cursor/deepseek-v41-flash-1017`）。
3. **只在故障时换模型**：换模型会让整段前缀缓存失效，只在挂掉时换，长任务里不要主动换。

## dsh-agent-guard：参数形状守卫

`~/.dsh/agent-guard/` 是本机插件，已挂进 web / headless 两个 profile。它在工具自己的
参数校验**之前**修参数，把下列高频失败直接消掉（每条都来自真实失败样本）：

- `update_goal` 带了不属于该 action 的字段 —— `objective`/`max_goal_rounds` 只能配
  `action:"edit"`，`blocked_reason` 只能配 `action:"blocked"`。当日第一大失败类别，11 次。
- `justification` 与 `sandbox_permissions` 落单（只出现一个就会被拒）。
- 工具名被拼进 JSON 片段（实测出现过 `grep">`）。
- 参数类型不合约（`"true"` → `true`）、`additionalProperties:false` 的多余字段、
  非必填字段上的 `null`。
- `todo_write` 的 `todos[]` 上多了 `id`/`activeForm`。

守卫只做**语义唯一可推断**的修复；路径写错、文件没读就改这类需要业务判断的不碰
（改变行为的风险大于收益）。每次修复都记账在 `~/.dsh/reports/agent-guard-ledger.jsonl`。
回归测试：`node "$env:USERPROFILE\.dsh\agent-guard\selftest.mjs"` 与
`node "$env:USERPROFILE\.dsh\agent-guard\integration-test.mjs"`。

## 代码改动必须走 worktree（全局，所有 agent 默认遵守）

任何代码改动（新增、修改、删除源码/配置/脚本等会产生提交的改动）都必须在独立的 git worktree 中进行，禁止直接在当前主工作区分支上改代码。固定流程如下：

1. **切 worktree**：从当前主分支创建独立 worktree 处理改动，例如 `git worktree add ../<repo>-wt-<slug> -b <branch>`（分支名带上任务 slug/禅道 ID；子模块改动同样在子模块仓库内单独建 worktree）。不切到猜测的分支，先在主仓库确认当前分支与基线。
2. **在 worktree 内开发与验证**：所有编辑、构建、测试都在该 worktree 内完成，不污染主工作区。
3. **合并回原分支**：改动验证通过后，合并回原来的分支（切回主工作区原分支执行 `git merge`，优先 fast-forward 或保留历史的正常合并，禁止强制推送、重置、丢弃改动；有冲突按保留双方工作的方式解决）。
4. **删除 worktree**：合并成功后执行 `git worktree remove <path>`（必要时先 `git worktree prune`），确认主工作区恢复干净。
5. **提交推送后再更新禅道**：先完成代码提交与推送（含子模块自底向上，见下文“Git 提交与推送”），确认目标提交已存在于远程分支后，**最后**再回写禅道（状态、备注、关联提交等）。顺序不可颠倒：未提交推送前不更新禅道。

若改动属于文档、记忆、agent 规则等非代码内容，或用户 / 既有约定另有明确指示，以用户要求为准。worktree 路径、分支名与清理情况在最终回复中说明；任何一步（建 worktree、合并、删除、推送、回写禅道）失败都要报告具体阻碍，不得跳过后宣称完成。

### 多条任务并行时的 worktree 归属（强制）

上面「必须走 worktree」是**新建 worktree** 的意思，不是「复用已有的任何一个 worktree」。同一台机器上经常同时跑多个任务，各 `*-wt-*` 目录里可能是**别人正在做、尚未提交也尚未验收**的半成品，直接复用会覆盖或污染他人的工作，比不建 worktree 更危险。

1. **开工先枚举，再决定落点**：
   ```powershell
   git worktree list
   Get-ChildItem .. -Directory -Filter '<repo>-wt-*'    # 含子模块的，在子模块仓库里再看一遍
   git -C <path> status --short; git -C <path> log --oneline -3
   ```
2. **用户说「在主分支做 / 不用碰某个 worktree」时，这是硬约束**，优先级高于「必须走 worktree」：本轮直接在主工作区对应分支改，**不得**进入、修改、合并、删除那个 worktree，也不把它未提交的文件当基线去「顺手改造」。用户明确豁免时不再重复询问建 worktree。
3. **每个任务一个独立 worktree，绝不复用**：新建路径带上任务标识（禅道 ID/slug），与现有目录不重名；发现同名或同分支被占用，换一个名字，不要去改旧的。
4. **动手前先确认真实目录存在**：`Test-Path` 核对目标根目录，尤其是别的任务新建的目录（如 `src/views/<module>/<newFeature>/`）——它往往只存在于那个 worktree，本工作区里根本没有。不存在就按本任务新建，不要跨 worktree 借目录。
5. **收尾核对归属**：`git worktree list` 与开工前对比，本轮涉及的每个改动都必须能说清在哪个 worktree、哪个分支；不属于本轮任务的 worktree 状态发生变化，必须在最终回复中报告。

> 事故（2026-11-02，bug 6023 / 预售资金 1413·1415）：用户要求「在主分支做，不要碰预售资金 worktree」，agent 却把全部代码写进了 `szfc-v3-wt-prefund-new`，与那里另一个并行任务新建的 `src/views/supervision/account/**` 撞在同一个目录，6 个文件写完未提交即被中断，两轮工作一起作废。教训：**先把「落哪里 / 不碰哪里」确认成硬约束，再动手**。

## 技能库 / 记忆库防零填充提交（全局强制）

`D:\repository\skills` 是技能库真实存储（`~/.dsh/skills`、`~/.cursor/skills`、`~/.claude/skills` 都只是指向它的符号链接），远程为 `tyvt/skills`。曾发生过整个 `SKILL.md` 与 `*.mjs` 被写成**长度正确但内容全是 0x00（NUL）**，且被 `git add -A && commit && push` 推到远程，导致远程备份与本地一起报废、所有历史版本均无真内容可恢复。

因此对本目录（及任何记忆库 `long-term-memory/`）提交前必须做到：

1. **提交前校验非零**：暂存后逐个检查被暂存文件，凡 `size>0` 但含 NUL 或可打印字符占比过低（疑似零填充/截断）一律拦截，不得提交。可用：
   ```powershell
   git diff --cached --name-only | ForEach-Object {
     $b=[System.IO.File]::ReadAllBytes($_)
     $z=($b | Where-Object {$_ -eq 0}).Count
     if($b.Length -gt 0 -and $z -gt ($b.Length*0.05)){
       Write-Warning "疑似零填充: $_ (zeros=$z/$($b.Length))"
     }
   }
   ```
2. **不用 `git add .` / `git add -A` 盲暂存**技能库；逐路径或按目录小范围暂存，看到 `git diff --cached --stat` 里出现大段异常的等尺寸重写要停下来查。
3. **写文件后立即自检**：任何 `write`/`edit` 完成后，若怀疑被截断，读回前 1KB 确认是正常文本而非 NUL。
4. **禁止在未核对内容时对一个已损坏的工作区做“提交备份”**——那会把损坏固化进历史。发现文件已全零，先判断能否从别处恢复（会话日志、历史快照、另一处副本），确认恢复后再提交。
5. 提交技能库前如发现零填充文件且无法恢复，如实报告，不要用“占位内容”或空文件蒙混提交冒充已修复。

## Git 提交与推送：主仓库与子模块

当用户要求“提交代码”“推送代码”“提交推送代码”或同义操作时，默认覆盖本次任务涉及的主仓库与子模块，不得只处理当前目录所在仓库。仅要求提交时不擅自推送；要求推送时检查本次任务是否还有必要的提交。用户明确限定仓库或范围时，以用户要求为准。

### 任务完成时的提交询问（全局强制）

**每次任务完成、给出最终结论之前**，无论用户是否提到 Git，都要先判断本次任务改动所在的目录是否属于 Git 仓库：用 `git rev-parse --is-inside-work-tree` 确认，并向上识别子模块与最外层主仓库（见“执行前检查”）。

只要属于 Git 仓库、且本次任务产生了代码或文件改动，就**必须**在最终回复时用 `ask_user_question` 主动询问用户是否需要提交（以及是否推送）代码，**不得默认跳过、也不得未经询问就直接提交或推送**。询问选项至少包含：`仅提交` / `提交并推送` / `暂不处理`，推荐项按上下文放置并标注“（推荐）”。

例外：用户在本轮已明确指示（例如“不用提交”“直接提交推送”）或已有既定约定时，以用户要求为准，不再重复询问。工作区无改动、或改动目录不属于任何 Git 仓库时，无需询问。

### 执行前检查

1. 确定当前 Git 仓库，通过 `git rev-parse --show-superproject-working-tree` 逐层向上查找，直到最外层主仓库；当前工作目录不是提交范围的边界。
2. 从最外层主仓库检查 `.gitmodules`、`git submodule status --recursive`，检查主仓库及已初始化子模块的工作区、暂存区、分支、远程和未推送提交。无子模块时按普通仓库处理。
3. 明确本次任务的改动范围，使用具体路径暂存，检查暂存差异；不得默认使用 `git add .`，不得夹带无关改动、临时文件、截图或敏感信息。已有暂存内容也必须核对。
4. 本次任务涉及的子模块若未初始化、处于 detached HEAD、推送目标不明确或存在冲突，先根据已有上下文处理能确定的问题；无法确定时报告具体阻碍，不得跳过后宣称整体完成。不得擅自切换到猜测的分支或初始化无关子模块。

### 提交推送顺序

1. 按依赖关系自底向上处理：最深层子模块 → 上层子模块 → 最外层主仓库。
2. 每个相关仓库完成适当检查后，提交本次任务改动；要求推送时，再推送到已确定的远程分支。
3. 即使子模块工作区干净，也要检查本次任务相关的未推送提交，不能因为“无改动”而漏推。
4. 要求推送时，确认子模块目标提交已存在于对应远程分支后，才能在父仓库中提交更新后的 gitlink 引用并推送。
5. 子模块处理完成后，必须继续检查父仓库的 gitlink 变化，逐层处理到最外层主仓库，不得在子模块完成后提前结束。
6. 任一步失败，保留已完成结果并报告具体阻碍；不得擅自强制推送、重置、丢弃改动或绕过检查。远程更新时采用保留已有工作的正常同步方式解决。

### 完成标准

只有以下条件全部满足，才能报告“提交推送完成”：

- 本次任务涉及的所有仓库均已完成必要提交与推送。
- 父仓库记录的子模块提交与预期一致，且引用的提交均已推送到对应远程分支。
- 已检查远程最新状态，本次操作涉及的本地分支与推送目标已同步。
- 没有遗漏本次任务相关的未提交改动或未推送提交。

仅要求提交时，按相同的自底向上顺序提交并验证各层引用，不以未推送为失败，也不得声称已推送。
最终回复列出各相关仓库的分支、提交号和提交／推送结果；存在未纳入提交的改动时简要说明。无需为按此规则处理本次任务的父仓库引用再次请求确认。

