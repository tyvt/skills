# Summary
No modo de edição, UnitDialog.vue não recebia landPlotCode da API, falhando validação de campo obrigatório. Correção: usar props do detalhe do edifício pai como fallback para preencher landPlotCode.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】单元编辑宗地号未回填致保存校验失败
【内容】UnitDialog.vue 编辑模式 loadDetail 拉取单元接口未返回 landPlotCode，必填禁用项无值无法通过校验。修复：接口无返回时用父级楼幢详情传入的 props 兜底回填 landPlotCode。
【验证证据】extracted source=cursor session=58c42470-0a56-48e2-b742-8856a4d7ae99
【涉及文件】d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/UnitDialog.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/components/unitTable.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/detail.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/api/lpgl/unitinfo.js ; UnitDialog.vue
【来源会话ID】58c42470-0a56-48e2-b742-8856a4d7ae99
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "Correção de validação de landPlotCode em UnitDialog",
  "goal": "Registrar correção de bug",
  "summary": "No modo de edição, UnitDialog.vue não recebia landPlotCode da API, falhando validação de campo obrigatório. Correção: usar props do detalhe do edifício pai como fallback para preencher landPlotCode.",
  "ranges": "17-20",
  "source_extraction_id": "abbdafa94be44beeabf494cea7f50bf0",
  "version": 1,
  "memory_type": "events"
}
-->