- Causa: `validateDetailRequiredParams()` em `zhi2-web-admin/src/mixins/form.js` forçava a mesclagem de `primaryKey` e `id` fora de `getDetailRequiredParams()`, fazendo `platformConfig/detail.vue` (sem id) pular a requisição por falta de parâmetro.
- Correção: `form.js` passa a validar apenas os parâmetros obrigatórios declarados pela página; `platformConfig/detail.vue` adiciona `getDetailParams()` retornando objeto vazio para a convenção sem id; páginas normais inalteradas.
- 验证证据: src=苏州市房地产监测V3/187.md; Sessão: a93895cc-33d7-4c71-899b-f31458cbb86c

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Validação de Parâmetros de Detalhe sem ID",
  "source_extraction_id": "b850c6100f3340dc963c83ea536ffc93",
  "version": 1,
  "memory_type": "preferences"
}
-->