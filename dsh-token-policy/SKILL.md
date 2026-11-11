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

文件检索、构建与测试、账单查询走 `orchestrate`（`op=full` 或 `op=tool`）。宿主只收摘要。网关 `127.0.0.1:3425` 不可用时才可直接做，并在回复里写明「网关 127.0.0.1:3425 不可用」及原因，不得静默降级。

- 先走 orchestrate：单文件 >300 行整读、`npm run lint` 全量、`npm run build`、账单/大结果查询。
- 单文件 ≤300 行、单条窄命令（`npx eslint <file>`）可直接执行。
- 同一工具同一错误最多重试一次，第二次换方案。

## 编码

编码、修复、重构、实现默认先 `orchestrate`。编排器负责检索、方案、代码文本、构建与测试；宿主核对摘要后写入。单行或文案微调可直接改文件。

## 运行时守卫（插件自动执行，不必再靠自觉）

以下由本地插件在工具执行期/每步前自动生效，收到对应提示时**直接照做**，不要争辩：

- `agent-guard`：工具参数形状修复；pwsh POSIX 命令预检（`head`/`tail`/`cat` 自动改写，`grep`/`sed`/`awk`/`wc`/`find` 告警）；glob 绝对路径分隔符规范化；仓库根/容器级 grep·glob 拦截；`Get-ChildItem -Recurse` 递归列举拦截；同会话重复整读拦截。
- `token-guard`：grep 命中 >20 或 >10 文件时**折叠为文件清单+计数**（不回行内容）；read 未带 `offset/limit` 且 >300 行时**门禁不回内容**；read >500 行且带 range 时截断兜底。
- `cost-meter`：单步未命中/输出超预算提醒；连续纯推理步升级为「下一步必须调工具」；连续大未命中升级为「只允许窄读/带 path 的 grep/一条 SQL」白名单；意图含「修改+验证+提交」时提示先 todo_write；已开始改文件却无构建基线时提示先 build；收尾证据不齐时提示。

## 平台限制（插件无法实现，只能规则约束）

- **流中截断**：生成过程无法拦截，只能下一步用 cost-meter 提醒（P2-9）。
- **按阶段调 reasoningEffort**：`reasoningEffort` 在 turn 开始时已固定，pre-step 只能在 enter/reject 间选（P2-10）。
- **技能 catalog 瘦身 / AGENTS.md 分级 / 稳定前缀 cache**：由平台注入层控制，插件改不到，需要 DSH 本体支持 include 与更短 catalog（P4-15/16/17）。
- **dbx 复合事务工具**：MCP 服务端能力，非本地插件可加（P5-18）。

## 收尾自查

收尾前跑 token-optimizer，看等效成本与未命中 TOP；超预期先说清原因。未验收（构建/部署/回写证据没齐）不收尾。bug6369 停在 163k 未验收就收尾，是反面样本。
