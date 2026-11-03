# 租金支付方式仅改显示承租字段非必填
苏州市房地产监测V3 中 leaseContract/detail.vue 表单 label 改为「租金支付方式」且 PartyDialog 部分字段前端非必填。

## 实现要点
- `detail.vue` 表单 label 改为「租金支付方式」（`paymentMethodPay` 字段名不变），校验提示同步更新
- `components/PartyDialog.vue` 的 `graduatedInstitutions` 与 `maritalStatus` 前端无 required 校验（仅学历必填）
- 若后端拦截需调整对应后端 DTO，本仓库无后端代码

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/103.md
- 涉及文件：zhi2-web-admin/src/views/presale/leaseContract/detail.vue、components/PartyDialog.vue、PartyTable.vue、e2e/presale/lease-contract-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：4c0423f1-628e-4000-b197-3d3749671921；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rent_pay_method_non_required",
  "source_extraction_id": "3a29ac9907f94022a22fb0ef67802f2f",
  "version": 1,
  "memory_type": "entities"
}
-->