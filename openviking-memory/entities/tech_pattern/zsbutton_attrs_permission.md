# zs-button attrs 透传 permission 触发 Vue 警告
certificatesTable.vue 的 operationButtons 在 attrs 中定义 permission:false，经 v-bind="button.attrs" 透传触发 Vue warn。

## 问题现象
- certificatesTable.vue 的 operationButtons 在 attrs 中定义 permission:false
- 经 v-bind="button.attrs" 透传触发 Vue warn 告警

## 解决方案
- 将 permission 显式声明为 prop 或从 attrs 移除可消除告警

## 验证与来源
- 验证证据：src=产品2.0/069.md
- 涉及文件：zhi2-web-admin/src/components/zs-button/zs-button.vue、staffManagement/components/certificatesTable.vue、credit/assessment/components/assessmentProjectTable.vue、staffManagement/components/index.vue、companyManagement/components/bankTable.vue、mixins/subTableMixins.js、src/main.js、src/utils/permission.js
- 所属项目：产品2.0；来源会话：238293ef-3bd5-4396-98d5-3034f011a25c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "zsbutton_attrs_permission",
  "source_extraction_id": "fa9fbf6cda8447e593386f0779b08270",
  "version": 1,
  "memory_type": "entities"
}
-->