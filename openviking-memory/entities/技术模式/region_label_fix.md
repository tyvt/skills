# Correção de Rótulo de Região com Formatter Provincial
No Suzhou Real Estate Monitoring V3, o campo region em projectDelivery armazena código e a view de detalhe deve converter para nome.

## 问题根因
- Em `supervision/projectDelivery`, `region` armazena código de divisão administrativa; a view de detalhe exibia o código diretamente sem converter para nome.

## 解决方案
- `ProjectDeliveryInfoPanel.vue` adicionou propriedade computada `regionLabel` que chama `formatters.provinceFormatter` para conversão.
- `regionLabel` usado uniformemente em detalhe e formulário de edição.

## Verificação
- 验证证据: src=苏州市房地产监测V3/092.md
- 涉及文件: ProjectDeliveryInfoPanel.vue, projectDeliveryConstants.js, ProjectDeliveryDetail.vue, index.vue, detail-template.vue, listMixins.js, detailMixins.js, ruoyi.js
- Sessão de origem: 189a9e5a-b1d3-44f4-a6ab-16d07c1529ef; baseline: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_label_fix",
  "source_extraction_id": "001ba47e03e9421b8f9ada51bc0b7ab9",
  "version": 1,
  "memory_type": "entities"
}
-->