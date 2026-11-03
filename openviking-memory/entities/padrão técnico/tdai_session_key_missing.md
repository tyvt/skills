# Ferramenta tdai exige session_key obrigatório
No projeto 苏州市房地产监测V3, ferramentas MCP como `tdai_recall` exigem `session_key` (ex.: 苏州市房地产监测V3); ausência dispara erro Missing required argument.

## Causa raiz
- `tdai_recall` e outras ferramentas MCP exigem `session_key` obrigatório
- Chamada sem `session_key` dispara `Missing required argument`

## Solução
- Chamar passando `query` e `session_key` simultaneamente

## Verificação
- Evidência: src=苏州市房地产监测V3-rest/052.md
- Arquivos: api/xmxx/jgxm.js, supervision/agreement/jgxm/components/SupervisionAddDialog.vue, supervision/agreement/jgxm/components/RegulatoryDialog.vue, utils/apiV3Normalize.js, api/index.js, utils/request.js, mixins/ListTemplate.js, components/zs-select-dialog/zs-select-dialog-func.vue
- Projeto: 苏州市房地产监测V3; sessão: 003bc3d6-55d2-4909-bd30-0c1d02f0083d; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "tdai_session_key_missing",
  "source_extraction_id": "d95879747bf7424f888902315b00312c",
  "version": 1,
  "memory_type": "entities"
}
-->