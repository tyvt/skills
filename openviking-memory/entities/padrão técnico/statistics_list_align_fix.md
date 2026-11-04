# Correção de redundância em página statistics por alinhamento a lista padrão
A página `statistics/index.vue` foi alinhada à escrita padrão de lista (`release/index.vue`) eliminando código redundante.

## Problema
- `statistics/index.vue` não seguia o padrão de lista, causando dados redundantes e métodos manuais.

## Solução
- Adotar `ListTemplate.js` + `listMixins`.
- Remover `getList` manual e dados redundantes; `operationButtons` retorna vazio.
- `buttons` mantém apenas `viewButton`; preservar `initDict` e `handleView`.

## Arquivos Envolvidos
- d:/repository/产品2.0/zhi2-web-admin/src/views/evaluation/surveyRelease/statistics/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/evaluation/surveyRelease/release/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/ListTemplate.js
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/listMixins.js
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/table.js
- d:/repository/产品2.0/zhi2-web-admin/src/components/ListOperationButtonContainer/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/evaluation/surveyRelease/release/detail.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/benefit/mobilePreview/components/mobileContainer.vue

## Verificação
- Sessão cursor 79d8b01e-dd31-4523-9359-f9809fc997bf; baseline de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "statistics_list_align_fix",
  "source_extraction_id": "6cf12ed8dafc4ab8be54e780e28cb271",
  "version": 1,
  "memory_type": "entities"
}
-->