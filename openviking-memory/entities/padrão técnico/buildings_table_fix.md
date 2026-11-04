# Correção do Botão de Exclusão BuildingsTable
O botão de exclusão do `BuildingsTable.vue` foi corrigido para validar linhas selecionadas.

## Causa
- O `disabled` do botão só verificava `form.bizState != '0'`, ignorando seleção de linhas

## Solução
- Alterado para `:disabled="form.bizState != '0' || multiple"`
- `multiple` mantido em `handleSelectionChange`, sendo `true` quando nada selecionado

## Arquivos Envolvidos
- `src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/components/BuildingsTable.vue`
- Relacionados: `zs-button.vue`, `PriceTable.vue`, `BuildRecordTable.vue`, `HouseScopeTable.vue`, `detail.vue`

## Verificação e Origem
- Evidência: extraído do cursor session=a93d9024-80c0-483e-b0d2-40a3f424626b
- Linha de base: none; projeto: Produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "buildings_table_fix",
  "source_extraction_id": "ea712054da3f4c828e9962a4a272fca7",
  "version": 1,
  "memory_type": "entities"
}
-->