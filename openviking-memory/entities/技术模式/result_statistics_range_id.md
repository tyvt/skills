# Navegação para ResultStatistics requer rangeId
Ao saltar de `decision/index.vue`, `elect/index.vue`, `ViewOptionsList.vue` para `ResultStatistics`, concatena `rangeId` (`decisionRangeId`); componentes complementam leitura e passagem do parâmetro.

## Regra
- `decision/index.vue`, `elect/index.vue`, `ViewOptionsList.vue` anexam `rangeId` na navegação
- `common/ResultStatistics.vue` e `multiple/ResultStatistics` leem e passam `decisionRangeId` para `selectMaintainResult`

## Arquivos e Verificação
- 验证证据: src=i淮安公版/001.md
- 涉及文件: src/pages_owner/decision/index.vue, elect/index.vue, decision/common/ResultStatistics.vue, decision/multiple/ResultStatistics.vue, decision/sort/ResultStatistics.vue, decision/components/DecisionList.vue, decision/multipleForm.vue, decision/optional/ResultStatistics.vue
- 所属项目: i淮安公版/zhi2-mobile-admin-h5-c-unlimited

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "result_statistics_range_id",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 1,
  "memory_type": "entities"
}
-->