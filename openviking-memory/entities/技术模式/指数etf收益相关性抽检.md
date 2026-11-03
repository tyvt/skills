# 指数ETF收益相关性抽检
部分指数在 baostock 无直接 K 线，可用跟踪 ETF 日收益与指数序列做相关性抽检作为价格可靠性辅助证据。

## 适用对象
- 中证红利低波（H30269）、科创50（000688）等指数在 baostock 无直接指数 K 线
- 价格主源仍缺第三方全量直验

## 抽检方法
- 用跟踪 ETF（如 512890 / 560150）日收益与指数序列做相关性抽检，会话中约 0.98
- 相关性抽检仅作辅助证据，不能替代指数收盘价主源

## 验证与归属
- 验证证据：「H30269 收盘价 — 可用跟踪 ETF 日收益做相关性抽检」「560150 日收益相关约 0.98」
- 涉及文件：dividend_data.py、cn_broad_data.py、validate_data_baostock.py
- 所属项目：投资推送；来源会话ID：74fc77f0-d079-4fee-a553-9d9b95532e22

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "指数ETF收益相关性抽检",
  "source_extraction_id": "ad9ff0a364804616b6cd633d052865d8",
  "version": 1,
  "memory_type": "entities"
}
-->