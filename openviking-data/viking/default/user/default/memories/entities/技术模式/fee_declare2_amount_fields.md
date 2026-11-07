# 费用申报金额字段对齐（苏住房G）
苏住房G 项目物业费用申报（feeDeclare2）金额字段已按后端字段名对齐。

## 字段映射
- 累计应收金额 → receivableAmount
- 累计实收金额 → actualReceivedAmount
- 累计欠缴金额 → arrearsAmount

## 接口逻辑
- queryOweFeeStatistic 接口优先读取上述顶层字段
- 若未返回，则按 oweFeeTypeDetail 中各费用类型的金额汇总作为兜底

## 涉及文件
- views/property/feeDeclare2/detail.vue
- views/property/feeDeclare2/index.vue
- views/property/feeDeclare2/components/feeBindScopeTable.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_declare2_amount_fields",
  "source_extraction_id": "85aebb1930c949e9b8df248d137025f2",
  "version": 1,
  "memory_type": "entities"
}
-->