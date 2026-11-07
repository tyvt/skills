# contentInfo 补充备注字段
`contentInfo` 在查看模式通过 `DetailTemplate` 渲染时此前未包含备注字段，编辑模式已有 `remark` 输入。
## 问题根因
- 编辑模式表单已有 `remark` 输入，但查看模式渲染 `contentInfo` 时未包含该字段，详情不显示备注。
## 解决方案
- 在 `contentInfo` 配置新增备注字段，与 `facilityDialog.vue` 保持一致：`{ label: '备注', value: this.form.remark, layout: {...}, type: 'textarea' }` 并过滤 visible。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：propertyContractFeeStandardDialog.vue、facilityDialog.vue、propertyChargeStandardDialog.vue
- 所属项目：产品2.0；来源会话：36d9b40d-3d14-49fe-953c-f9ad9284a5ee；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contentinfo_remark_field",
  "source_extraction_id": "2d4686a934d3454e8470a4b3531e3d9b",
  "version": 1,
  "memory_type": "entities"
}
-->