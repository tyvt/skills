# 上下文膨胀优化方案（turn3 会话）
2026-11-14 针对 turn3 删除/重构会话（74 步、52 万 token、仅 13 个有效改动）的 P0 膨胀问题交付的优化方案文档 .plan/cost-bloat-optimization-20261114.md，纯文档未改代码，已过 grok 审核。

## 审计背景（turn3 会话）
- turn3 从 step 1 跑到 step 74，模型上下文约 16 万→52 万 token，整会话累积 25.9M 输入（缓存读 25.81M，命中率 100%）
- 实际产出仅 13 个文件改动（3 删除 + 5 代码 + 4 文档），过程性膨胀源于整读/整写/回滚循环
- 五大 P0 项：上下文膨胀、为测试扩生产 API（inspectSize）、脱敏导致误编辑、plan_review 用 grok（审计误判为停用）、多次 ask 可合并

## 方案要点（A/B 两批）
- A 批·执行纪律（规则文本零代码风险）：A1 ≤40 行小文件禁整篇 write 逐段 edit；A2 脱敏行（token/===）改用 grep -n→read offset 局部读禁靠记忆补；A3 测试不得反向扩生产 API；A4 一次问清省 22 分钟级 ask 往返
- B 批·机制层（插件代码需另立计划送审）：B1 撤 inspectSize 生产导出（先查调用方仅测试引用才删）；B2 复用已有 M1 白名单刹车纳入整读样本；B3 保留 grok 首位不动模型池仅固化首轮只送变更段+证据

## 与审计差异及审核
- 未采纳审计 P0#3「移除 grok-4.7@256k」：核 config.yaml:159-162，grok 为 2026-11-13 controller-bench 路由满分 1.00、总分 0.90 最高之有意首选，非配置漂移；用户明示「grok 审核还是要的」
- grok plan_review 结果 PASS 74/100，0 P0，3 P1 建议（node --check 仅限 JS、B1 先查调用方/B2 白名单放行验收命令、A/B 批补计数口径与误伤阈值）已全部并入修订版
- 交付状态：文档 .plan/cost-bloat-optimization-20261114.md 定稿并 present 给用户；A 批规则文本待用户确认是否落地，B 批代码改动建议另起一轮单独送审

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "优化方案",
  "name": "cost_bloat_plan",
  "source_extraction_id": "fa36b34972ec448fb5300f4cb8516c14",
  "version": 1,
  "memory_type": "entities"
}
-->