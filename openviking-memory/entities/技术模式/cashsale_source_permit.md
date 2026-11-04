# Mapeamento de sourcePermitNo na Lista de Venda à Vista

No projeto 苏州市房地产监测V3, a lista de conversão de pré-venda para venda à vista precisava mapear `sourcePermitNo` e corrigir o rótulo.

## 问题
- Em `cashsaleListMixin.js`, o texto do título da coluna estava errado e a coluna "预售许可证编号" mapeava `permitNo`, não correspondendo ao campo da API `sourcePermitNo`.

## Correção
- Título da coluna corrigido para "预售转现售申请编号".
- `prop` alterado para `sourcePermitNo` com formatter de fallback `row.sourcePermitNo || row.permitNo || '-'`.
- O filtro ainda usa `permitNo` para consulta.

## Arquivos Envolvidos
- `src/views/presale/cashsale/components/CashsaleTransferList.vue`, `CashsaleInfoPanel.vue`, `CashsaleDetail.vue`
- `src/views/presale/cashsale/cashsaleListMixin.js`, `transfer/index.vue`, `cashsaleConstants.js`
- `src/mixins/listMixins.js`
- `e2e/presale/cashsale-transfer-real-api-flow.spec.js`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/188.md
- Sessão de origem: 2d5fa078-1499-48cb-8fca-5cc13ccc4a4d
- 所属项目: 苏州市房地产监测V3; baseline de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_source_permit",
  "source_extraction_id": "b850c6100f3340dc963c83ea536ffc93",
  "version": 1,
  "memory_type": "entities"
}
-->