# Summary
在 2026-11-03，修复了一个 bug，其中数据行数少于 10 行的表格在 list-card 布局下方出现空白。根本原因：zs-table.vue 中的 shouldSparseAutoHeight 仅限于区域树布局，并且某些页面在 .list-card 中定义了 min-height 强制展开。修复：在 zs-table.vue 中添加了 inListCard 属性，使 shouldSparseAutoHeight 基于 inListCard；移除了 company/companyApplyAudit/index.vue 页面中 .list-card 的 min-height，使表格根据内容收缩。涉及文件：ListTemplate.js, table.js, main.js, 路由信息.json, zs-table.vue, index.scss, AppMain.vue, layout/index.vue. 验证证据: 苏州市房地产监测V3-rest/002.md. 来源会话 ID: deee3f49-3c02-4d81-a251-d57518e4e866.

# 2026-11-03 (星期二) ChatLog:
**user**: 【记忆类型】bug
【标题】list-card内表格少数据未收缩致空白
【内容】zs-table.vue中shouldSparseAutoHeight仅限区域树布局，且部分页面.list-card设min-height强制撑开，致表格数据少于10行时下方空白。修复：zs-table.vue新增inListCard属性使shouldSparseAutoHeight基于inListCard，并移除company/companyApplyAudit/index.vue等页面.list-card的min-height，表格按内容收缩。
【验证证据】src=苏州市房地产监测V3-rest/002.md
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/ListTemplate.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/table.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/main.js ; d:/repository/苏州市房地产监测V3/路由信息.json ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/zs-table/zs-table.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/styles/index.scss ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/layout/components/AppMain.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/layout/index.vue
【来源会话ID】deee3f49-3c02-4d81-a251-d57518e4e866
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "修复 list-card 表格中的空白",
  "goal": "Corrigir encolhimento de tabela",
  "summary": "",
  "ranges": "0-6",
  "source_extraction_id": "772b51dcf2dd4e5b954bbf2076058ae6",
  "version": 1,
  "memory_type": "events"
}
-->