# Chave de Dicionário Errada em Detalhe de Venda Consignada
A página de detalhe de venda consignada falhava ao exibir dicionário de estado de negócio devido a chave incompatível.

## 描述
- Projeto Suzhou Real Estate Monitoring V3, frontend zhi2-web-admin.
- Detalhe de entrustSale tinha retorno de dicionário de estado de negócio incorreto.

## 解决方案
- Modificar chave do dicionário de estado de negócio em `presale/entrustSale/detail.vue` para valor começando com `BI` para correta exibição.

## Verificação
- 验证证据: src=苏州市房地产监测V3-rest/012.md
- 涉及文件: presale/entrustSale/detail.vue; presale/entrustSale/index.vue; supervision/bank/jgwd/detail.vue; main.js; components/detail-template/detail-template.vue; autonomy/repair/detail.vue; mixins/detailMixins.js; utils/dict.js
- Sessão: 98dea9b7-0496-43cc-8f46-c865905aa071; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_dict_key",
  "source_extraction_id": "187c2553208941ddaccffd0b0decd66f",
  "version": 1,
  "memory_type": "entities"
}
-->