# 费用详情金额零值修复
苏住房G项目修复费用申报详情累计应收/实收/欠缴金额误显 ¥0.00 问题。

## 字段对应
- 累计应收金额 totalReceivableAmount
- 累计实收金额 totalActualReceivedAmount
- 累计欠缴金额 totalArrearsAmount

## 问题根因
- queryOweFeeStatistic 未返回三字段时，代码用 oweFeeTypeDetail 汇总值（常0）覆盖表单

## 修复方式
- 赋值时增加回退链：data.totalReceivableAmount ?? this.form.totalReceivableAmount ?? receivableSum ?? 0
- 在 feeDeclare2/detail.vue 第415-423行实施

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话：d2629f80-2e2a-4b5f-927b-4c00906ffa4d
- 涉及 feeDeclare2/detail.vue 等

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_amount_zero_fix",
  "source_extraction_id": "6dfa41e409fd42828fcd0b8d43f5a968",
  "version": 1,
  "memory_type": "entities"
}
-->