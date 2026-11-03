# Espaçamento duplo em painel esquerdo de diálogo por estilo global
No 苏州市房地产监测V3, o `zs-dialog` global define `.dialog-left` com `margin-right: 20px; padding: 20px`; estilo novo do componente tem mesma prioridade e não vence, causando espaçamento duplo no painel esquerdo.

## Causa raiz
- `.dialog-left` global em `zs-select-dialog.vue` tem `margin-right: 20px; padding: 20px`
- Novo estilo do componente tem prioridade igual e não substitui o global

## Solução
- `BuildingUnitLazyTree.vue` usa seletor `.dialog-box .dialog-left.building-unit-lazy-tree` (0,4,0)
- `ContractDialog.vue`, `NoticeContractDialog.vue`, `buildingTreeDialog.vue` adicionam classe `select-contract-dialog`/`select-notice-dialog` e unificam padding do body e `gap: 16px` do painel

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3/254.md
- Arquivos: chooseHouseDialog.vue, BuildingUnitLazyTree.vue, ContractDialog.vue, buildingTreeDialog.vue, NoticeContractDialog.vue, HouseSelectDialog.vue, zs-select-dialog.vue, BuildingDialog.vue
- Projeto: 苏州市房地产监测V3; Sessão: 7342d846-a274-472d-aa53-0402cfe58bdb; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "dialog_left_double_spacing",
  "source_extraction_id": "bc24b503fbae49f6a34aceca79c91074",
  "version": 1,
  "memory_type": "entities"
}
-->