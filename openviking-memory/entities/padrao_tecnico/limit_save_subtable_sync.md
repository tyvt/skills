# Subtabela Não Atualiza após Salvar Limite
Em detail de edição de limite, falta de sincronização de paginação da subtabela fazia com que ela não atualizasse após salvar.

## Causa Raiz
- Detail em modo edição não retornava houseList e não chamava `/building/houseLimit/page` para preenchimento
- Callback de salvar não sincronizava explicitamente, causando não atualização da subtabela

## Correção
- `limitFormMixin.js` ganhou `syncSelectedHousesFromSubTablePage()` chamado em `$nextTick`
- `detailCallback` sobrescreve `selectedHouses` apenas quando `houseList.length > 0`

## Verificação
- Evidência: src=苏州市房地产监测V3-rest/088.md
- Arquivos: stock/limit/detail.vue, building/houseLimit/limitFormMixin.js, limitAdd.vue, limitCancel.vue, houseLimitAudit/index.vue, mixins/detailMixins.js, mixins/form.js
- Sessão: f7ff995f-0339-4200-9550-e6b17381deaf; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "limit_save_subtable_sync",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 1,
  "memory_type": "entities"
}
-->