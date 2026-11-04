# Normalização do status de venda do imóvel
No módulo house-limit do Suzhou Real Estate Monitoring V3, os dados do imóvel possuem os campos duplos `saleStatus` e `sale_status`; `resolveHouseSaleStatus` em `houseLimitConstants.js` unifica a origem para que a exibição `dict-tag` e a lógica de desativação `isHouseSelectable` fiquem consistentes.

## Pontos de alteração
- `houseLimitConstants.js` adiciona `resolveHouseSaleStatus` com lógica `saleStatus ?? sale_status`
- `isHouseSold` e `normalizeHouseLimitLineRow` chamam `resolveHouseSaleStatus`
- `HouseSelectDialog.normalizeHouse` grava o `saleStatus` normalizado
- Mantido o aviso `el-form-item` existente sem alterar a estrutura de negócio

## Verificação e atribuição
- Verificação: src=苏州市房地产监测V3/172.md; src=苏州市房地产监测V3-rest/149.md
- 涉及文件: HouseSelectDialog.vue, houseLimitConstants.js, detail.vue, limitFormMixin.js, limitAdd.vue, HouseLimitFloorSelectGrid.vue, limitCancel.vue
- Sessão de origem: f742546b-5fa1-4c38-be7c-f50d9d083f69; baseline de código: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sale_status_normalize",
  "source_extraction_id": "3815f0545ae74fae8287a1e94503770d",
  "version": 2,
  "memory_type": "entities"
}
-->