
# Remoção de ramos de ambiente em 10 arquivos
No projeto 苏州市房地产监测V3, ramos de ambiente foram removidos de múltiplos arquivos para unificar lógica comum.

## Alteração
- Em notice/detail.vue, usemoney/detail.vue e outros 10 arquivos, removidos ramos isSuzhouzhizai/currentEnvironment
- Conta bancária unificada para campos genéricos ${frontLabel}/${frontBank}
- defaultTabList fixado em três abas: 用款明细, 关联楼幢, 股东信息

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/179.md
- Arquivos: notice/detail.vue, AppropriationBuildingsTable.vue, usemoney/detail.vue, RelatedBuildingsTable.vue, usemoneyRevoke/detail.vue, BuildingTable.vue, AppropriateTable.vue
- Sessão: f81fe328-0c4a-411a-b2a9-b762808390a4; baseline: none


<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "env_branch_unify",
  "source_extraction_id": "637076c2ee6643d5b35f55f28e70f356",
  "version": 1,
  "memory_type": "entities"
}
-->