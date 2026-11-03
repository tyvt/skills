# Agency Branch GetOwnCompany
Correção em página de novo branch usando `getOwnCompany` em vez de `init` para pré-preenchimento no projeto 苏州市房地产监测V3.

## Pontos de Implementação
- Em `AgencyBranchDetail.vue`, `loadInit` mudou para `loadAddPage`, usando `getOwnCompany` para obter info da agência e desabilitar campos.
- Em estado de adição, `configOnly` é enviado e `draftAppendixIds` é anexado via `attachmentList` do `/add`.
- Rascunho local sem `agencyBranchId` ainda injeta `AgencyBranchList.vue`; caso E2E `agency-branch-real-api-flow.spec.js` espera `getOwnCompany` em vez de `init`.

## Arquivos Envolvidos
- D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchDetail.vue
- D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchList.vue
- D:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/institution/agency-branch-real-api-flow.spec.js

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3-rest/026.md
- Sessão: 01a162aa-5047-70c5-a400-7594cbb8728b
- Projeto: 苏州市房地产监测V3; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_getowncompany",
  "source_extraction_id": "2541e120aaed44a78ac4d8041d820fd0",
  "version": 1,
  "memory_type": "entities"
}
-->