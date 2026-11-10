# Summary
2026-11-10，用户指出 DBX 执行侧两次翻车（seq31 工具名错、seq338 漏 connection_name），助手在 D:\repository\skills\zentao-analyzer\DBX.md 增加固定调用模板与两个反例，照抄模板可避免。已随本地提交 e2414c3b 落地。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: ...DBX.md 第 13 行写了“执行 SQL 的参数名是 sql”，但没写“工具名是 dbx_execute_query 不是 query”。

seq 338：dbx_execute_query 只传 session_id、漏 connection_name → CONNECTION_NOT_FOUND。这正是上一轮让补的第 7 行规则，文档在、agent 没用上。

→ 规则进文档 ≠ 进执行。建议把这两条做成 dbx-snippets.sql 里的固定调用模板，而不是靠读文档。

其他小问题
seq 103：grep type: 'amount' 在全 src/**/*....
...
**assistant [peer=deepseek-harness-default-workspace]**: AGENTS.md ✅。改 DBX.md，把两次翻车做成固定调用模板：
...
**assistant [peer=deepseek-harness-default-workspace]**: 本轮补丁已全部落地：

| 建议 | 落地 | 位置 |
|---|---|---|
| GIT_EDITOR=true 规则 | ✅ | [AGENTS.md](../../repository/skills/dsh/AGENTS.md) 收尾条 7，并附 `merge-base --is-ancestor` 禁止脑内推演 |
| 截图最后读、一次一张 | ✅ | AGENTS.md Token 条 6（明确 cache 打穿机制与「放上下文尾部」） |
| DBX 固定调用模板 + 两个反例 | ✅ | [DBX.md](../../repository/skills/zentao-analyzer/DBX.md)：`tool:"query"` 错名、漏 `connection_name` 反例照抄模板 |
| cost-meter 15k→10k | ✅ | 源码早已是 10k，但安装副本 `profiles\web\node_modules\dsh-cost-meter\lib\index.js` 仍是 15k——这就是提醒还报 >15k 的根因。已用源码覆盖，核验为 `?? 10_000`。**本会话及运行中的 Web 不生效，重启 web 后新会话生效** |
| version.json 归属 | ✅ | AGENTS.md 收尾条 8：build 产物禁止提交，脏了 `git checkout --` 还原 |

提交：按你的选择仅本地提交 `e2414c3b`（只含 AGENTS.md、DBX.md 两个文件，未推送）。`selftest.mjs` 与 `tool-call-hygiene/SKILL.md` 的遗留改动仍留在工作区。...

<!-- MEMORY_FIELDS
{
  "event_name": "DBX文档补调用模板",
  "goal": "记录模板新增",
  "summary": "2026-11-10，用户指出 DBX 执行侧两次翻车（seq31 工具名错、seq338 漏 connection_name），助手在 D:\\repository\\skills\\zentao-analyzer\\DBX.md 增加固定调用模板与两个反例，照抄模板可避免。已随本地提交 e2414c3b 落地。",
  "ranges": "9-10,42,54-59",
  "source_extraction_id": "c90ece93bbe24ec7a37656fc59cb0ff1",
  "version": 1,
  "memory_type": "events"
}
-->