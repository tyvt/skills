# @openviking/dsh-memory-plugin
OpenViking 官方 DSH 插件，负责将 DSH 会话实时镜像到 OpenViking 服务。

## 基本信息
- 版本 0.5.31（官方插件，非社区版 @yadsh）
- 与 import-to-ov.mjs 批量导入脚本是两条独立链路（实时镜像 vs 历史批量迁移）
- 默认端点 http://127.0.0.1:1933，无需额外配置即可直连
- 会话 URI 格式为 viking://user/default/sessions/dsh-session-<id>

## 行为
- 实时镜像 DSH 会话消息到 OpenViking（pending tokens 累积）
- commit 触发机制：turn/end 时若 pending_tokens >= commitTokenThreshold（默认 20000）才触发抽取，非实时
- 由 VLM（hy3）从镜像会话中抽取记忆
- 2026-11-02 确认已成功将当前会话写入 OpenViking
- autoRecall（别名 syncTurns）默认开启：每步前自动 find 召回相关记忆注入，默认 recallLimit=10、scoreThreshold=0.35、recallTokenBudget=2000
- 2026-11-05 实测：业务会话每轮注入 <openviking-context> 约 2-3 次/会话；简单改 bug 会话 Agent 主动 MCP=0 属合理用法（AGENTS 约定优先用注入而非重复检索）

## 已知问题
- 并发 commit 静默丢数据：手动 commit 与插件自动 commit 同时提交同一会话时，后队任务被挂起、extracted 返回空 {} 且不报错；此为 2026-11-02 确认的前次"记忆丢失"同一根因，全量导入须串行
- 长会话不触发 commit：commitTokenThreshold 默认 20000 仅在 turn/end 判定，长会话中 pending_tokens 会持续累积（实测达 59706）而不提交
- 2026-11-05 观测多个会话 pending_tokens 高（如 19009）且 memories_extracted=0，因 commit 阈值叠加 SessionCommit 队列堆积导致写回滞后

## 2026-11-05 实测补充
- 重启后全局配置 commitTokenThreshold 设为 8000（原为默认 20000），recallPeerScope: actor 生效
- 短模拟（2 条无工具结果）commit 42s 完成但 memories_extracted.total=0，抽取器判定不足成条记忆；长模拟（24 条≈8500 字）session_commit 卡死约 20 分钟，需 ov-cancel-stuck-commit-tasks 取消
- 产品2.0 仓库根目录 D:\repository\产品2.0 开会话时 peer 推导为 gitlab.zhi.com-zhi-unlimited-unlimited-product-fe-zhi2-web-admin-h5-g-unlimited（来自 git origin），与旧 cursor 导入用的 wuxi-huishan-product 非同一 peer

<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "openviking_dsh_plugin",
  "source_extraction_id": "891bee2f9b424974816fa6519c0a7d17",
  "version": 6,
  "memory_type": "entities"
}
-->