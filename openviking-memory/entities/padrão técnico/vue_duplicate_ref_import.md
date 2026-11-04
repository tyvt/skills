# Import duplicado de ref em Vue
`ExpenseList.vue` apresentava import duplicado de `ref` de 'vue' gerando conflito ESLint.
## Descrição
- Ocorreu em `src/pages_owner/maintain/components/ExpenseList.vue` (projeto zhi2-mobile-shimin).
- Linhas 28 e 34 repetiam `import { ref } from 'vue'`.
## Correção
- Remover a linha 34 redundante para atender ao ESLint.
## Verificação
- Sessão cursor 82027868-3f83-446c-a0bf-5e3fec501631 documenta a mudança.
- Código base: none.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "vue_duplicate_ref_import",
  "source_extraction_id": "081ef03380ad48028e0ca8b696a67f17",
  "version": 1,
  "memory_type": "entities"
}
-->