# Perda de seleção total de edifícios por defeito no setData
O componente `general` DecisionRangeTable.setData submete apenas o edifício atual após seleção, causando perda da seleção total; é necessário corrigir prioritariamente.

## Causa raiz
- `DecisionRangeTable.setData` (em `general`) submete apenas o edifício atual após clique, ignorando seleção total.
- Lado de submissão deve filtrar `initHouseChecked` com `exist==1` para evitar duplicação de inserção.
- Tipo de `checked` na lista de preparação deve ser unificado.

## Ficheiros envolvidos
- `src/views/autonomy/mixins/decisionRangeBuildingSelectMixins.js`
- `src/components/zs-select-dialog/zs-select-dialog.vue`
- `src/views/autonomy/election/components/apply/RangeTable.vue`
- `src/views/autonomy/preparatoryApply/components/preparatoryRangeTable.vue`
- `src/views/autonomy/general/components/DecisionRangeTable.vue`
- `src/views/autonomy/multiply/components/DecisionRangeTable.vue`
- `src/views/autonomy/option/components/DecisionRangeTable.vue`
- `src/views/autonomy/repair/components/DecisionRangeTable.vue`

## Verificação e origem
- Projeto: 惠山二期G
- Evidência: `src=惠山二期G/009.md`
- Sessão de origem: `da4d5f02-fc36-4e8c-8717-0c4503f50d5e`
- Linha de base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "general_setdata_fullselect",
  "source_extraction_id": "fdaa115ec96f49938b5955e11ae03585",
  "version": 1,
  "memory_type": "entities"
}
-->