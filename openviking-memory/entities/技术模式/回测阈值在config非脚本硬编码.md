# 回测阈值在config非脚本硬编码
投资推送项目的回测买卖门控阈值不在 backtest 脚本中硬编码，统一由 config.py（经 push.env 加载）管理。
## 阈值来源与卖出侧
- 默认值与环境变量在 `config.py`（经 `push.env` 加载），各指数 `*_signal.py` 与 `dividend_data.py` 按行评估
- 卖出侧组合 `sell_trailing.py`（移动止盈/估值）、`rotation_sell.py`（轮动门控）及组合层 `backtest_rotation.py`
## 行级常用门控
- `year_range_position`、`ma_slope_pct`、`pe_percentile`
- `spread`/`spread_percentile`、`recent_signal_buy_avg`/`peak_since_last_buy` 等
## 调参与归属
- 单参扫描见 `backtest_optimize.py`，未纳入优化的项仍需直接改 push.env
- 验证证据：会话 e5c67d81 总览说明回测买卖信号不在 backtest_*.py 硬编码阈值
- 涉及文件：config.py、push.env、backtest_buy_signals.py、backtest_trade_signals.py、sell_trailing.py、rotation_sell.py、backtest_optimize.py、cn_broad_signal.py
- 所属项目：投资推送；来源会话ID：e5c67d81-0582-416c-beaf-bfc275c07e8e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "回测阈值在config非脚本硬编码",
  "source_extraction_id": "60aec92e8bf545f9ac18a49ecfef75c7",
  "version": 1,
  "memory_type": "entities"
}
-->