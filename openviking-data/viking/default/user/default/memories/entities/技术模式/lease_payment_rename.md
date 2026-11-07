# 租金支付方式更名且个人承租方非必填
租赁合同 detail.vue 将 paymentMethodPay 标签及校验提示改为「租金支付方式」，PartyDialog 个人承租方 graduatedInstitutions 与 maritalStatus 前端非必填。

## 变更要点
- detail.vue 将 paymentMethodPay 表单标签及校验提示改为「租金支付方式」，字段名不变
- PartyDialog.vue 个人承租方 graduatedInstitutions 与 maritalStatus 无 required 校验，前端不必填

## 注意事项
- 若个人承租方被后端拦截，需调整后端 DTO
- e2e 基于 lease-contract-real-api-flow.spec.js 保持兼容

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/303.md
- 涉及文件：presale/leaseContract/detail.vue、PartyDialog.vue、PartyTable.vue、lease-contract-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：4c0423f1-628e-4000-b197-3d3749671921；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_payment_rename",
  "source_extraction_id": "44503dfe3d384a8da633982d1828183f",
  "version": 1,
  "memory_type": "entities"
}
-->