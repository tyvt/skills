# Migração de interface de código de banco para módulo unionBank
Frontend unificou interface de código de banco para `/system/unionBank/page` (via `VITE_APP_BASE_API=/api/v3.0`).

## Mudança
- Nova `zhi2-web-admin/src/api/system/unionBank.js` exporta `pageUnionBank()`
- `yhlhhgl.js` muda `listYhlhhgl` para chamar `pageUnionBank()`; CRUD antigo `unionCodeManage/*` mantido

## Arquivos
- company/companyApply/detail.vue
- company/companyManagement/components/bankTable.vue
- company/companyRegister/components/bankTable.vue
- company/relatedUnitRecord/components/relatedUnitRecordBank.vue
- company/companyManagement/components/detail.vue
- company/companyApplyAudit/detail.vue
- company/companyManagement/components/CompanyBasicInfoForm.vue
- property/pubMerchantApply/detail.vue

## Validação
- 验证证据: src=苏州市房地产监测V3/029.md
- Sessão: 6ce24e16-f765-47a3-bfb6-b6b8daf87b3a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "union_bank_migration",
  "source_extraction_id": "c7ea67c41536451ea2f1166b9de5c647",
  "version": 1,
  "memory_type": "entities"
}
-->