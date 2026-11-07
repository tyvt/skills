# 详情页新增误显变更角标因未限定isChange
详情页新增时因未限定 isChange 导致变更角标误显，已修复为仅 isChange 为 true 时提示。

## 问题描述
- detail.vue 中 getChangeTooltip 对比 beforeForm 与当前值，新增时 beforeForm 为空误判变更显角标

## 解决方案
- 修复为仅 `isChange === true` 时返回提示，普通新增、编辑不展示

## 验证与归属
- 验证证据：extracted source=cursor session=d56499b7-3a3e-49a0-958c-452f7f13c782
- 涉及文件：src/views/toB/companyRecord/detail.vue、src/views/company/companyManagement/components/detail.vue、src/directives/form/index.js、src/views/institution/record/index.vue、src/views/company/companyManagement/property/detail.vue、src/views/company/companyManagement/property/index.vue、src/views/company/companyManagement/components/index.vue、src/mixins/detailMixins.js
- 所属项目：淮安物管 zhi2-web-admin；代码基线 none；来源会话：d56499b7-3a3e-49a0-958c-452f7f13c782

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_change_tooltip",
  "source_extraction_id": "7abfe3a4488f477dab9e576a3242ceb4",
  "version": 1,
  "memory_type": "entities"
}
-->