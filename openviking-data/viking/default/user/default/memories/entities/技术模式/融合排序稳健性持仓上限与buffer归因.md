# 融合排序稳健性持仓上限与buffer归因
投资推送项目中股息+低波融合策略的持仓上限显式化、buffer 归因与生产配置规则。

## 持仓与归因规则
- 股息+低波融合策略应将 fusion_candidate_n（如 100）与 top_n（如 10）拆分，并在代码中显式 max_holding = top_n + NDrop（如 13），避免候选池逻辑隐式膨胀持仓
- Layer2 收益归因须按逐日实际权重计算 core/buffer 贡献，不能用调仓日静态权重，否则缓冲仓收益被低估
- 若 buffer_contribution 长期 >30%，说明 Alpha 仍依赖缓冲，应回炉

## 生产配置
- 综合验收矩阵（如 7 项中 ≥5 项）未通过前，融合配置保持 experimental，生产默认 fusion_mode: false

## 验证与归属
- 稳健性会话 1/7 通过未升级；原策略 buffer 贡献约 100%、候选枯竭频率 100%；用户确认 max_holding=13、逐日动态权重
- 涉及文件：output/robustness/robustness_report.md ; output/ablation/metrics_fusion_optimal.json
- 所属项目：投资推送；来源会话ID：rollout-2026-08-27T10-00-16-01a040f2-4dca-7810-b246-594ac1915afc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "融合排序稳健性持仓上限与buffer归因",
  "source_extraction_id": "0f69dcb281324049b1d45550b4ab9d73",
  "version": 1,
  "memory_type": "entities"
}
-->