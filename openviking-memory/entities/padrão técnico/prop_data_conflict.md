# Conflito de nome igual entre prop e data no Vue
O `zs-select-dialog.vue` declara `selectable` tanto como prop quanto como data do `@/mixins/table`, e o Vue proíbe nomes iguais, gerando aviso.

## Causa raiz
- `zs-select-dialog.vue` tem `selectable` como prop e como data de `@/mixins/table`, violando a proibição do Vue de prop e data com mesmo nome.

## Solução
- Alterar `mixins: [table]` para `mixins: [tableComponents]` para remover o data `selectable`; este registra apenas `zs-table`, `zs-select-column`, etc.

## Arquivos envolvidos
- zs-select-dialog.vue, mixins/table.js, AddOrderDialog.vue, mixins/tableComponents.js

## Validação e origem
- Evidência: src=产品2.0/072.md; Sessão: 09ed34db-94d4-41c6-856b-023f0668f865; Projeto: 产品2.0 (zhi2-web-admin)

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "prop_data_conflict",
  "source_extraction_id": "b8a6385471564bb19b6b65b0e5a5a7ee",
  "version": 1,
  "memory_type": "entities"
}
-->