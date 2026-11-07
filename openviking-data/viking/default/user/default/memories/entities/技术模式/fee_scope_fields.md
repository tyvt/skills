# 费用绑定范围表字段对接（苏住房G）
苏住房G 项目 zhi2-web-admin 更新 feeBindScopeTable.vue，对接 `/property/feeDeclare2/feeDeclare2House/page` 新增的三个出参。

## 字段变更
- `houseNum`（房屋编号）：列 `prop` 由 `houseCode` 改为 `houseNum`，并兼容旧字段
- `billAmountSum`（账单总金额）：列 `prop` 改为 `billAmountSum`，formatter 优先取新字段
- `discountAmountSum`（优惠总金额）：列 `prop` 改为 `discountAmountSum`，formatter 优先取新字段
- 金额列仍保留两位小数格式化；接口返回旧字段名（`houseCode`、`billAmount`、`discountAmount`）时正常显示

## 涉及文件与归属
- 涉及文件：src/views/property/feeDeclare2/components/feeBindScopeTable.vue、src/views/property/feeDeclare2/detail.vue
- 所属项目：苏住房G（zhi2-web-admin）
- 来源会话ID：ed4ce953-f646-4a39-beea-7036aef13b3c

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_scope_fields",
  "source_extraction_id": "a384d5a4404b42f0bbdba932aae859ab",
  "version": 1,
  "memory_type": "entities"
}
-->
