# Listagem envolve tabela e paginação com list-card
Seguindo ListTemplate.js, as páginas de lista usam `<div class="list-card">` para envolver área de operação + tabela + paginação (busca fora).

## 描述
- 137 arquivos index.vue aplicam a estrutura com `<div class="list-card">` envolvendo operação + tabela + paginação.
- A busca fica fora do list-card.

## Implementação
- O script `zhi2-web-admin/scripts/wrap-list-card.mjs` pega o último `</template>` antes de `<script>`.
- Fecha automaticamente `zs-pagination` pela tag de fechamento mais posterior, com negative lookahead para não confundir com `</zs-table-column>`.

## Arquivos e origem
- 涉及文件: ListTemplate.js; scripts/wrap-list-card.mjs; diversos index.vue (property/serviceItem, building/unit, article/components, benefit/pubManagementOrg, property/bankReceiptApply, property/complex, building/building).
- 验证证据: cursor session=2a132670-9deb-4220-9d16-a2853aa45068.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_card_wrap",
  "source_extraction_id": "569b09638b2b4de39d502b43e3f6f15e",
  "version": 1,
  "memory_type": "entities"
}
-->