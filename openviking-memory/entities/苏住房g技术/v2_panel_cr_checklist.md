# 首页V2卡片面板Code Review存量缺陷清单
苏住房G首页V2聚合卡片门户做整体review时反复出现的五类问题，可直接当检查清单并按CRITICAL/HIGH/MEDIUM分级。
## 缺陷清单
- 附件/消息跳转URL未校验：downloadStudy对attachmentUrl直接window.open，openTodoItem把msgUrl直喂router.push，需scheme白名单(仅http/https/同源)且外链走window.open内链走router。
- 字典与消息列表竞态：initTodoDict异步拉busCodeOptions，created阶段loadTodoPanelList可能先跑完，消息Tab首屏dictFormatter渲染原始busCode，需字典就绪后拉列表或更新后重刷。
- computed遗留console.log（如CheckDataNav的progressPct）生产刷屏，需清除。
- :key不稳定：StudyPanel的v-for用pickId可能undefined，需归一化稳定id或id??`${type}-${index}`；KeyDataNav嵌套v-for用bi/ri下标作key需改稳定字段。
- PublicBenefit的watch仅深度监听data.accountStruct，图表静默更新不重绘，应把data.chart一起纳入。
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话a6d1b5a7 review结论HIGH 2、MEDIUM 5，Verdict: BLOCK。
- 涉及文件：index-v2.vue、CheckDataNav.vue、KeyDataNav.vue、PublicBenefit.vue、StudyPanel.vue、studyDataMap.js
- 所属项目：苏住房G；来源会话：a6d1b5a7-1983-49a4-8898-bb4bc9230465；代码基线：315702f

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "v2_panel_cr_checklist",
  "source_extraction_id": "53dcdef5796c422395b4454bfc7226df",
  "version": 1,
  "memory_type": "entities"
}
-->