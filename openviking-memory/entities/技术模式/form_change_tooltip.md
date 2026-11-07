# 变更前后值未统一格式化致原值角标误显
苏州市房地产监测V3 的 zhi2-web-admin 中变更编辑页缺乏统一格式化比较，语义相同值仍显示红色「原值」角标。

## 问题根因
- 变更编辑页对变更前/当前值缺乏统一格式化比较
- 语义相同（如「江苏省 / 苏州市」与「江苏省 苏州市」、数字 108.89 与 "108.89"）时仍显示红色「原值」角标

## 修复方案
- 新增 zhi2-web-admin/src/utils/formChangeTooltip.js 的 resolveFormChangeTooltip 等函数统一格式化比较
- 在 DeveloperBasicInfoForm.vue 应用双侧字典格式化与 pickRegionFieldValue 区划逻辑

## 涉及文件
- zhi2-web-admin/src/utils/formChangeTooltip.js
- zhi2-web-admin/src/views/company/companyManagement/components/DeveloperBasicInfoForm.vue、DeveloperBasicInfoDetail.vue
- zhi2-web-admin/src/views/toB/companyRecord/detail.vue
- zhi2-web-admin/src/views/company/companyManagement/components/companyBasicInfoShared.js
- zhi2-web-admin/src/directives/form/index.js
- zhi2-web-admin/src/components/detail-template/detail-template.vue
- zhi2-web-admin/src/views/company/companyManagement/components/developerBasicInfoContent.js
- zhi2-web-admin/src/views/company/companyManagement/components/AgencyBasicInfoForm.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/112.md
- 来源会话：52921acc-1bb2-40b9-9679-abb2a470ef0a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_change_tooltip",
  "source_extraction_id": "09a31a0689854a169928cbe032f1d3df",
  "version": 1,
  "memory_type": "entities"
}
-->