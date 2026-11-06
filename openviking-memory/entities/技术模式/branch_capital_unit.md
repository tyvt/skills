# 分支机构注册资本单位展示改造
苏州市房地产监测V3 统一了分支机构详情页注册资本的展示方式，将单位“万元”从值中移除并作为字段单位。

## 改动内容
- agencyBasicInfoContent.js：标签改为「注册资本」，type:'amount'，unit:'万元'，dot:2，影响经纪机构基本信息查看态
- AgencyBranchDetail.vue：basicInfoView 中注册资本走 DetailTemplate 金额展示，移除 displayValue 里的 formatFixedDecimal 及对应 import
- institutionRegister/detail.vue：同步调整注册资本金额展示

## 涉及文件
- zhi2-web-admin/src/views/company/companyManagement/components/agencyBasicInfoContent.js
- zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchDetail.vue
- zhi2-web-admin/src/views/company/institutionRegister/detail.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话ID：933f8c6e-62d9-4070-9cc4-09de061894a6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_capital_unit",
  "source_extraction_id": "fc84a4f4f2314ce5913569c89a7f798e",
  "version": 1,
  "memory_type": "entities"
}
-->