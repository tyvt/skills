# Summary
Em 2026-11-03, o usuário corrigiu o dicionário de 'current status' de `job_status` para `sys_normal_disable` em `detail.vue` e `index.vue` dos módulos ownerCommitteeWorker e propertyWorker, usando `el-radio-group` com default `status:'0'` e removendo conversão `String()` desnecessária.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】fact
【标题】组织详情当前状态误用job_status字典不匹配
【内容】「当前状态」误用 `job_status` 字典而非 `sys_normal_disable`，导致 `"0"` 无法匹配原样显示。 `detail.vue` 与 `index.vue` 字典改为 `sys_normal_disable`，编辑态用 `el-radio-group`，默认值 `status:'0'`，移除多余 `String()` 转换。
【验证证据】extracted source=cursor session=1e42f919-9755-4602-9b5f-c64546ba5da0
【涉及文件】d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/ownerCommitteeWorker/workerDeptTable.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/ownerCommitteeWorker/detail.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/ownerCommitteeWorker/index.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/property/propertyWorker/detail.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/components/detail-template/detail-template.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/property/propertyManager/detail.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/components/dict-tag/dict-tag.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/property/buildingManager/detail.vue
【来源会话ID】1e42f919-9755-4602-9b5f-c64546ba5da0

<!-- MEMORY_FIELDS
{
  "event_name": "Correção dicionário status trabalhador",
  "goal": "Corrigir dicionário status",
  "summary": "Em 2026-11-03, o usuário corrigiu o dicionário de 'current status' de `job_status` para `sys_normal_disable` em `detail.vue` e `index.vue` dos módulos ownerCommitteeWorker e propertyWorker, usando `el-radio-group` com default `status:'0'` e removendo conversão `String()` desnecessária.",
  "ranges": "6-12",
  "source_extraction_id": "3227bb6e122946bcad3020c0c46e6188",
  "version": 1,
  "memory_type": "events"
}
-->