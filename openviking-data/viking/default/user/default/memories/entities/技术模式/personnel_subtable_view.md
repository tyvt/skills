# 从业人员子表查看弹窗DetailTemplate改造
苏州市房地产监测V3 完成从业人员两个子表的查看弹窗改造，查看模式改用 `DetailTemplate` 展示，新增/编辑仍用 `zs-form`。

## AgencyPersonnelCertificateTable.vue
- 表格底部增加分页组件 `<zs-pagination :total="innerList.length" :show-pagination="false" />`
- 查看弹窗（`isViewMode`）用 `DetailTemplate` 展示证书类型、证书号、发证机关、发证日期、证书等级、状态

## CareerList.vue
- 表格底部增加分页统计栏
- 查看弹窗（`isViewMode`）用 `DetailTemplate` 展示经纪机构名称、人员类型、起止日期、变动原因、投诉情况、当前状态

## 验证与归属
- 涉及文件：AgencyPersonnelCertificateTable.vue、CareerList.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：8da8f490-e777-4451-8e6a-45c4e50cedd0
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_subtable_view",
  "source_extraction_id": "2fc661addc014e93b50dd3ca11d84086",
  "version": 1,
  "memory_type": "entities"
}
-->