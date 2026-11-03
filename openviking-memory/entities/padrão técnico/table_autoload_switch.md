# Consulta automática no created causa pop-up de backend por parâmetros vazios
O `init()` do `src/mixins/table.js` chama `getList()` incondicionalmente no `created`, enviando pedido vazio interceptado pelo backend.

## Causa raiz
- `table.js` `init()` invoca `getList()` sem condições, gerando requisição vazia.
- Backend bloqueia e mostra pop-up de erro.

## Solução aplicada
- Adicionar flag `autoLoadList` (default `true`).
- `src/views/property/appOwnerAudit/index.vue` define `false` para pular consulta automática.
- Reescrever `handleQuery()` para validar frontend: nome/número de documento/telemóvel com pelo menos dois preenchidos antes do pedido.

## Ficheiros envolvidos
- `src/mixins/table.js`
- `src/mixins/listMixins.js`
- `src/mixins/ListTemplate.js`
- `src/views/property/appOwnerAudit/index.vue`
- `src/views/property/appUserAudit/index.vue`
- `src/views/property/ctUserIdentityApply/index.vue`

## Verificação e origem
- Projeto: 惠山二期G
- Evidência: `src=惠山二期G/011.md`
- Sessão de origem: `333318b1-4f2d-4f92-b2b0-f97f02e88d67`
- Linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "table_autoload_switch",
  "source_extraction_id": "fdaa115ec96f49938b5955e11ae03585",
  "version": 1,
  "memory_type": "entities"
}
-->