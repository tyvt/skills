# 物业费申报明细新增金额列（苏住房G）
苏住房G 项目物业费申报（feeDeclare2）的「申报明细」表格新增应收与实收总金额两列。

## 改动说明
- 在「费用类型」与「欠费金额」之间新增两列
- 应收总金额对应字段 receivableAmount
- 实收总金额对应字段 actualAmount，兼容 actualReceivedAmount
- 金额统一保留两位小数显示，与接口返回一致

## 涉及文件
- zhi2-web-admin/src/views/property/feeDeclare2/components/feeBindScopeTable.vue

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 来源会话ID：0b14d4c6-c1c2-4647-ac18-89f6e6cde8ca

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_bind_amount",
  "source_extraction_id": "3ed1418d03ae4a378ef623cde6769cc3",
  "version": 1,
  "memory_type": "entities"
}
-->