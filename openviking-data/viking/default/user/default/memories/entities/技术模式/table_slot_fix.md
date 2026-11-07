# zs-table-column 插槽作用域错误渲染修复
苏州市房地产监测V3 中多个表格误用 { row } 导致 row 为 undefined 渲染报错，已改为 { scope } 并映射字段。

## 问题根因
- zs-table-column 自定义列插槽传入 { scope } 而非 { row }
- AgencyPersonnelCertificateTable.vue、CareerList.vue 写成 #default="{ row }" 导致 row.invalid 报错；PresaleHouseTable.vue 同样误用 { row } 导致 row.unitNo 为 undefined 报错整表无法显示

## 修复内容
- AgencyPersonnelCertificateTable.vue 状态列改 #default="{ scope }" 用 scope.row.invalid
- CareerList.vue 状态列改 scope.row.active
- AgencyPersonnelDetail.vue 加载详情映射 certificateCode→certificateNo、certificateName→certificateType
- PresaleHouseTable.vue 中 4 个自定义列插槽参数统一改为 { scope }，通过 scope.row 访问行数据
- 同目录 PresaleBuildingTable.vue 已使用正确写法 { scope } + scope.row
- PermitHistoryPanel.vue、PermitEntrustPanel.vue 中也存在相同 { row } 写法，可按同样方式改为 { scope }

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zs-table-column.vue、AgencyPersonnelCertificateTable.vue、CareerList.vue、AgencyPersonnelDetail.vue、PresaleHouseTable.vue、PresaleBuildingTable.vue、PermitHistoryPanel.vue、PermitEntrustPanel.vue
- 所属项目：苏州市房地产监测V3；来源会话：7d5eb0e5-f2e8-44f4-b898-9b22ccb064a5、050cc8e9-9258-449c-ade4-f02145919718

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_slot_fix",
  "source_extraction_id": "062bfd8103c04866b9a3c11ac95d1557",
  "version": 2,
  "memory_type": "entities"
}
-->