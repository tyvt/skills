# 将前端验证移除至后端

一种重构模式，其中前端的业务验证被移除并统一到后端。

## 描述
- 在 `guaranteeDepositAgreement/detail.vue` 中移除了 `beforeSaveHook` 和重复的协议验证常量。
- 在 `guaranteeDepositAgreementEnd/detail.vue` 中移除了前端的 `loadAgreementById` 拦截。
- 在 `guaranteeDeposit/components/index.vue` 中将 `checkAccountAndAgreement` 改为 `fetchAccountAndAgreement`，仅用于预填充。
- 在 `AddDialog.vue` 中移除了余额验证。
- 业务验证改为由后端统一处理。

## 关系
- 受影响的文件：`guaranteeDepositAgreement/detail.vue`, `guaranteeDepositAgreementEnd/detail.vue`, `guaranteeDepositAccount/detail.vue`, `guaranteeDepositAccount/index.vue`, `guaranteeDeposit/components/index.vue`, `guaranteeDeposit/components/AddDialog.vue` (项目 zhi2-web-admin)。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "validacao_frontend_backend",
  "source_extraction_id": "e24be3328bc94fe9a65179d03859c6a6",
  "version": 2,
  "memory_type": "entities"
}
-->