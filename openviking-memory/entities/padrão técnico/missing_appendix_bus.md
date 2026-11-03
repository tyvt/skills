# Propriedade computada appendixBusCode ausente causa aviso Vue
No projeto 苏州市房地产监测V3, `AgencyBranchDetail.vue` vincula propriedade indefinida `appendixBusCode` em template de edição, disparando Vue warn.

## Causa raiz
- Template de edição de `AgencyBranchDetail.vue` referencia `appendixBusCode` não definido
- `AnnexUpload` não recebia bind `:bus` no modo de visualização

## Solução
- Adicionar propriedade computada `appendixBusCode` que lê de `$route.meta.busCode` ou fallback `AGENCY_BRANCH_APPENDIX_BUS`
- No modo de visualização, `AnnexUpload` sincroniza bind `:bus` para eliminar aviso

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3-leftover/068.md
- Arquivos: AgencyBranchDetail.vue, AnnexUpload/index.vue, CancelDialog.vue, AgencyPersonnelDetail.vue, utils/routeMeta.js, docs/agencyBranch-menu.md, e2e/institution/agency-branch-flow.spec.js, mixins/detailMixins.js
- Projeto: 苏州市房地产监测V3; Sessão: f9505d8d-b469-4811-976f-799ef8de543a; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "missing_appendix_bus",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 1,
  "memory_type": "entities"
}
-->