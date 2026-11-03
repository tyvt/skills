# Agência Branch usa getOwnCompany em página de adição
Substituição de init por getOwnCompany para pré-preenchimento de dados da instituição na página de adição.

## Descrição
- O `AgencyBranchDetail.vue` alterou `loadInit` para `loadAddPage` usando `getOwnCompany` para obter `companyRecord`.
- Mapeia para `parentCompanyName`/`parentSocialCreditCode` exibidos desabilitados.
- No estado de adição, `configOnly` é enviado e `draftAppendixIds` é anexado via `attachmentList` do `/add`.
- Botão «Enviar» oculto até sucesso do `/add`.

## Arquivos
- `AgencyBranchDetail.vue`, `AgencyBranchList.vue` com injeção de rascunho local sem `agencyBranchId`.
- Teste `agency-branch-real-api-flow.spec.js` aguarda `getOwnCompany` substituir `init`.

## Verificação
- Fonte: 苏州市房地产监测V3/072.md; sessão 01a162aa-5047-70c5-a400-7594cbb8728b.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "agency_branch_add_get_own_company",
  "source_extraction_id": "c7bc53bcb27a4ee29de6d3657fdd1479",
  "version": 1,
  "memory_type": "entities"
}
-->