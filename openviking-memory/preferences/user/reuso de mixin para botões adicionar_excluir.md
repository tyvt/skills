- Em páginas de negócio, o botão adicionar remove a implementação customizada e reusa o `addButton` do mixin, mapeando permissão via `extraPerms` (ex.: `company:agencyBranch:edit`).
- A exclusão em lote reusa `multiDeleteButton` do mixin; a coluna de seleção `selectable='isSelectable'` limita `recordState==='0'` como selecionável; `deleteRequest` chama em paralelo a interface de ID único; exclusão inline e em lote compartilham `handleDelete`.
- `handleQuery`/`resetQuery` duplicados são removidos, usando a implementação padrão do mixin; `showButton` controla a visibilidade do botão de edição.
- Verificação: src=苏州市房地产监测V3-rest/124.md; arquivos: AgencyBranchList.vue, order/index.vue, chargeItem/index.vue, listMixins.js, table.js, permsMixins.js, AgencyBranchDetail.vue, agencyBranch.js; sessão b02c7339-410a-4155-9af2-1dd4826ef29d

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Reuso de mixin para botões adicionar/excluir",
  "source_extraction_id": "dde3fbc9f6c8407fb1b50b1438772b93",
  "version": 1,
  "memory_type": "preferences"
}
-->