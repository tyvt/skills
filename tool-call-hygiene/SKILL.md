---
name: tool-call-hygiene
description: 工具调用失败的自愈手册。当工具返回 INVALID_ARGS / ESCALATION_ARGS / FS_NOT_OBSERVED / FS_STALE_VERSION / FS_NOT_FOUND / FS_NOT_TEXT / FS_EDIT_NOT_FOUND / FS_AMBIGUOUS_EDIT / GOAL_INVALID_TRANSITION / UNKNOWN_TOOL / TOOL_TIMEOUT / SEARCH_FAILED 等错误码时，先查本 skill 的修正表再重试一次，不要原样重复坏调用。也用于审计近期会话的工具失败率。
---

# tool-call-hygiene — 工具调用卫生 & 自愈表

绝大多数工具错误是「模型行为 / 契约违反」，不是 harness bug。规则：**出错先查表修正，重试一次仍失败就换本质不同的方案；绝不原样重复坏调用。**

## 1. 高频错误自愈表

| 错误码 | 根因 | 修正写法 |
|---|---|---|
| `FS_NOT_OBSERVED` | 改/写已存在文件前没 `read`（fs-observation-policy） | 先 `read` 该文件再 `edit`/`write`。新建文件不需要先读。 |
| `FS_STALE_VERSION` | 文件在 read 之后被别处改了 | **重读**当前内容，把改动 rebase 到新内容再写；不要原样重试 `old_string`。 |
| `FS_EDIT_NOT_FOUND` | `old_string` 没精确匹配（多余空格/换行/被裁剪过） | 重读目标片段，用**唯一且完整**的一段做 `old_string`；确认没有制表符/全角空格差异。 |
| `FS_AMBIGUOUS_EDIT` | `old_string` 在同一文件里匹配多处 | 用更长/带上下文的唯一片段，或明确 `replace_all: true`；不要原样重试。 |
| `FS_NOT_FOUND` | 路径不存在，或 `offset` 超出文件行数 | 先用 `glob` 校验路径存在；worktree 任务用 worktree 内路径，别回主仓库；`read` 前先确认总行数再给 `offset`。 |
| `FS_NOT_TEXT` | 拿 `read` 读二进制/非 UTF-8 | 图片用 `read_image`；GBK/GB2312 源码用 `pwsh`（`Get-Content -Encoding`）查看。 |
| `INVALID_ARGS` | 参数形状不对 | 见第 2 节字段清单；布尔用 `true/false`，不要 `"true"`；不要塞多余字段。 |
| `INVALID_ARGS`（`arguments: "{}"`） | 长上下文退化：模型把必填参数整体吐空（`missing required property "pattern"/"file_path"/"command"`） | guard 无法推断必填值，**不要继续刷重试**；连续 2 次立即收尾换会话/压缩上下文，这是模型退化信号而非形状错误。 |
| `ESCALATION_ARGS` | `justification` 与 `sandbox_permissions` 落单 | 二者**要么都传要么都不传**；普通读写改不要传 `justification`。 |
| `UNKNOWN_TOOL` | 工具名拼错/被拼进 JSON/用了旧名 | 核对工具名；`grep">` 是被误拼进参数；`schedule_update` 是旧名，正确为 `schedule_edit`（guard 已能自动改写）。 |
| `TOOL_TIMEOUT` | 命令太久 | 拆小、加 `timeoutMs`，或 `run_in_background` 再 `job_output`。`session_search` 固定 120s 超时：先加 `session_id`/时间范围/更短 query 缩小范围，超时后**不要原样重试**，改走 `context-mode` MCP。 |
| `GOAL_ALREADY_EXISTS` / `GOAL_INVALID_TRANSITION` | goal 状态非法 | `objective`/`max_goal_rounds` 只能配 `action:"edit"`；`blocked_reason` 只能配 `action:"blocked"`；不要 resume 已激活的 goal。 |
| `SEARCH_FAILED` / `WEB_*` | 搜索/网页失败 | 换关键词或换 URL；`WEB_BLOCKED_URL` 是被拦截的域名。`grep` 的过滤字段是 `include`（不是 `glob`），`path` 目录先用 `glob` 校验存在。 |
| `DBX_TOOL_ERROR`（无效的表或视图名 / 无效的列名） | 达梦上没查数据字典就猜表名或列名 | 先查 `ALL_TABLES` / `ALL_TAB_COLUMNS`。`dbx_describe_table` 返回 `No columns found` 不算列清单。 |
| `INVALID_ARGUMENT`（OpenViking `detail`） | `detail` 配了 `mode=list` | `detail` 只能配 `mode=context`，否则丢掉 `detail`。 |
| PowerShell `ParserError` / `TerminatorExpectedAtEndOfString` | `git commit -m` 用了双引号，正文里的引号被吞 | `-m` 用单引号。 |
| PowerShell 把 `@{u}` 当哈希解析 | 双引号内 `@{...}` 被 PS 展开 | refspec 一律单引号：`git rev-parse '@{u}'`（bug6401 实测）。 |
| `node ../node_modules/...` 解析到不存在目录 | worktree 内相对路径 `../` 指向 worktrees/ 而非仓库根 | 相对路径先 `Test-Path` 验证或改用仓库根绝对路径；同一错误第二次必须换路径/方案。 |

## 2. 常见参数形状

- `justification`：**只有**和一次性 `sandbox_permissions` 重试一起用才传；普通调用不传、不传空串。
- 布尔：`run_in_background`、`replace_all` 必须 `true/false`。
- `todo_write`：项只有 `content` + `status`；顶层只有 `todos`；不要 `id`/`activeForm`。
- `grep.include`：单个 glob，多个用 `{a,b}`；具体文件先用 `glob` 校验。字段名是 `include`，不是 `glob`（guard 已能自动改写）。
- 定时任务：更新用 `schedule_edit`，不是 `schedule_update`（guard 已能自动改写）。
- `read`：默认 400 行，用 `offset`/`limit` 续读；`offset` 不要超过文件总行数。
- `update_goal`：见上表 GOAL_* 行。
- worktree：代码改动在独立 worktree 内读写，路径用该 worktree 的绝对路径，别回主仓库目录。

## 3. 审计近期失败率

```powershell
# 只统计工具层
node "$env:USERPROFILE\.dsh\skills\tool-call-hygiene\scan.mjs"
# 工具层 + 供应商层（llm/retry 的 503/429/EOF），报告落 ~/.dsh/reports/agent-failures-latest.json
node "$env:USERPROFILE\.dsh\skills\tool-call-hygiene\audit.mjs"
# 指定日期复盘（审计与晨报都支持 YYYY-MM-DD）
node "$env:USERPROFILE\.dsh\skills\tool-call-hygiene\audit.mjs" 2026-11-06
```
排查「agent 调用失败」用 `audit.mjs`，覆盖面比 `scan.mjs` 全。`morning-report.mjs` 缺省按**滚动 24 小时**生成（避免凌晨跑时当天尚无会话、报表显示「0 失败」），显式传日期则按自然日复盘。

## 4. 为什么重要

一次失败不是“一步”，是“一步失败 + 一步重试 + 一步说明”，历史里全部重发。2026-11-02 实测 78 次工具错误中 62 次属于本表可一次避免的类型（FS_NOT_OBSERVED 33、FS_EDIT_NOT_FOUND 17、FS_NOT_FOUND 5…）。**这些是纯浪费的未命中。**
2026-11-09 复核：22 次工具失败里 13 次来自同一个跨天长期会话（`cursor/composer-2.5`），其中 8 次是空参数退化；另 7 次是 `session_search` 120s 超时。**长会话退化与工具级超时，比参数形状更值得先处理。**
