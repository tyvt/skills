# github.com-tyvt-skills
- 维护基于 LangGraph+Magpie 的多模型编排器，当前主控模型池现役 workbuddy/deepseek-v4.1-flash (as of 2026-11-13)
- 拥有评测资产：T1–T7 执行层题目、planner 归因样本 #1–#15、route_miss 日志 (as of 2026-11-13)
- 网关可用模型含 codex 全系、workbuddy 全系等共 27 个，用于主控快筛与全量测试 (as of 2026-11-13)
- 已实现 agent-guard 拦截体系（探索漂移三规则 warn 灰度 commit 5ff47355；坏账四修复含报错可复制与前台长任务告警 warn 灰度 commit ce99ed19）与 dsh-explore 探索外包 skill (as of 2026-11-13)

<!-- MEMORY_FIELDS
{
  "source_extraction_id": "a94e055443a94543b7aee1591b418711",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "profile"
}
-->