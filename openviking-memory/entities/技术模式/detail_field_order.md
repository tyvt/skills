# DetailTemplate com ordem e campos divergentes
O DetailTemplate(contentInfo) de building/project/detail.vue e projectChange/detail.vue divergia da captura de tela em ordem e campos.

## Problema
- A ordem dos campos no DetailTemplate(contentInfo) não correspondia à captura de tela.
- Faltavam campos como landPlotName, nome do responsável pelo uso do terreno e observações.

## 解决方案
- Reordenado contentInfo conforme a página de visualização.
- Adicionados ao final: nome do lote, pessoa com direito de uso do terreno e observações.
- Endpoints e estado de edição não foram alterados.

## Arquivos e origem
- 涉及文件: building/project/detail.vue; building/projectChange/detail.vue.
- 验证证据: sessão cursor ff097cf6-67f8-45c1-8b04-753136cfda5d.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_field_order",
  "source_extraction_id": "9e5325997abb4bf8bfb4d64dabe6b2a1",
  "version": 1,
  "memory_type": "entities"
}
-->