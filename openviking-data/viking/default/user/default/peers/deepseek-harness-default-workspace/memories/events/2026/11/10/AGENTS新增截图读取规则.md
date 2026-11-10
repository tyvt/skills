# Summary
2026-11-10，用户建议、助手在 AGENTS.md Token 条6新增规则：截图放上下文尾部、一次一张，避免 attachment 打穿 prefix cache。已随本地提交 e2414c3b 落地。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: ...AGENTS.md 或 skill 加：截图最后读；一次一张（省 30k+ cache 重建）。

DBX.md 把 seq 338 的错误做成反例：dbx_execute_query 无论有无 session 都必带 connection_name，附错误信息原文。...
...
**assistant [peer=deepseek-harness-default-workspace]**: 应用补丁。先改 AGENTS.md（两条收尾条 + 截图规则 + version.json 归属）：
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
  "event_name": "AGENTS新增截图读取规则",
  "goal": "记录规则新增",
  "summary": "2026-11-10，用户建议、助手在 AGENTS.md Token 条6新增规则：截图放上下文尾部、一次一张，避免 attachment 打穿 prefix cache。已随本地提交 e2414c3b 落地。",
  "ranges": "15,39,54-59",
  "source_extraction_id": "c90ece93bbe24ec7a37656fc59cb0ff1",
  "version": 1,
  "memory_type": "events"
}
-->