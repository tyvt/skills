# Agent 规则（精简）

细节按需加载，不要把下面指向的 skill 整篇读进上下文，除非即将做对应操作。

简单 Bug（文案、显隐、单字段、明显空值、换一个已知 URL）只加载当前任务必须的那一个 skill。**不要**同时拉取 `zentao-analyzer` 和 `szfc-page-guard`。仅当改动涉及复杂表单、子表或加密接口时，才加载 `szfc-page-guard`。

## 主动执行与提问

1. 修改、修复、配置、实现类请求直接做完可逆部分并验证，不把步骤甩回给用户。
2. 常规实现按现有代码和合理默认值决定，不因有多种写法就提问。
3. 只有高风险、不可逆、越权，或缺少决定结果且无法推断的信息时才问。
4. 需要用户选择、确认或补充信息时，必须用 `ask_user_question` 弹卡片，禁止在正文末尾用「要吗」提问。每题一个决策点，2–4 个可执行选项，推荐项放首位并标注「（推荐）」。
5. 已回答或已授权且范围未变的事项不重复问。

## Token

1. 命令输出先过滤或分段，禁止把大段结果整段回灌。大文件一次 `write` 定稿，小改才 `edit`。
2. 单会话步数尽量控制在一百以内；上下文压力接近窗口 60% 就收尾或新开。
3. 同一会话不中途换模型、不改工具清单，否则整段缓存失效。运行中改 MCP 工具白名单后，当前会话不会重拉 tools/list：新工具报 UNKNOWN_TOOL 或 Connection closed，旧工具也可能消失。若工具报 UNKNOWN_TOOL，先判断是否刚改过 MCP 工具清单；是则说明需要新开会话，不要在本会话反复重试。
4. 你的 Token 很珍贵。未知具体路径时，禁止用 `grep` 或 `read` 全盘搜索。
5. 单步 reasoning 超过约 1.5k tokens 即停：反复自我辩论（宽度估算、要不要改配置、方案取舍）说明缺事实，先调一次工具（grep / 截图 / 查一条 SQL）拿到事实再决策，不要在脑内演算。

## 重活不进主模型

所有文件检索（`grep`、`read`）、构建与测试、账单查询，必须通过 `orchestrate` 编排器执行，或者调用特定的封装工具。宿主主模型只负责接收摘要结果，不亲自跑这些重体力步骤。编排器网关 `127.0.0.1:3425` 不可用时，才可直接处理并说明原因。

### 阈值与回退
- 以下操作一律先走 orchestrate（op=full / op=tool）：全仓或跨目录 grep、单文件 >300 行整读、npm run lint 全量、npm run build、账单/大结果查询。
- 单文件 ≤300 行、单条窄命令（npx eslint <file>、git status）可直接执行。
- 编排器不可用时，直连前必须在回复中写明「网关 127.0.0.1:3425 不可用」及原因；不得静默降级为主模型亲自跑重活。
- 同一工具同一错误最多重试一次，第二次先换方案（换 SQL / 换工具 / 换路径），禁止连续 3 次以上同形态重试。

## 编码默认走编排器

编码、修复、重构、实现默认先 `orchestrate`（一般 `op=full`；单点能力用 `op=tool`）。编排器负责检索、方案、代码文本、构建与测试；宿主只核对摘要后写入。单行或文案微调可直接改文件。

## 任务收尾

1. 收尾前用 `job_list` 核对本次后台任务，不再需要的用 `job_kill` 停掉。
2. 改动落在 Git 仓库时，用 `ask_user_question` 询问：仅提交 / 提交并推送 / 暂不处理。用户本轮已明确说不用提交或直接提交推送时，不再问。
3. 进行 Git 提交或新建 worktree 前，仅当本会话技能目录已经列出 `repo-safety` 时才加载它。未注册则直接忽略，不要调用 skill 工具，也不要因此报错中断。部署前端前，仅当已注册 `web-deploy` 时才加载。
4. 工具参数报错时先加载 `tool-call-hygiene` 再重试一次。长期记忆、跨会话检索走 OpenViking 与 `openviking-memory`，不要把 `viking://` 当磁盘路径读。
5. 用 PowerShell 调 OpenViking 等 HTTP 写入接口时，不要用 `Invoke-RestMethod` 的默认编码。JSON 正文必须先 `[System.Text.Encoding]::UTF8.GetBytes`，再用 `Invoke-WebRequest -ContentType 'application/json; charset=utf-8' -Body` 发送字节。整文件重写 UTF-8 源码仍禁止用 PowerShell 5.1 默认编码。
6. 执行 `git pull` 或 `git rebase` 之前，必须先运行 `git status --short`。若存在未暂存的环境文件（`env/.env` 及同类本地配置），先用 `git stash push -- env/.env`（需要时加 `-u`）隔离，再 pull/rebase；结束后按需 `git stash pop`。禁止在这些文件仍是脏工作区时直接 pull 或 rebase。提交前同样先看 `git status --short`，不要把环境文件夹进提交。

## 找不到就先搜记忆

遇到找不到文件（如账单、脚本），或者不知道某个组件在哪个仓库时，必须优先调用 `mcp__openviking__search`，不要盲目使用 `glob` 或 `pwsh` 遍历目录。搜不到再按已知路径继续。

默认只要摘要：`mode` 用 `context`，`detail` 固定为 `abstract`（只返回标题和摘要）。不要用 `overview` 或 `full` 把整段记忆灌进上下文。确认某一条要用之后，再对单条 URI 调用 `read` 展开。
