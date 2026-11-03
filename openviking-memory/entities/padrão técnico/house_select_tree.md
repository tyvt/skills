# Diálogo de seleção de imóvel deve complementar atributos tree e normalizar parâmetros
No projeto Suzhou Real Estate Monitoring V3, `HouseSelectDialog.vue` complementa `treeUrl`/`treeKey`/`treeLabel` via `buildingSelectTree` e padroniza requisição `findHouseList`.

## Complemento de propriedades
- `HouseSelectDialog.vue` usa `buildingSelectTree` para preencher `treeUrl`/`treeKey`/`treeLabel`
- Elimina avisos de prop ausente

## Requisição e parser
- `findHouseList` envia fixo `key:String(projectId)` e `buildCode`, com fallback `buildingId`
- `parseApiList` parseia apenas array/`rows`/`list`/`data`
- Excede paginação alerta truncamento

## Verificação e origem
- Evidência: src=苏州市房地产监测V3/070.md
- Arquivos: houseLimitAudit/index.vue, houseLimit/limitAdd.vue, HouseSelectDialog.vue, houseMerge/detail.vue, limitFormMixin.js, zs-select-dialog-func.vue, BuildingTableViewTabs.vue, zs-select-dialog.vue
- Sessão: b1e26906-7719-47ec-96f7-a8e3dc7a48fa; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "house_select_tree",
  "source_extraction_id": "3b0e49c9a828485693063aa7ee803883",
  "version": 1,
  "memory_type": "entities"
}
-->