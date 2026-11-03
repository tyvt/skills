# Summary
Em 2026-11-03, foi corrigido um bug em que tabelas com menos de 10 linhas de dados apresentavam espaço em branco abaixo no layout list-card. Causa raiz: shouldSparseAutoHeight em zs-table.vue era restrito ao layout de árvore de região, e algumas páginas definiam min-height em .list-card forçando expansão. Correção: adicionada a propriedade inListCard em zs-table.vue para basear shouldSparseAutoHeight em inListCard; removido min-height de .list-card nas páginas company/companyApplyAudit/index.vue para a tabela encolher conforme o conteúdo. Arquivos envolvidos: ListTemplate.js, table.js, main.js, 路由信息.json, zs-table.vue, index.scss, AppMain.vue, layout/index.vue. Evidência: 苏州市房地产监测V3-rest/002.md. ID de sessão de origem: deee3f49-3c02-4d81-a251-d57518e4e866.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】list-card内表格少数据未收缩致空白
【内容】zs-table.vue中shouldSparseAutoHeight仅限区域树布局，且部分页面.list-card设min-height强制撑开，致表格数据少于10行时下方空白。修复：zs-table.vue新增inListCard属性使shouldSparseAutoHeight基于inListCard，并移除company/companyApplyAudit/index.vue等页面.list-card的min-height，表格按内容收缩。
【验证证据】src=苏州市房地产监测V3-rest/002.md
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/ListTemplate.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/table.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/main.js ; d:/repository/苏州市房地产监测V3/路由信息.json ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/zs-table/zs-table.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/styles/index.scss ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/layout/components/AppMain.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/layout/index.vue
【来源会话ID】deee3f49-3c02-4d81-a251-d57518e4e866
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "Correção de espaço vazio em tabela list-card",
  "goal": "Corrigir encolhimento de tabela",
  "summary": "Em 2026-11-03, foi corrigido um bug em que tabelas com menos de 10 linhas de dados apresentavam espaço em branco abaixo no layout list-card. Causa raiz: shouldSparseAutoHeight em zs-table.vue era restrito ao layout de árvore de região, e algumas páginas definiam min-height em .list-card forçando expansão. Correção: adicionada a propriedade inListCard em zs-table.vue para basear shouldSparseAutoHeight em inListCard; removido min-height de .list-card nas páginas company/companyApplyAudit/index.vue para a tabela encolher conforme o conteúdo. Arquivos envolvidos: ListTemplate.js, table.js, main.js, 路由信息.json, zs-table.vue, index.scss, AppMain.vue, layout/index.vue. Evidência: 苏州市房地产监测V3-rest/002.md. ID de sessão de origem: deee3f49-3c02-4d81-a251-d57518e4e866.",
  "ranges": "0-6",
  "source_extraction_id": "772b51dcf2dd4e5b954bbf2076058ae6",
  "version": 1,
  "memory_type": "events"
}
-->