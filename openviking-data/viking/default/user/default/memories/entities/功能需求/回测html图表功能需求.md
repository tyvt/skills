# 回测html图表功能需求
HTML 回测折线图需支持起止日期筛选、横轴粒度切换与全量指数下拉排序。
## 功能要求
- 支持起止日期时间范围筛选
- 横轴粒度支持年/月/日，默认月
- 指数下拉须从 index_meta/回测汇总对齐全部指数 key，解决此前仅能选创业板指的问题
- 下拉排序按收益率从高到低
- 买入次数列后补充买入金额
- 全量区间默认 2015 至今
## 验证与归属
- 验证证据：用户反馈「指数无法下拉筛选，只有一个创业板指数」「HTML 下拉按照收益率从高到底排名」「横轴默认是月」
- 涉及文件：backtest_html.py、backtest_trade_signals.py、index_meta.py、output/backtest/2015-01-01_present.html
- 所属项目：投资推送；来源会话ID：4cf2331f-e187-4795-852d-e81ba087c405, e4a2efa5-c52d-4fed-b8d8-41863346d9db

<!-- MEMORY_FIELDS
{
  "category": "功能需求",
  "name": "回测html图表功能需求",
  "source_extraction_id": "e670f41e53f9457882b2af48aade4a85",
  "version": 1,
  "memory_type": "entities"
}
-->