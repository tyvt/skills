# CompanyBasicInfoForm 子组件直改prop触发Vue警告
`CompanyBasicInfoForm` 对接收的 `:form="form"` prop 直接 `v-model` 绑定改写，触发 Vue 单向数据流警告。

## 问题根因
- `CompanyBasicInfoForm` 通过 `:form="form"` 接收 prop
- 对 prop 直接进行 `v-model` 绑定改写，违反 Vue 单向数据流
- 触发 Vue 单向数据流警告

## 修复方案
- 子组件增设 `localForm`
- 通过 `watch` 与父组件 `form` 保持同一对象引用
- 编辑绑定改绑 `localForm`，不再直改 prop

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：产品2.0/054.md
- 涉及文件：company/companyManagement/components/CompanyBasicInfoForm.vue；toB/companyRecord/detail.vue；company/companyManagement/components/CompanyBasicInfoDetail.vue；zs-form/zs-form.vue；company/companyManagement/change/detail.vue；company/companyManagement/companyBasicInfo/detail.vue
- 所属项目：产品2.0；来源会话ID：f4820caa-7dba-4a66-83ef-64ac5b12adb3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_defect",
  "name": "child_vmodel_prop_warning",
  "source_extraction_id": "e09c5981c68446689aef84245a719298",
  "version": 1,
  "memory_type": "entities"
}
-->