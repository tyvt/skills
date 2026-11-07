# AlphaPurify 分层收益与 IC 方向一致性约定
AlphaPurify 因子诊断中，分层收益必须与 IC 共用方向翻转后的因子，否则会出现方向不一致。

## 问题
- 若 compute_quantile_returns 使用原始 factor_values 而 IC 使用 _apply_direction 后的值，会出现 IC 为正但多空收益为负等方向不一致

## 修复约束
- 在 diagnose_factor 中对比 IC 与分层所用因子值范围排查（两范围差异大于 1e-6 说明分层误用原始值）
- 调用链 runner → metrics 必须传递 factor_values_oriented
- _apply_direction 加断言防止重复翻转
- 修复后需用 volatility_60d 等因子验证 IC 与多空同向

## 验证与归属
- 修复后 volatility_60d IC 0.06987、多空 +4.043%、PASS
- 涉及文件：alphapurify_bridge/diagnostics/runner.py、metrics.py、config/alphapurify/diagnosis_config.yaml
- 所属项目：投资推送；来源会话ID：rollout-2026-08-26T11-27-41-01a03c1b-fa83-7e81-9a3f-b8e94fdefaeb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "AlphaPurify分层收益与IC方向一致性约定",
  "source_extraction_id": "e07fdff587e743c5a851f45f35658558",
  "version": 1,
  "memory_type": "entities"
}
-->