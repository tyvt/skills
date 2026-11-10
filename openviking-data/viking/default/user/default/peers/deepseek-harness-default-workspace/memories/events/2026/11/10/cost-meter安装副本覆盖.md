# Summary
2026-11-10，用户要求落地 cost-meter 15k→10k，助手发现源码已是10k但安装副本 profiles\web\node_modules\dsh-cost-meter\lib\index.js 仍为15k，用源码覆盖后核验为 ?? 10_000；重启 web 后新会话生效，运行中不生效。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: ...cost-meter 15k→10k：这条拖了两轮了，落地它。

version.json 明确归属：要么加进 .gitignore，要么 AGENTS.md 写“build 产生的 version.json 不提交”。
...
**assistant [peer=deepseek-harness-default-workspace]**: cost-meter 源码已是 10k，但 `profiles\web\node_modules` 里的安装副本还是 15k（这正是提醒仍报 >15k 的原因）。用源码覆盖安装副本：
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
  "event_name": "cost-meter安装副本覆盖",
  "goal": "记录覆盖安装副本",
  "summary": "2026-11-10，用户要求落地 cost-meter 15k→10k，助手发现源码已是10k但安装副本 profiles\\web\\node_modules\\dsh-cost-meter\\lib\\index.js 仍为15k，用源码覆盖后核验为 ?? 10_000；重启 web 后新会话生效，运行中不生效。",
  "ranges": "16,44,54-59",
  "source_extraction_id": "c90ece93bbe24ec7a37656fc59cb0ff1",
  "version": 1,
  "memory_type": "events"
}
-->