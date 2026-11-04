- Em layout flexível, a coluna esquerda `.sort-left` define `max-height: min(560px, calc(72vh - 160px))` e `min-height: 0`.
- O filho `.sort-left-body` define `min-height: 0`, `overflow-y: auto`, `overflow-x: hidden` para habilitar scroll quando o conteúdo excede.
- 验证证据: cursor sessão=3fda1aa5-47de-48e9-8ced-e2755c0ecb88; 涉及文件: d:/repository/产品2.0/zhi2-web-admin/src/views/system/message/components/selectRangeDialog.vue, d:/repository/产品2.0/zhi2-web-admin/src/views/system/message/components/deptTree.vue

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Coluna esquerda com altura limitada requer min-height:0",
  "source_extraction_id": "1c24d55cf1d3406f8b4fcfae3956c253",
  "version": 1,
  "memory_type": "preferences"
}
-->