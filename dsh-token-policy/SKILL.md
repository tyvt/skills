---
name: dsh-token-policy
description: DSH 会话的 token 与编排器路由细则。当任务涉及大文件检索、全量 lint/build、账单查询、编码实现，或需要判断要不要走 orchestrate、截图何时读、会话何时收尾时加载。常驻禁止项在 AGENTS.md，不在这里重复。
---

# Token 与编排器路由

常驻禁止（全仓 grep、递归列 worktree、未验收收尾）在 AGENTS.md。这里只放阈值。

## Token

1. 命令输出先过滤或分段，禁止大段结果整段回灌。大文件一次 `write` 定稿，小改才 `edit`。
2. 单会话步数尽量控制在一百以内；上下文压力接近窗口 60% 就收尾或新开。
3. 同一会话不中途换模型、不改工具清单，否则整段缓存失效。运行中改 MCP 工具白名单后，当前会话不会重拉 tools/list：新工具报 UNKNOWN_TOOL 或 Connection closed。若刚改过清单，说明需要新开会话，不要在本会话反复重试。
4. 单步 reasoning 超过约 1.5k tokens 即停：反复自我辩论说明缺事实，先查一条命令再决策。cost-meter 会在连续第 2 个纯推理步自动升级为 `[reasoning-watchdog] 已连续 N 步无工具调用`，收到即必须下一步调工具。
5. 截图最后读、一次一张。图片 attachment 打穿 prefix cache，读 1 张后后续 step 全价计费。多图任务把读图放到上下文尾部。

## 重活走编排器

文件检索、构建与测试、账单查询走 `orchestrate`。**执行类一律 `op:"full"`**（构建/跑命令/检索/读大文件/改代码）；`op:"tool"` 只做纯文本加工，**不执行命令**，别用它跑 build/命令/读盘，否则模型只回「我没有执行能力」，活全推回主模型、token 与耗时双爆。宿主只收摘要。网关 `127.0.0.1:3425` 不可用时才可直接做，并在回复里写明「网关 127.0.0.1:3425 不可用」及原因，不得静默降级。

- 先走 `op:"full"`：单文件 >300 行整读、`npm run lint` 全量、`npm run build`、账单/大结果查询。
- `execution:{program,args}` 的 `workdir` 必须是**含 `package.json` 的前端子模块目录**（如 `zhi2-web-admin/`），**不是父仓根**；否则 `orchestrate` 报 `INVALID_EXECUTION`。
- 单文件 ≤300 行、单条窄命令（`npx eslint <file>`）可直接执行。
- 同一工具同一错误最多重试一次，第二次换方案。

## 编码

编码、修复、重构、实现默认先 `orchestrate`。编排器负责检索、方案、代码文本、构建与测试；宿主核对摘要后写入。单行或文案微调可直接改文件。

## 运行时守卫（插件自动执行，不必再靠自觉）

以下由本地插件在工具执行期/每步前自动生效，收到对应提示时**直接照做**，不要争辩：

- `agent-guard`：工具参数形状修复；pwsh POSIX 命令预检（`head`/`tail`/`cat` 自动改写，`grep`/`sed`/`awk`/`wc`/`find` 告警）；glob 绝对路径分隔符规范化；仓库根/容器级 grep·glob 拦截（拒绝时给可直接照抄的 `glob{path,pattern}`/`grep{path,pattern,include}` 模板）；`Get-ChildItem -Recurse` 递归列举拦截；同会话重复整读拦截（提示上次读到的行区间 + 续读 `offset`）；`ask_user_question` 缺 `id` 自动补 `q0/q1`。
- `token-guard`：grep **文件 ≥5 且 命中 ≥30** 才折叠为文件清单+**行号**（组合条件，单文件几十条也回行内容；带 `-C/-A/-B` 上下文时不折叠）；read 未带 `offset/limit` 时：`.vue` >500 行、其余 >300 行门禁不回内容；read >500 行且带 range 时截断兜底。
- `cost-meter`：单步未命中/输出超预算提醒；连续纯推理步（单步 >3000 且无工具）升级为「下一步必须调工具」；连续大未命中升级为「只允许窄读/带 path 的 grep/一条 SQL」白名单；同一 turn 命中的多条检查**合并成一条** user 消息（不逐步刷屏、少打穿 cache）；意图含「修改+验证+提交」时提示先 todo_write；已开始改文件却无构建基线时提示先 build；收尾证据不齐时提示。

## 平台限制（插件无法实现，只能规则约束）

- **流中截断**：生成过程无法拦截，只能下一步用 cost-meter 提醒（P2-9）。
- **按阶段调 reasoningEffort / maxReasoningTokens 硬上限**：`reasoningEffort` 在 turn 开始时已固定，pre-step 只能在 enter/reject 间选，无法中途降档或硬截断（P2-10 / A.4）；用 cost-meter 的「下一步必须调工具」在行为层截断。
- **compaction 摘要分级 / 压缩后注入已读清单 / 提前在 60–70% 压缩 / 保留已编辑片段**：compaction 由平台注入层与 host 策略控制，插件改不到摘要内容与时机（D 节）；只能通过减少整读、grep 折叠（token-guard）降低压缩触发频率与压缩损失。
- **系统提示/catalog/memory/runtime 增量注入（digest+diff）**：由平台注入层控制（H 节）。
- **技能 catalog 瘦身 / AGENTS.md 分级 / 稳定前缀 cache**：由平台注入层控制，插件改不到，需要 DSH 本体支持 include 与更短 catalog（P4-15/16/17）。
- **dbx 复合事务工具**：MCP 服务端能力，非本地插件可加（P5-18）；但 INSERT 列数预校验已由 `mcp_gateway` 在发送前拦截（F2）。

## 长任务监听与日志

任何**预计可能超过 1 分钟**的任务（build、全量测试、批量查询、长编排、大目录检索、部署）都必须加日志 + 每 30 秒状态检查，禁止静默阻塞干等。用后台作业 watchdog：

- 脚本：`dsh/scripts/task-watchdog.ps1`；用法见 `dsh/scripts/task-watchdog.md`。
- 以 `run_in_background: true` 启动，它写 `.task-state/<Name>.state.json`（`{name,pid,startTs,lastHeartbeat,status,logPath,exitCode,endTs}`）并每 30 秒打印 `[watchdog HH:mm:ss] <Name> running <elapsed>s` 心跳，日志落 `.task-state/<Name>.log`。
- 主控每半分钟用 `job_output` 读一次；出现 `[watchdog] STALL ...` 或连续两次无心跳即视为疑似卡死，查 `.task-state` 与日志尾部后决定止损/`job_kill`，不要原样重试。
- 最小验证：`pwsh -NoProfile -File .\dsh\scripts\task-watchdog.ps1 -Name demo -Command 'Start-Sleep -Seconds 5; Write-Output ok' -IntervalSeconds 2`。

## 收尾自查

收尾前跑 token-optimizer，看等效成本与未命中 TOP；超预期先说清原因。未验收（构建/部署/回写证据没齐）不收尾。bug6369 停在 163k 未验收就收尾，是反面样本。
