# drop_to_buy盘中推演信号在signal层
投资推送中 drop_to_buy.py 仅为盘中推演工具，真实买卖信号在 *_signal.py 与 dividend_data。

## drop_to_buy 定位
- `drop_to_buy.py` 基于昨日估值面板模拟「再跌/再涨多少会触发买/卖」，供报告展示触发价
- 不是策略的权威买卖信号实现

## 真实信号层
- 真实买入（及各模块卖出）逻辑在 `dividend_data.is_buy_signal()`、`cn_broad_signal`、`cyb_signal`、`us_index_signal`、`hstech_signal` 等
- 阈值集中在 `config.py`

## 排查指引
- 改阈值、对齐回测与 report、或排查「为何某天没买」应读信号层与 config，勿从 drop_to_buy 反推规则

## 验证与归属
- 验证证据：会话 ee16df79 全面梳理结论首段明确 drop_to_buy 为盘中推演工具，信号在各 *_signal.py
- 涉及文件：drop_to_buy.py、config.py、dividend_data.py、cn_broad_signal.py、report.py
- 所属项目：投资推送；来源会话ID：ee16df79-05f8-4f05-8b64-e1a62d72f32e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "drop_to_buy盘中推演信号在signal层",
  "source_extraction_id": "60841822c49f4807b9640edac955d078",
  "version": 1,
  "memory_type": "entities"
}
-->