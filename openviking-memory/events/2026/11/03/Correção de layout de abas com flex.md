# Summary
Causa raiz: zs-tabs com flex:1 ocupava altura restante do viewport, elevando tabs-content e causando espaço em branco abaixo da tabela com poucas linhas. Corrigido alterando zs-tabs/tabs-content para flex:0 1 auto, detail-container com overflow-y:auto e padding-bottom, e detail-from-container sem rolagem interna nem padding-bottom extra (mantendo gap).
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】Tab卡片 flex:1 占满高度致表格下方留白
【内容】根因：`detail-from-container` 同级 `zs-tabs` 设 `flex:1` 占满视口剩余高度，`tabs-content` 拉高，子表行少致表格下方留白。`index.scss` 中将 `zs-tabs`/`tabs-content` 改 `flex:0 1 auto` 随内容收缩；`detail-container` 改整页 `overflow-y:auto` 并补 `padding-bottom`，`detail-from-container` 去内滚与多余 `padding-bottom` 保留 `gap`。
【验证证据】src=苏州市房地产监测V3-rest/023.md
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/detail-template/detail-template.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/layout/components/AppMain.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/styles/index.scss ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/buildinginfo/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/Headline/index.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/zs-table/zs-table.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/customerProject/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/styles/element-ui.scss
【来源会话ID】303fa1b4-adea-4dbe-901f-c5565f43cc2a
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "Correção de layout de abas com flex",
  "goal": "Corrigir espaço em branco",
  "summary": "Causa raiz: zs-tabs com flex:1 ocupava altura restante do viewport, elevando tabs-content e causando espaço em branco abaixo da tabela com poucas linhas. Corrigido alterando zs-tabs/tabs-content para flex:0 1 auto, detail-container com overflow-y:auto e padding-bottom, e detail-from-container sem rolagem interna nem padding-bottom extra (mantendo gap).",
  "ranges": "19-26",
  "source_extraction_id": "19524133521643418bfe9ac26320305a",
  "version": 1,
  "memory_type": "events"
}
-->