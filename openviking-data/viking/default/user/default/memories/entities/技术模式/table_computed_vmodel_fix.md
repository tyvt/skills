# 在表格中将 computed 用作 v-model 导致未定义行错误
在项目 苏州市房地产监测V3 中，`EducationTable` 使用 computed 作为 v-model；在添加时，父组件的 emit 与 `zs-table` 的高度重算冲突，导致 `row` undefined 并报错。

## 问题根因
- `EducationTable` 使用 computed 作为 v-model
- 在添加时，父组件的 emit 与 `zs-table` 的高度重算冲突，导致 `row` undefined

## 解决方案
- 将 computed 替换为 `data.innerList` 并与 `value` 上的 `watch` 同步
- 使用 `push`/`splice` 进行添加/删除，然后 emit；绑定 `:table-tr="innerList.length || 1"`
- 在列模板中添加 `v-if="row"` 作为渲染防御

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：3893ccfd-88f3-46aa-bc62-e0f4d3d00ac6
- 验证证据: src=苏州市房地产监测V3/277.md
- 涉及文件: EducationTable.vue, AgencyPersonnelDetail.vue, CertificateList.vue, zs-table.vue, zs-table-column.vue, ServiceSchemePanel.vue
- 所属项目: 苏州市房地产监测V3; 会话: 3893ccfd-88f3-46aa-bc62-e0f4d3d00ac6; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_computed_vmodel_fix",
  "source_extraction_id": "5d98e1c12360479781ab28931522b2f2",
  "version": 1,
  "memory_type": "entities"
}
-->