# Summary
O componente OperationBtnGroup usava this.$router.go(-1) sem backUrl, voltando no histórico do navegador em vez da lista correspondente. Foi corrigido para alinhar ao mixin goBack de main.js, derivando a lista da rota atual, fechando a aba e usando router.push com query type:'back'.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】返回逻辑误用go(-1)致列表页跳转错误
【内容】OperationBtnGroup 无 backUrl 时调用 this.$router.go(-1) 回退浏览器历史，未返回对应列表页。修复：对齐 main.js 的 goBack mixin，无 backUrl 时从当前路径推导列表页，关闭标签页并 router.push 带 query:{type:'back'}。
【验证证据】extracted source=cursor session=119bbc7f-9ba6-43c3-ab43-ee84486668e7
【涉及文件】d:/repository/园区公共收益/zhi2-web-admin/src/components/OperationBtnGroup/index.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/main.js ; d:/repository/园区公共收益/zhi2-web-admin/src/views/building/building/detail.vue ; router.go ; main.js
【来源会话ID】119bbc7f-9ba6-43c3-ab43-ee84486668e7
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "Correção de navegação em OperationBtnGroup",
  "goal": "Registrar correção de bug",
  "summary": "O componente OperationBtnGroup usava this.$router.go(-1) sem backUrl, voltando no histórico do navegador em vez da lista correspondente. Foi corrigido para alinhar ao mixin goBack de main.js, derivando a lista da rota atual, fechando a aba e usando router.push com query type:'back'.",
  "ranges": "0-3",
  "source_extraction_id": "abbdafa94be44beeabf494cea7f50bf0",
  "version": 1,
  "memory_type": "events"
}
-->