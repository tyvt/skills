# Correção de tabela de ativos sem linhas verticais por falta de sub-container
As linhas verticais globais de tabela só surgem em tabelas dentro de `.sub-container` com `border` ativo; o `houseTable.vue` do módulo benefit/assetLeaseApply foi ajustado para usar sub-container.

## Solução
- `houseTable.vue` passou a ser envolvido por `sub-container`
- Largura da coluna de sequência alterada para 80px
- Colunas de dados receberam `min-width`
- Coluna de valor de aluguel previsto recebeu `slot-width='120'` para corrigir o espaçamento

## Arquivos envolvidos
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/houseTable.vue
- zhi2-web-admin/src/components/zs-table/zs-table.vue
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subVenueTable.vue
- zhi2-web-admin/src/components/Headline/index.vue
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subAdvertiseTable.vue
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subOtherTable.vue

## Verificação
- Sessão de origem: 598aac99-dabd-44cd-9cf8-08c0eb4260e3 (extracted source=cursor)
- Linha de base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "asset_subcontainer_fix",
  "source_extraction_id": "1a2b75746c8a4c628333ce0a17314818",
  "version": 1,
  "memory_type": "entities"
}
-->