# 入网审核详情服务方案收费标准缺单位
苏州市房地产监测V3 中 institutionRegister/detail.vue 服务方案收费标准未按类型拼接单位，已抽取公共函数修复。

## 实现要点
- `institutionRegister/detail.vue` 服务方案收费标准仅对比例类型追加 `%`，固定金额等未显示 `元` 或 `元/平方米`
- 于 `schemeDetailTemplate.js` 抽取 `chargeUnitFromFeeTypeLabel` 与 `formatSchemeChargeStandard`
- 使 `institutionRegister/detail.vue` 与 `companyRecordAgency/detail.vue` 表格及弹窗按类型拼接 `%`/`元/平方米`/`元`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/106.md
- 涉及文件：zhi2-web-admin/src/views/company/institutionRegister/detail.vue、companyScheme/schemeDetailTemplate.js、CompanySchemeDialog.vue、institutionRegister/components/Step4ServiceScheme.vue、companyScheme/index.vue、companyRecordAgency/detail.vue、institution/agencyBranch/components/AgencyBranchDetail.vue、e2e/company/institution-register-audit-scheme.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：0266b42a-44e7-41ce-aa1d-9fcb05c9ee0a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "audit_scheme_charge_unit",
  "source_extraction_id": "3a29ac9907f94022a22fb0ef67802f2f",
  "version": 1,
  "memory_type": "entities"
}
-->