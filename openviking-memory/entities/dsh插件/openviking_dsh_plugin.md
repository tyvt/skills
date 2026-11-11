# @openviking/dsh-memory-plugin
OpenViking 官方 DSH 插件，实时镜像 DSH 会话到 OpenViking（http://127.0.0.1:1933 直连）。

## 基本信息
- 版本 0.5.31（官方插件，非社区版 @yadsh）；会话 URI 为 viking://user/default/sessions/dsh-session-<id>
- 与 import-to-ov.mjs 批量导入是两条独立链路（实时镜像 vs 历史迁移）
- 2026-11-02 确认已将当前会话写入 OpenViking

## 行为与召回
- 实时镜像 DSH 消息（pending tokens 累积），由 VLM（hy3）从镜像抽取记忆
- commit 触发：turn/end 时 pending_tokens >= commitTokenThreshold（默认 20000）才抽取，非实时
- autoRecall（别名 syncTurns）默认开：每步前自动 find 召回，默认 recallLimit=10、scoreThreshold=0.35、recallTokenBudget=2000
- 2026-11-05 实测：业务会话每轮注入 <openviking-context> 约 2-3 次；简单改 bug 会话 Agent 主动 MCP=0 属合理

## 2026-11-09 审计
- recallDedupTurns:8 未抑制重复：5,128 次注入仅对应 1,923 唯一 URI，重复率 62.5%，同会话内重复 817 次
- 目录节点被当记忆注入：bug_fix、技术模式 等 5 个高频 URI 经证实是目录非记忆文件
- scoreThreshold=0.40 未过滤任何条目（98.3% 分数挤在 0.7–0.9，min 0.50）
- 召回按用户 turn 触发非每步，间隔 2–119 步（均值约 40）；启动 profile 索引平均 15,285 字符 / 400 文件名
- 覆盖率 83%（272 会话中 225 含注入）；仅 18% 显式调 OV 工具、16% 做检索/展开；检索 Top1 严格相关 50%、噪声 31.7%，精确 bugID 检索返回全错号

## 已知问题与实测
- 并发 commit 静默丢数据：手动与自动同时提交同会话时后队挂起、extracted 返回空 {} 不报错；2026-11-02 确认「记忆丢失」同根因，全量导入须串行
- 长会话不触发 commit：阈值 20000 仅 turn/end 判定，pending_tokens 累积（实测达 59706）不提交；2026-11-05 观测多会话 pending_tokens 高（如 19009）且 memories_extracted=0，因队列堆积写回滞后
- 重启后全局 commitTokenThreshold 改为 8000（原 20000），recallPeerScope: actor 生效；短模拟（2 条无工具结果）commit 42s 完成但 memories_extracted.total=0，长模拟（24 条≈8500 字）session_commit 卡死约 20 分钟需 ov-cancel-stuck-commit-tasks 取消
- 产品2.0 仓库根 D:\repository\产品2.0 开会话 peer 推导为 gitlab.zhi.com-zhi-unlimited-unlimited-product-fe-zhi2-web-admin-h5-g-unlimited（来自 git origin），与旧 cursor 导入 wuxi-huishan-product 非同一 peer

<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "openviking_dsh_plugin",
  "source_extraction_id": "4a65ec5568c14ed4a10f48ae0ac23686",
  "version": 11,
  "memory_type": "entities"
}
-->