# Summary
Após atribuir ou excluir imóveis, apenas unitTable chamava getList, deixando houseTable sem atualizar. Correção: HouseScopeDialog passou a ouvir update e disparar refresh; unitTable emite evento refresh-house; detail.vue ouve e chama houseTable.getList().
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】分配房屋后房屋列表未刷新因事件断链
【内容】分配/删除房屋仅 unitTable 调 getList，houseTable 未重新请求接口。修复：HouseScopeDialog 监听 update 触发 refresh，unitTable 发 refresh-house 事件，detail.vue 监听后调 houseTable.getList() 刷新。
【验证证据】extracted source=cursor session=df0fe2ed-a8b0-4936-844e-a31bac399490
【涉及文件】d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/unitTable.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/house/index.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/detail.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/houseTable.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/HouseScopeDialog.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/unit/components/HouseScopeTable.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/unit/detail.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/complexSearch/detail.vue
【来源会话ID】df0fe2ed-a8b0-4936-844e-a31bac399490
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "Correção de atualização de lista de imóveis",
  "goal": "Registrar correção de bug",
  "summary": "Após atribuir ou excluir imóveis, apenas unitTable chamava getList, deixando houseTable sem atualizar. Correção: HouseScopeDialog passou a ouvir update e disparar refresh; unitTable emite evento refresh-house; detail.vue ouve e chama houseTable.getList().",
  "ranges": "4-10",
  "source_extraction_id": "abbdafa94be44beeabf494cea7f50bf0",
  "version": 1,
  "memory_type": "events"
}
-->