# Summary
Em 2026-11-03, foi adicionado um botão 【同步房屋】 (sincronizar imóvel) à direita da barra de título '房屋信息' (informações do imóvel) em houseTable.vue do projeto 园区公共收益 (zhi2-web-admin). O clique chama POST /building/building/importHouseByBuildingCode passando buildingId para atualizar a lista. O identificador de permissão do botão é building:building:synchronizeHouse, que precisa ser configurado no backend.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】房屋信息区右侧新增同步房屋按钮调导入接口
【内容】在 zhi2-web-admin/src/views/building/building/components/houseTable.vue 的「房屋信息」标题栏右侧新增【同步房屋】按钮，点击调用 POST /building/building/importHouseByBuildingCode 传 buildingId 刷新列表。按钮权限标识为 building:building:synchronizeHouse，需后台配置。
【验证证据】extracted source=cursor session=41b55088-8b1f-425d-947d-96448d09b77e
【涉及文件】d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/detail.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/houseTable.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/mixins/subTableMixins.js ; d:/repository/园区公共收益/zhi2-web-admin/src/mixins/table.js ; d:/repository/园区公共收益/zhi2-web-admin/src/mixins/permsMixins.js ; zhi2-web-admin/src/views/building/building/components/houseTable.vue
【来源会话ID】41b55088-8b1f-425d-947d-96448d09b77e
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "adição de botão sincronizar imóvel",
  "goal": "registrar recurso de sincronização",
  "summary": "Em 2026-11-03, foi adicionado um botão 【同步房屋】 (sincronizar imóvel) à direita da barra de título '房屋信息' (informações do imóvel) em houseTable.vue do projeto 园区公共收益 (zhi2-web-admin). O clique chama POST /building/building/importHouseByBuildingCode passando buildingId para atualizar a lista. O identificador de permissão do botão é building:building:synchronizeHouse, que precisa ser configurado no backend.",
  "ranges": "20-25",
  "source_extraction_id": "bd4b0a8c2e31430396eca479ecc7d5f4",
  "version": 1,
  "memory_type": "events"
}
-->