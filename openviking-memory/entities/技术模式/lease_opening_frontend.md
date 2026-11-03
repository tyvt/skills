# 租赁企业开业前端联调
苏州市房地产监测V3 租赁企业开业前端按接口文档实现联调，覆盖主页面路由、只读/可编辑表单态与双附件包。
## 实现要点
- 主页面位于 `zhi2-web-admin/src/views/zljg/leaseEntryNetwork/detail.vue`
- 营业执照等字段只读，办公信息等可编辑，由 `bizState=0` 控制编辑态
- 附件使用 030300（注册）+ 030310（开业）双 `AppendixPackageSection` 组合
- 接口沿用 `getEntryNetworkDetail` 等既有企业开业接口
## 涉及文件
- `AgencyEntryNetworkDetail.vue`、`AgencyEntryNetworkSections.vue`
- `InstitutionRegisterSingleForm.vue`、`companyRecord.js`
- e2e 测试：`register-entry-network-appendix-real-api-flow.spec.js`、`lease-institution-register-flow.spec.js`
- 辅助：`e2e/fixtures/entry-network-helpers.js`
## 验证与归属
- 验证证据：来源会话 662b0e4d-5990-4b51-9c23-9536e0b79e3a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_opening_frontend",
  "source_extraction_id": "5f5198d2b46443abad5d1a01cf1edbb4",
  "version": 1,
  "memory_type": "entities"
}
-->