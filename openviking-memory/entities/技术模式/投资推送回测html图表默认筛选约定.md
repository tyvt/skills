# 投资推送回测HTML图表默认筛选约定
backtest_html.py 生成的交互图表须使用固定的默认横轴粒度与日期区间，重置操作须恢复该默认而非全回测区间。

## 默认图表设置
- 默认横轴粒度设为「日」（非「月」）
- 默认日期范围为当年 1 月 1 日至今天；若行情未更新到今天，结束日取最后有数据的交易日
- 「重置」须恢复上述默认，而不是回到整个回测区间的起止日

## 生效方式
- 修改 backtest_html.py 后须重新跑回测生成 HTML 才生效（如 run_backtest_inception.bat）
- 验证证据：会话 194c1fa9 最终结论（横轴默认日、日期默认当年1/1到当天、重置不再回到全区间）
- 涉及文件：backtest_html.py、run_backtest_inception.bat
- 所属项目：投资推送；来源会话ID：194c1fa9-e4a4-4b24-a1b6-32a7114a60a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "投资推送回测HTML图表默认筛选约定",
  "source_extraction_id": "689d404357eb4c9b968517a38c9f59f4",
  "version": 1,
  "memory_type": "entities"
}
-->