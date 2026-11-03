# ReferenceError por shorthand ES6 não importado em componente
O `noticeChange/detail.vue` usava a propriedade shorthand ES6 `TransactionDetailTable` em `components` sem importar a variável, causando ReferenceError ao carregar o módulo.

## Causa raiz
- `components` de `noticeChange/detail.vue` usava `TransactionDetailTable` em shorthand ES6 sem import da variável
- O carregamento do módulo lançava ReferenceError

## Solução
- Linha 250 de `noticeChange/detail.vue` alterada para registro assíncrono lazy: `TransactionDetailTable: () => import('@/views/supervision/deposit/notice/components/TransactionDetailTable.vue')`
- Alinhado com `notice/detail.vue`, sem necessidade de import no topo

## Verificação e arquivos
- Evidência: src=苏州市房地产监测V3-leftover/115.md
- Arquivos: noticeChange/detail.vue, notice/detail.vue, TransactionDetailTable.vue
- Projeto: Suzhou Real Estate Monitoring V3; sessão: 97f8fc4b-8d6e-4425-965a-75edd085590c; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "notice_change_import",
  "source_extraction_id": "cb37c3e5026643ce8561e045e7a278a5",
  "version": 1,
  "memory_type": "entities"
}
-->