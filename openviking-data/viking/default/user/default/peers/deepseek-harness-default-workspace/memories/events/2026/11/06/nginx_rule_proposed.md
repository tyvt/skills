# Summary
User instructed to add a global memory rule: frontend projects deployed with nginx must use the nginx UI panel, and existing nginx config must stay synced with the panel (2026-11-06). Assistant submitted the rule points to OpenViking long-term memory extraction for persistence.
# 2026-11-06 (Friday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 全局记忆里面加个规则，前端项目部署nginx要使用nginx UI面板。现有的nginx配置也要和面板保持同步
**assistant [peer=deepseek-harness-default-workspace]**: 明白了。这是一条要沉淀到全局记忆的偏好/规则，我用 `remember` 提交给 OpenViking 长期记忆抽取（简体中文）。
**assistant [peer=deepseek-harness-default-workspace]**: 已提交到 OpenViking 长期记忆抽取（后台运行，任务 `a321174b-c5fb-4bb1-a09f-396a3f308170`）。

沉淀的规则要点（全局偏好/规则）：
1. **前端项目用 nginx 部署必须走 nginx UI 面板**，站点配置在 `D:/nginx/conf/sites-enabled/*.conf`，由面板维护；不可以用 http-serve / live-server / `python -m http.server` 等替代。
2. **面板是配置的真实来源**：手改磁盘 conf 后要到面板执行 Reload，反之亦然，避免面板与磁盘漂移。
3. 出现端口/服务名冲突（如 `conflicting server name ... ignored`）时，优先在面板对应站点配置里调整，而非只临时手改。
4. 改端口等会影响本地访问 URL 的配置前，先和你确认哪个站点保留原端口。

抽取完成后这条会作为正式的长期记忆存在；本次会话已实际验证了第 1–4 点的落地（家园区 H5 改端口 8093、门户 保留 8092，并提醒你在面板 reload）。

需要的话我可以现在用 `search` 回查一下是否已落库，或者把这条规则同步进某个具体项目的 AGENTS 说明里。

<!-- MEMORY_FIELDS
{
  "event_name": "nginx_rule_proposed",
  "goal": "Record nginx rule",
  "summary": "User instructed to add a global memory rule: frontend projects deployed with nginx must use the nginx UI panel, and existing nginx config must stay synced with the panel (2026-11-06). Assistant submitted the rule points to OpenViking long-term memory extraction for persistence.",
  "ranges": "40-46",
  "source_extraction_id": "6008127eaf5f4adab68aa88b962df001",
  "version": 1,
  "memory_type": "events"
}
-->