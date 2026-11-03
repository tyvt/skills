# 变更表单值格式化后相同则隐藏原值角标
变更编辑页比较变更前/当前值未统一格式化（如 `/`与空白、数字类型、区划取值），语义相同误显红色「原值」角标。

## 问题根因
- 变更编辑页比较变更前与当前值未统一格式化
- `/` 与空白、数字类型、区划取值等语义相同但表现形式不同
- 导致语义相同的字段误显红色「原值」角标

## 修复方案
- 新增 `zhi2-web-admin/src/utils/formChangeTooltip.js` 的 `resolveFormChangeTooltip` 等函数做同格式比较
- `DeveloperBasicInfoForm.vue` 字典字段双侧格式化
- 行政区划使用 `pickRegionFieldValue` 对齐详情展示

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/061.md
- 涉及文件：utils/formChangeTooltip.js、companyManagement/components/DeveloperBasicInfoDetail.vue、toB/companyRecord/detail.vue、DeveloperBasicInfoForm.vue、companyBasicInfoShared.js、directives/form/index.js、detail-template.vue、developerBasicInfoContent.js、AgencyBasicInfoForm.vue
- 所属项目：苏州市房地产监测V3；来源会话：52921acc-1bb2-40b9-9679-abb2a470ef0a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "change_form_format",
  "source_extraction_id": "914335400ee24df19f7a1f642d838c6f",
  "version": 1,
  "memory_type": "entities"
}
-->