# EducationTable用computed做v-model致行未定义
EducationTable 使用 computed 做 v-model，新增时父组件 emit 与 zs-table 重算高度时序错位，row 为 undefined 访问 row.trainYear 报错。

## 问题根因
- EducationTable 使用 computed 做 v-model
- 新增时父组件 emit 与 zs-table 重算高度时序错位，导致 row 为 undefined 访问 row.trainYear 报错

## 解决方案
- 对齐 ServiceSchemePanel 模式，改用 data.innerList 与 watch value 同步
- 就地 push/splice 后 emit
- 配置 :table-tr='innerList.length || 1' 与列 v-if='row' 防御

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/077.md
- 涉及文件：EducationTable.vue、AgencyPersonnelDetail.vue、CertificateList.vue、zs-table.vue、ServiceSchemePanel.vue、zs-table-column.vue
- 所属项目：苏州市房地产监测V3；来源会话：3893ccfd-88f3-46aa-bc62-e0f4d3d00ac6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "education_table_fix",
  "source_extraction_id": "11ed185d9cf7459c968ca8c5f71e999c",
  "version": 1,
  "memory_type": "entities"
}
-->