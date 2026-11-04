# 统一资本登记与万单位值组件

在苏州市房地产监测V3项目中，资本登记的显示规范已统一为使用万单位的值组件（万元）。

## 描述
- 资本登记原本是通过 `AgencyBranchDetail.vue` 中的 `displayValue` 使用 `formatFixedDecimal` 手动拼接的，未使用值单位配置。
- `agencyBasicInfoContent.js` 配置 `type: 'amount'`, `unit: '万元'`, `dot: 2` 用于查询展示。
- `AgencyBranchDetail.vue` 的 `basicInfoView` 改为使用 `DetailTemplate` 的值展示，移除了对 `formatFixedDecimal` 的引用。
- `institutionRegister/detail.vue` 及其他页面已同步为相同规范。

## 涉及的文件
- `src/views/company/institutionRegister/detail.vue`
- `src/views/institution/agencyBranch/components/AgencyBranchDetail.vue`
- `src/components/detail-template/detail-template.vue`
- `src/views/company/companyManagement/components/subCompanyRecordTable.vue`, `detail.vue`, `developerBasicInfoContent.js`, `agencyBasicInfoContent.js`
- `src/views/company/companyApplyAudit/detail.vue`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/186.md
- 源会话: 933f8c6e-62d9-4070-9cc4-09de061894a6
- 所属项目: 苏州市房地产监测V3; 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "capital_wan_unit",
  "source_extraction_id": "b850c6100f3340dc963c83ea536ffc93",
  "version": 2,
  "memory_type": "entities"
}
-->