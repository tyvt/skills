# report与回测共用config阈值与买入金额链路
report.py 不维护独立阈值，而是直接读取 config 中的买入条件与金额分档配置，保证报告与回测对齐同一配置。

## 配置链路
- `evaluate_signal()` 读取 config.py 买入条件
- `enrich_signal_buy_amount()` 调用 `get_buy_amount_base()` 与 `BUY_AMOUNT_TIER_SCHEME` 分档
- 修改 `ANNUAL_INVESTMENT_BUDGET` 或 `push.env` 后报告与回测应对齐同一配置

## 行为说明
- 报告一般不单独展示「年度总投入」文案，但金额已按预算缩放
- 验证：用户确认 NDX/SPX 阈值与金额与 config 对照表一致

## 涉及文件
- report.py、config.py、buy_amount_tiers.py
- 所属项目：投资推送

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "report与回测共用config阈值与买入金额链路",
  "source_extraction_id": "460130c5532a4227b457a5f0b2ac232f",
  "version": 1,
  "memory_type": "entities"
}
-->