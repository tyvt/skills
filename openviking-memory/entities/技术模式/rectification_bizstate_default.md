# rectification_bizstate_default
No módulo rectificationNotice, o bizState padrão '2' (已备案) causava lista apenas de registros arquivados.

## Correção
- Em zhi2-web-admin/src/views/evaluation/rectificationNotice/index.vue linha 108, bizState alterado para undefined, busca vazia e API sem filtro.
- Detalhe: popup de área de imóvel novo mantém lógica; cache Vuex precisa de reset click.
- 涉及文件: rectificationNotice/index.vue, detail.vue, mixins/listMixins.js, ListTemplate.js, table.js.
- 所属项目: 苏住房G; 验证证据: src=苏住房G/053.md; sessão: 952fd9dc-40f6-4af0-88c2-cdd449ab3e96.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rectification_bizstate_default",
  "source_extraction_id": "365bab52c52f4179bd3a6d0ab0e8c6cc",
  "version": 1,
  "memory_type": "entities"
}
-->