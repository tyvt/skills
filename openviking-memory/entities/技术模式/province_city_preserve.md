# 机构变更应保持原始 provinceCityArea
`companyBasicInfoContent.js` 在苏州市房地产监测V3项目中合并 `administrativeArea` 的显示值并保留原始 `provinceCityArea`。

## 问题
- `companyBasicInfoContent.js` 中的 `normalizeCompanyBasicForm` 在合并 `administrativeArea` 时未保留原始 `provinceCityArea`
- `companyRecordAgency/change/detail.vue` 中的 `getDetail` 在缺少变更时未填充原始登记数据

## 解决方案
- `normalizeCompanyBasicForm` 在合并 `administrativeArea` 显示值时保留原始 `provinceCityArea`
- `companyRecordAgency/change/detail.vue` 中的 `getDetail` 在变更缺失时填充原始登记数据

## 文件
- `zhi2-web-admin/src/views/company/companyRecordAgency/change/detail.vue`
- `zhi2-web-admin/src/views/company/companyManagement/components/companyBasicInfoContent.js`
- `zhi2-web-admin/src/views/company/companyManagement/components/CompanyBasicInfoForm.vue`
- `zhi2-web-admin/src/views/toB/companyRecord/detail.vue`
- `zhi2-web-admin/src/api/company/companyRecord.js`
- `zhi2-web-admin/src/views/company/companyManagement/components/CompanyBasicInfoDetail.vue`
- `zhi2-web-admin/src/views/institutionRegister/components/Step1BasicInfo.vue`
- `zhi2-web-admin/src/views/company/companyCancel/detail.vue`

## 验证
- 验证证据: src=苏州市房地产监测V3-leftover/036.md
- 会话: b9e75113-bcab-4880-a9ad-aff2106e5082
- 所属项目: 苏州市房地产监测V3; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "province_city_preserve",
  "source_extraction_id": "f749948ee9fa4da4a491c83192dd1efb",
  "version": 1,
  "memory_type": "entities"
}
-->