
- Alinhar globalmente a interface de exclusão de contratos de venda para V1: em `versionManagement/index.vue` e `template/index.vue` remover `deleteType:'v2'` e usar array de IDs puros padrão do mixin v1.
- Em `contractRevoke/index.vue` remover `deleteType`, `deleteParamKey` e `deleteRequest` customizado; `contractMainInfo` mantém v1; `contractRequest.js` ajusta encapsulamento de exclusão.
- Evidência: src=苏州市房地产监测V3-rest/019.md; sessão 02493c7b-f06b-483c-88cf-bdc96dade318.


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "versão de exclusão de contrato",
  "source_extraction_id": "261683e4b6f6441e994fe34ffbde724a",
  "version": 1,
  "memory_type": "preferences"
}
-->