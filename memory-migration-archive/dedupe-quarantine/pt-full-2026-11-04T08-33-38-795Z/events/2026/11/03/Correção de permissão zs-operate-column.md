# Summary
Em 2026-11-03, em `institutionRegister/index.vue` o array `permission` de `zs-button` estava mal aplicado em `zs-operate-column`, falhando na concatenação. Alterado para `permission: true, permissionType: 'query'` porque `zs-operate-column` usa `permission` booleano e `permissionType` como sufixo.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】zs-operate-column的permission
【内容】`institutionRegister/index.vue` 将 `zs-button` 的 `permission` 数组格式误用于 `zs-operate-column` 致权限拼接失败。`zs-operate-column` 中 `permission` 为布尔开关、`permissionType` 为权限后缀，已改为 `permission: true, permissionType: 'query'`。
【验证证据】src=苏州市房地产监测V3-rest/013.md
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/institutionRegister/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/OperationBtnGroup/index.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/store/modules/permission.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/main.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/permission.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyRecordAgency/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/benefit/pubHousePart/detail.vue
【来源会话ID】9447b65e-b578-472f-8b57-02017d4e9fea
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "Correção de permissão zs-operate-column",
  "goal": "Corrigir concatenação de permissão",
  "summary": "Em 2026-11-03, em `institutionRegister/index.vue` o array `permission` de `zs-button` estava mal aplicado em `zs-operate-column`, falhando na concatenação. Alterado para `permission: true, permissionType: 'query'` porque `zs-operate-column` usa `permission` booleano e `permissionType` como sufixo.",
  "ranges": "16-22",
  "source_extraction_id": "714112251c1e4d518ef39926220c4c7e",
  "version": 1,
  "memory_type": "events"
}
-->