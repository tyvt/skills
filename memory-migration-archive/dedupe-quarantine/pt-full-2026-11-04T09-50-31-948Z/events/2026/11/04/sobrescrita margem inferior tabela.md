# Summary
在文件 index-new.vue 中，在 .todo-body 类里，zs-table-container--bottom-spacing 的 margin-bottom 被从 24px 覆盖为 0，以消除无分页表格下方的留白，并且 .todo-body 的 padding 被改为 10px 10px 4px 以使滚动条贴底。:deep 边框样式被合并到 .todo-body 的 deep 块中，保持 index.scss 中的全局间距不变。验证证据: portal/021.md.

# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】fact
【标题】待办表格覆写 zs-table 底部间距去留白
【内容】在 `zhi2-web-admin/src/views/home/index-new.vue` 的 `.todo-body` 中覆写 `zs-table-container--bottom-spacing` 的 `margin-bottom: 24px` 为 `0` 以消除无分页表格下方留白，并将 `.todo-body` padding 改为 `10px 10px 4px` 使滚动条贴底。原独立 `:deep` 边框样式并入 `.todo-body` deep 块，`zhi2-web-admin/src/styles/index.scss` 全局列表间距保留不变。
【验证证据】src=门户/021.md
【涉及文件】d:/repository/门户/zhi2-web-admin/src/views/home/index-new.vue ; d:/repository/门户/zhi2-web-admin/tests/e2e/portal-home-visual.spec.ts ; d:/repository/门户/zhi2-web-admin/src/components/zs-table/zs-table.vue ; d:/repository/门户/zhi2-web-admin/src/styles/index.scss ; d:/repository/门户/zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue ; d:/repository/门户/zhi2-web-admin/vite.config.js ; zhi2-web-admin/src/views/home/index-new.vue ; zhi2-web-admin/src/styles/index.scss
【来源会话ID】77d2b309-9d63-46ad-929d-1eebb91dfce1
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "sobrescrita margem inferior tabela",
  "goal": "Corrigir espaçamento tabela tarefas",
  "summary": "No arquivo index-new.vue, na classe .todo-body, a margem inferior de zs-table-container--bottom-spacing foi sobrescrita de 24px para 0 para eliminar espaço em branco em tabelas sem paginação, e o padding de .todo-body foi alterado para 10px 10px 4px para colar a barra de rolagem no fundo. O estilo de borda :deep foi mesclado no bloco deep de .todo-body, mantendo o espaçamento global em index.scss inalterado. 验证证据: portal/021.md.",
  "ranges": "0-5",
  "source_extraction_id": "6d81a1d895e74cd1bc8d8f74ecec9578",
  "version": 1,
  "memory_type": "events"
}
-->