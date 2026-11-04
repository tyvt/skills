- Em `pages_transaction/intention/my.vue`, `z-paging` deve usar `:fixed="false"` para evitar cobertura de área de busca.
- Página usa flex vertical com `100vh`; busca `flex-1 min-w-0`, botão `flex-shrink-0`.
- Corrige conflito de `w-full` e flex que causava sobreposição.
- Arquivos: `pages_transaction/buyHouse/myBuy.vue`, `pages_transaction/intention/my.vue`, `pages.json`, etc.
- Validação: sessão 31d82de8-28b1-42cc-8741-623368194dca.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "z-paging com fixed desativado",
  "source_extraction_id": "081ef03380ad48028e0ca8b696a67f17",
  "version": 1,
  "memory_type": "preferences"
}
-->