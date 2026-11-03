# 注册资本统一以金额组件万元单位展示
苏州市房地产监测V3 中注册资本展示规范统一为金额组件配置万元单位。

## 描述
- 注册资本展示规范统一为金额组件配置万元单位
- `agencyBasicInfoContent.js` 配置 `type: 'amount'`、`unit: '万元'`、`dot: 2` 覆盖查看态
- `AgencyBranchDetail.vue` 的 `basicInfoView` 接入 `DetailTemplate` 金额展示
- 移除 `formatFixedDecimal` 逻辑及引用，同步 `institutionRegister/detail.vue` 等页面

## 涉及文件
- src/views/company/institutionRegister/detail.vue
- src/views/institution/agencyBranch/components/AgencyBranchDetail.vue
- src/components/detail-template/detail-template.vue
- src/views/company/companyManagement/components/subCompanyRecordTable.vue、detail.vue、developerBasicInfoContent.js、agencyBasicInfoContent.js
- src/views/company/companyApplyAudit/detail.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/145.md
- 来源会话：933f8c6e-62d9-4070-9cc4-09de061894a6
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "capital_wan_unit",
  "source_extraction_id": "f03252ab12034d9281cc6024c18c407b",
  "version": 1,
  "memory_type": "entities"
}
-->