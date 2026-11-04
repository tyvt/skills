# Remoção de validação front-end para backend

Padrão de refatoração onde validações de negócio no front-end são removidas e unificadas no backend.

## Descrição
- Em `guaranteeDepositAgreement/detail.vue` removeu-se `beforeSaveHook` e constantes de validação duplicada de acordo.
- Em `guaranteeDepositAgreementEnd/detail.vue` removeu-se interceptação `loadAgreementById` no front-end.
- Em `guaranteeDeposit/components/index.vue` alterou-se `checkAccountAndAgreement` para `fetchAccountAndAgreement` apenas pré-preenchendo.
- Em `AddDialog.vue` removeu-se validação de saldo.
- Validação de negócio passou a ser tratada uniformemente pelo backend.

## Relações
- Arquivos afetados: `guaranteeDepositAgreement/detail.vue`, `guaranteeDepositAgreementEnd/detail.vue`, `guaranteeDepositAccount/detail.vue`, `guaranteeDepositAccount/index.vue`, `guaranteeDeposit/components/index.vue`, `guaranteeDeposit/components/AddDialog.vue` (projeto zhi2-web-admin).

<!-- MEMORY_FIELDS
{
  "category": "padrão de código",
  "name": "validacao_frontend_backend",
  "source_extraction_id": "e24be3328bc94fe9a65179d03859c6a6",
  "version": 2,
  "memory_type": "entities"
}
-->