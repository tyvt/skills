# Summary
As interfaces /building/houseLimit/page e pageHouseLimitAll retornam lista dentro de data; o código anterior lia res.rows/res.total resultando em undefined e tabela vazia. loadRecords() em houseLimit/detail.vue passou a usar parseHouseLimitPageResult(res) compartilhado.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】分页接口列表嵌 data 硬取 rows 致表格空白
【内容】/building/houseLimit/page 与 pageHouseLimitAll 接口实际响应列表置于 data 中，原代码硬取 res.rows/res.total 得 undefined 致表格空白。zhi2-web-admin/src/views/building/houseLimit/detail.vue 的 loadRecords() 改用共享解析 parseHouseLimitPageResult(res)。
【验证证据】src=苏州市房地产监测V3-rest/111.md
【涉及文件】D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/building/houseLimit/detail.vue ; D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/building/houseLimit/houseLimitConstants.js ; D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/building/houseLimit/components/LimitRecordSelectDialog.vue ; D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/main.js ; D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/index.js ; D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/request.js ; D:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/building/house-limit-real-api-flow.spec.js ; D:/repository/苏州市房地产监测V3/zhi2-web-admin/playwright.config.js
【来源会话ID】a5b234e2-7ed5-4ce3-a362-c4c694f6b33c
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "correcao_tabela_paginacao_vazia",
  "goal": "Corrigir bug tabela",
  "summary": "As interfaces /building/houseLimit/page e pageHouseLimitAll retornam lista dentro de data; o código anterior lia res.rows/res.total resultando em undefined e tabela vazia. loadRecords() em houseLimit/detail.vue passou a usar parseHouseLimitPageResult(res) compartilhado.",
  "ranges": "15-22",
  "source_extraction_id": "7d93cb8ae368422f9c4b1c74a757c166",
  "version": 1,
  "memory_type": "events"
}
-->