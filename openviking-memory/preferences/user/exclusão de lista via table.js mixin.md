- A lógica de exclusão em páginas de lista deve ser delegada ao mixin table.js, eliminando requisições customizadas redundantes.
- Em versionManagement/index.vue e template/index.vue, manter deleteType: 'v2', remover deleteParamKey e deleteRequest; o mixin table.js envia automaticamente POST /delete.
- Arquivos: contractRequest.js, versionManagement/index.vue, template/index.vue, listMixins.js, table.js, versionManagement/detail.vue, template/detail.vue, contractMainInfo/index.vue. Evidência: 苏州市房地产监测V3-rest/003.md.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Exclusão de lista via table.js mixin",
  "source_extraction_id": "772b51dcf2dd4e5b954bbf2076058ae6",
  "version": 1,
  "memory_type": "preferences"
}
-->