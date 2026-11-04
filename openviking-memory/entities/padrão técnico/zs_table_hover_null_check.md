# Verificação de nulo no hover do zs-table
No zs-table.vue, os manipuladores de hover acessavam cell.parentElement sem verificação, causando erro quando cell era undefined.

## Problema
- Em zs-table.vue, handleCellMouseEnter/handleCellMouseLeave acessavam diretamente cell.parentElement.
- Em linhas de total ou colunas fixas não sincronizadas, cell podia ser undefined, gerando "Cannot read properties of undefined".

## Solução
- Adicionado `if (!cell?.parentElement) return` para bloquear acesso a undefined.

## Arquivos e origem
- Arquivos: zs-table.vue; src/views/benefit/assetLeaseApply/index.vue; src/views/property/complex/components/RegionTreeLayout.vue.
- Evidência: src=产品2.0/085.md; sessão: 2e92212a-8c81-44e4-9cc6-e2feecfe6e5e.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "zs_table_hover_null_check",
  "source_extraction_id": "101ea3de48ee43dbb0f0a7c8a375f9f1",
  "version": 1,
  "memory_type": "entities"
}
-->