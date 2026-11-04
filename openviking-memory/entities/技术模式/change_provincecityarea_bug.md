# 公司变更时 provinceCityArea 未填充的问题
在 苏州市房地产监测V3 项目中，代理机构登记变更在规范化表单时未恢复 `provinceCityArea` 的原始值。

## 问题
- 在 `companyBasicInfoContent.js` 中的 `normalizeCompanyBasicForm` 在合并显示值 `administrativeArea` 时未保留 `provinceCityArea`
- 当变更指令中缺少该字段时，`companyRecordAgency/change/detail.vue` 中的 `getDetail` 未回溯原始数据

## 解决方案
- 在 `createCompanyBasicInfoFormDefaults` 中保留 `provinceCityArea` 的原始值并补充默认值
- 变更时的 `getDetail` 在字段缺失时从原始登记数据中恢复

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
- 验证证据: src=苏州市房地产监测V3/236.md
- 会话: b9e75113-bcab-4880-a9ad-aff2106e5082
- 所属项目: 苏州市房地产监测V3; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_provincecityarea_bug",
  "source_extraction_id": "5a368dde30334afa99f7154d2f5147cf",
  "version": 1,
  "memory_type": "entities"
}
-->