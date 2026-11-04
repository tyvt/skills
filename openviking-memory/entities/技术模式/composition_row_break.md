# composition-row 将证书编号断成两行
`addHouse.vue` 对产权证书编号使用垂直布局 `composition-row` (`flex-direction: column`)，将文本分成两行。

## 问题根因
- `addHouse.vue` 将 `composition-row` (column) 应用于房产证书编号
- 文本被不当地断成两行

## 修正
- 改为单行布局 `flex items-center`
- 与 `stockHouseSign/apply.vue` 保持一致

## 文件与验证
- `src/pages_owner/house/owner/addHouse.vue`, `src/pages_transaction/publishHouse/verification.vue`, `src/pages_transaction/stockHouseSign/apply.vue`
- 所属项目: 苏住房C (zhi2-mobile-shimin); 会话: 54f4fa88-f084-46ed-a03b-0f245a7026be

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "composition_row_break",
  "source_extraction_id": "5a1866481797438eaa3b151fc58e6948",
  "version": 1,
  "memory_type": "entities"
}
-->