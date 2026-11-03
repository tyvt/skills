# zs-table-column 开关列未设固定宽致过宽
`zs-table-column` 内带 `el-switch` 的自定义插槽未声明固定宽类型时参与剩余宽度均分，导致列过宽。

## 问题根因
- `zs-table-column` 内带 `el-switch` 的自定义插槽未声明 `type="custom"` 等固定宽类型
- 此时走 `isStretchableColumn` 参与剩余宽度均分，导致该列过宽

## 修复方案
- 在 `src/views/company/companyAdmin/index.vue` 的该列增加 `prop`、`type="custom"` 和 `slot-width="96"`
- 使其走 `isFixedWidthCustomSlot` 不再参与均分

## 验证与归属
- 验证证据：extracted source=cursor session=bce0552e-fc38-4036-88e0-ec1363c7866d
- 涉及文件：src/views/company/companyAdmin/index.vue、src/components/zs-table-column/zs-table-column.vue、src/views/benefit/pubBusinessItem/components/businessItemTable.vue、src/views/company/companyScheme/index.vue、src/views/company/companyManagement/components/ShareholderPlainTable.vue
- 所属项目：苏州市房地产监测V3 zhi2-web-admin；来源会话ID：bce0552e-fc38-4036-88e0-ec1363c7866d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_column_switch_width",
  "source_extraction_id": "a62e595feba04ff1a28335d435f6b094",
  "version": 1,
  "memory_type": "entities"
}
-->