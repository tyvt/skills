# Web-view H5 sem navbar com offset 40px causa vazamento
Quando o H5 SuzhaoFang é embutido em web-view de mini-programa terceiro, sem `.uni-page-head`, o offset original `top:40px` deixa fresta no tab sticky.

## Problema
- Host fornece navbar, H5 não tem `.uni-page-head`; `top:40px` original causa vazamento de conteúdo atrás do tab sticky.
- Afeta páginas de detalhe de transação/newHouse etc.

## Solução
- Adicionadas `isMiniProgramWebView()` e `getPageHeaderOffset()` em utils/index.js forçando `top:0`.
- `detail.vue` usa `top:0` default e calibra sticky/anchor dinamicamente.
- Componentes ajustados: ZsNav.vue, tabLine.vue, tabBtn.vue, uni.scss, pages.json, dishonestyCredit/index.vue, property-detail.vue.

## Verificação
- Evidência: src=苏住房C/030.md; sessão 7e811367-b5c4-4dfb-83e7-e8f29ef7909c; base none.

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia SuzhouC",
  "name": "webview_h5_offset",
  "source_extraction_id": "195ef044b5d84cc697c2bf15d158b46d",
  "version": 1,
  "memory_type": "entities"
}
-->