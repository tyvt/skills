# @openviking/dsh-memory-plugin
OpenViking 官方 DSH 插件，负责将 DSH 会话实时镜像到 OpenViking 服务。

## 基本信息
- 版本 0.5.31（官方插件，非社区版 @yadsh）
- 默认端点 http://127.0.0.1:1933，无需额外配置即可直连
- 会话 URI 格式为 viking://user/default/sessions/dsh-session-<id>

## 行为
- 实时镜像 DSH 会话消息到 OpenViking（pending tokens 累积）
- commit 触发机制：turn/end 时若 pending_tokens >= commitTokenThreshold（默认 20000）才触发抽取，非实时
- 由 VLM（hy3）从镜像会话中抽取记忆
- 2026-11-02 确认已成功将当前会话写入 OpenViking
- autoRecall（别名 syncTurns）默认开启：每步前自动 find 召回相关记忆注入，默认 recallLimit=10、scoreThreshold=0.35、recallTokenBudget=2000

## 已知问题
- 并发 commit 静默丢数据：手动 commit 与插件自动 commit 同时提交同一会话时，后队任务被挂起、extracted 返回空 {} 且不报错；此为 2026-11-02 确认的前次"记忆丢失"同一根因，全量导入须串行
- 长会话不触发 commit：commitTokenThreshold 默认 20000 仅在 turn/end 判定，长会话中 pending_tokens 会持续累积（实测达 59706）而不提交

<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "openviking_dsh_plugin",
  "source_extraction_id": "a04cc8aa7d93412f9c86d475855cc7a0",
  "version": 4,
  "memory_type": "entities"
}
-->