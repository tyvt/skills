# Override de getByKey na normalização V3
O `getByKey` era inferido pela regra `ByKey` como `key`, fazendo com que o mapeamento `ACTION_PATH_PARAM_KEYS` em `apiV3Normalize.js` não funcionasse.

## Problema
- A função `getByKey` era priorizada pela regra `ByKey` para parâmetro `key`, invalidando mapeamento de `configKey`.
- Resultava em corpo de requisição errado em vez de `{"configKey":"..."}` para endpoints como system/config.

## Solução
- Adicionar `getByKey: 'configKey'` a `ACTION_PARAM_KEY_OVERRIDES` no mesmo arquivo `apiV3Normalize.js` (maior prioridade) para corrigir o parâmetro de corpo.
- `zhi2-web-admin/src/utils/apiV3Normalize.js` é o local da correção; `system/config.js` e `request.js` relacionados.

## Verificação
- Evidência src=产品2.0/065.md; sessão 8dceac0c.
- Arquivos: src/api/system/config.js, src/utils/apiV3Normalize.js, src/api/index.js, src/utils/request.js, src/views/home/privacy.js.
- Projeto: Produto 2.0.

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia do Produto 2.0",
  "name": "getbykey_override",
  "source_extraction_id": "3767eb61220a4803b7b3738f9ee63044",
  "version": 1,
  "memory_type": "entities"
}
-->