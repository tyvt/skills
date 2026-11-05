# 物业费简易申报详情数值列对齐修复（苏住房G）
苏住房G 项目修复物业费简易申报详情页「申报明细」表格数值列表头与数据错位问题。

## 问题原因
- 数值列内容设 `align="right"` 右对齐，但表头默认左对齐，导致表头与数据错位
- 「房屋面积」还误设为 `align="center"`

## 修复内容
- 在 feeBindScopeTable.vue 对「房屋面积(㎡)」「账单总金额」「优惠总金额」「实收总金额」「欠费金额」统一设置 `align="right"` 和 `header-align="right"`
- 将 `formatter` 改为字符串形式 `formatter="amountFormatter"`，与 `zs-table-column` 组件金额列识别逻辑一致

## 涉及文件
- zhi2-web-admin/src/views/property/feeDeclare2/detail.vue
- zhi2-web-admin/src/views/property/feeDeclare2/components/feeBindScopeTable.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：281b0088-9113-401e-94ff-3f22a5107bbe；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_align_fix",
  "source_extraction_id": "abdb91ea921d455b818bda502a994c7b",
  "version": 1,
  "memory_type": "entities"
}
-->