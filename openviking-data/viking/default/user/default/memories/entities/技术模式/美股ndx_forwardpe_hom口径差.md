# NDX Forward PE HOM与Barron口径差
纳斯达克100 Forward PE 若以 historyofmarket.com 为主源，较 Barron's 约低 13%，属口径差而非抓数错误。

## 数据事实
- NDX Forward PE 用 HOM（Birinyi operating earnings）作主源时，相比 Barron's（Bloomberg 一致预期）约低 13%
- 差异来自盈利口径不同：Birinyi 经营利润 vs Bloomberg 一致预期，属口径差而非单纯数据错误

## 策略约定
- 策略以分位为主时，序列自洽比绝对值更重要，不必为 NDX 换主源
- 提高 NDX 买点精度可略保守阈值；除非整套分位历史改口径，否则沿用 HOM 主源

## 验证与归属
- 验证证据：数据源可靠性表「NDX Forward PE … Barron's 比 HOM 高约 13%」
- 涉及文件：us_index_data.py、validate_data_baostock.py
- 所属项目：投资推送；来源会话ID：74fc77f0-d079-4fee-a553-9d9b95532e22

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "美股NDX_ForwardPE_HOM口径差",
  "source_extraction_id": "ad9ff0a364804616b6cd633d052865d8",
  "version": 1,
  "memory_type": "entities"
}
-->