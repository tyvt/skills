# spread_10y_percentile仅报告展示
估值面板行字段 `spread_10y_percentile`（近 10 年利差分位）在投资推送项目中只用于报告展示，不参与任何买卖信号门控。
## 字段用途
- 在 `core.py` 等处用于报告展示
- 不作为红利/宽基等模块的买入或卖出条件
## 易混点
- 勿与 `spread_percentile`（滚动分位，参与买卖）混用
- 混用会导致「报告里有指标但改阈值不影响信号」的误判
## 验证与归属
- 验证证据：会话 e5c67d81 行字段表标注 `spread_10y_percentile` 为「仅报告展示（core.py），不买不卖」
- 涉及文件：core.py、config.py、dividend_data.py、cn_broad_signal.py
- 所属项目：投资推送；来源会话ID：e5c67d81-0582-416c-beaf-bfc275c07e8e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "spread_10y_percentile仅报告展示",
  "source_extraction_id": "60aec92e8bf545f9ac18a49ecfef75c7",
  "version": 1,
  "memory_type": "entities"
}
-->