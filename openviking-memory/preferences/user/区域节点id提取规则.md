- `src/staff/pages/complex-select/index.vue` 中 `getDeptNodeId` 依次尝试 `id`→`deptId`→`value`→`code`→`deptCode`。
- 避免区域节点因缺 `id` 被 `toPickerItems` 过滤致筛选不显示。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "区域节点ID提取规则",
  "source_extraction_id": "4c3a967cfa754abaaf0971d44b2c61e6",
  "version": 1,
  "memory_type": "preferences"
}
-->