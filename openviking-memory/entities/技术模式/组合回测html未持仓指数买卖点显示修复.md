# 组合回测HTML未持仓指数买卖点显示修复
`--portfolio` 组合模式下持仓金额为 0 的指数曾被跳过，导致 HTML 下拉看不到买卖点；修复后图表展示回退基准买入金额。

## 问题现象
- `collect_daily_tables` 在 `--portfolio` 模式跳过金额为 0 的指数（如中证500、沪深300、恒生科技）
- 导致 `inception_present.html` 下拉列表看不到这些指数，误以为没有卖点

## 修复方案
- 新增 `get_chart_buy_amount()`，组合未持仓指数在图表展示时回退到基准买入金额（如 28 元）
- 仅用于买卖点可视化，不改变组合回测统计与真实持仓逻辑

## 验证与归属
- 验证证据：用户反馈「中证1000在HTML里面没有看到卖点」；修复后下拉可见 000905/HSTECH/000300
- 涉及文件：backtest_trade_signals.py、config.py、output/backtest/inception_present.html
- 所属项目：投资推送；来源会话ID：2c9ec957-ab6d-4729-86cb-b327133a72dd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "组合回测HTML未持仓指数买卖点显示修复",
  "source_extraction_id": "a95a6826300142edaefcda1a68eea15e",
  "version": 1,
  "memory_type": "entities"
}
-->