# Auditoria de Campos Core de Agência e Trava de USCI
A lógica de alteração de agência estava incompleta e causava erro de autorização; foi adicionada verificação de campos core e trava de código USCI.

## Descrição
- Projeto Suzhou Real Estate Monitoring V3, frontend zhi2-web-admin.
- Falta de lógica de alteração de agência provocava erro de autorização.

## Solução
- Novo arquivo `agencyChangeCoreFields.js` com julgamento de campos core e bloqueio de USCI (código de crédito).
- `AgencyBasicInfoForm.vue` desabilita campos em modo alteração e reescreve valores originais em `getForm()`.
- Alterações de campos core seguem auditoria `jjjgbgxq`; não core salvam efeito imediato.

## Verificação
- Evidência: src=苏州市房地产监测V3-rest/011.md
- Arquivos: AgencyBasicInfoDetail.vue; companyRecordAgency/detail.vue; utils/ruoyi.js; e2e/fixtures/company-menu-config.js; companyRecordAgency/change/detail.vue; toB/agencyChange/detail.vue; toB/agencyRecord/detail.vue; toB/change/detail.vue
- Sessão: 6c91b23f-bba3-49fb-bd85-76e4879db720; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "agency_core_field_audit",
  "source_extraction_id": "187c2553208941ddaccffd0b0decd66f",
  "version": 1,
  "memory_type": "entities"
}
-->