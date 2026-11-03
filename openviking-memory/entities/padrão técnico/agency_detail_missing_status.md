# Página de detalhe de agência omite status e condições de registro
No projeto 苏州市房地产监测V3, `AgencyBasicInfoDetail.vue` não exibe status de registro da agência e condições atendidas, não alinhado às regras da lista.

## Causa raiz
- `AgencyBasicInfoDetail.vue` não mostra status de registro e condições atendidas
- Não alinhado com regras da página de lista

## Solução
- Adicionar exibição na barra de status superior e bloco de informações básicas de `AgencyBasicInfoDetail.vue`, dados de `getCompanyApplyOverview`
- Em `agencyApplyOverview.js` adicionar lógica compartilhada `shouldShowApplyConditionMet`, restrita a `detailScope === 'own'` e exibição de agência

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3-leftover/016.md
- Arquivos: institution/record/index.vue, router/index.js, institution/company/admin.vue, AgencyBasicInfoDetail.vue, agencyBasicInfoContent.js, toB/agencyRecord/detail.vue, utils/agencyApplyOverview.js, components/HeadTitle/index.vue
- Projeto: 苏州市房地产监测V3; Sessão: 31f62931-8476-44d0-9fee-9330529a9b8b; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "agency_detail_missing_status",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 2,
  "memory_type": "entities"
}
-->