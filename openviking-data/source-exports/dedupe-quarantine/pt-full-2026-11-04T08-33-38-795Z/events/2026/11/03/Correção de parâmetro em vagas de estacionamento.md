# Summary
parkingDialog.vue omitia projectId ao chamar APIs de vaga de estacionamento, passando só parkingSpaceId. Correção: adicionado projectId: this.baseInfo.projectId em addPubParkingSpaceDetail e updatePubParkingSpaceDetail.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】新增车位未带主表projectId致缺参
【内容】parkingDialog.vue 调用新增/编辑接口时仅传 parkingSpaceId，未用 props 传入的 baseInfo.projectId。修复：addPubParkingSpaceDetail 与 updatePubParkingSpaceDetail 参数补充 projectId: this.baseInfo.projectId。
【验证证据】extracted source=cursor session=437944e8-f1a8-4cec-b025-0b79cf68765e
【涉及文件】d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubParkingSpace/components/parkingDialog.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubParkingSpace/components/parkingTable.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubParkingSpace/detail.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/api/benefit/pubParkingSpaceDetail.js ; d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubParkingSpace/components/chargeDialog.vue ; parkingDialog.vue
【来源会话ID】437944e8-f1a8-4cec-b025-0b79cf68765e
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "Correção de parâmetro em vagas de estacionamento",
  "goal": "Registrar correção de bug",
  "summary": "parkingDialog.vue omitia projectId ao chamar APIs de vaga de estacionamento, passando só parkingSpaceId. Correção: adicionado projectId: this.baseInfo.projectId em addPubParkingSpaceDetail e updatePubParkingSpaceDetail.",
  "ranges": "11-16",
  "source_extraction_id": "abbdafa94be44beeabf494cea7f50bf0",
  "version": 1,
  "memory_type": "events"
}
-->