# 美股月度ForwardPE沿用上月末约定
美股月度 Forward PE 在回测与实盘须沿用上月末已发布值，避免当月未来数据造成的未来函数嫌疑。

## 数据规则
- historyofmarket.com 等来源 Forward PE 为月度序列，当月完整值通常月底或下月初更新
- 月中跑回测或生成交易记录时，默认沿用上一月末已发布的 Forward PE，不使用当月点位

## 文档说明
- README/回测说明须写清该规则，避免如 8 月 4 日仍使用 8 月整月估值的误解

## 验证与归属
- 验证证据：会话 efd15316 质疑 2026-08-04 回测含 1–8 月记录与月度 Forward PE 发布时间矛盾
- 涉及文件：d:/repository/投资推送/README.md、us_index_data.py
- 所属项目：投资推送；来源会话ID：efd15316-7993-488b-8278-c5e62b92d106

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "美股月度ForwardPE沿用上月末约定",
  "source_extraction_id": "6da7ab43faef40139b0886c99211eca3",
  "version": 1,
  "memory_type": "entities"
}
-->