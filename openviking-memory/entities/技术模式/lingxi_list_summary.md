# Página de vinculação LingXi baseada em lista e menu dinâmico
A página property/userStatistics/index.vue usa lista GET e resumo, com menu dinâmico do backend.

## Comportamento
- Lista chama GET /property/userStatistics/list; resumo inferior chama /property/userStatistics/summary.
- Menu é emitido dinamicamente pelo backend; requer configuração de caminho de componente e permissão.

## Configuração necessária
- Componente: property/userStatistics/index
- Permissão: property:userStatistics:list

## Arquivos envolvidos
- property/userStatistics/index.vue
- property/ctUserIdentityApply/index.vue
- maintenance/accountQuery/index.vue
- mixins/listMixins.js, table.js, ListTemplate.js, area.js
- property/syncObligee/index.vue
- property/complex/index.vue

## 验证与归属
- 验证证据: sessão cursor 6db21291-c1ac-4c3b-921b-5f99e82885a2
- Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lingxi_list_summary",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 1,
  "memory_type": "entities"
}
-->