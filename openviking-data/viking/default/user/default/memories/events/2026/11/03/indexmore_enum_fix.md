# Summary
indexMore.vue called listRecommendProject with URL type directly as halfYearAgo, but backend enum for latest property is 2, causing empty data. Added HALF_YEAR_AGO_MAP in indexMore.vue to map page type to correct API param. Source session 86696cb3-e77a-4306-8d93-2aa391d79f46.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】fact
【标题】最新楼盘页type未转枚举致接口空数据
【内容】indexMore.vue 调用 listRecommendProject 时将 URL type 直接作为 halfYearAgo，但后端枚举最新楼盘为2，导致返回空数据。已在 indexMore.vue 增加 HALF_YEAR_AGO_MAP 将页面 type 映射为正确接口参数。
【验证证据】src=苏住房C/042.md
【涉及文件】d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/newHouse/index.vue ; d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/newHouse/indexMore.vue ; d:/repository/苏住房C/zhi2-mobile-shimin/src/api/transaction.js ; d:/repository/苏住房C/zhi2-mobile-shimin/src/hooks/usePaging.js ; d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/redirect/index.vue ; d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/menuRouteMap.js ; d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/components/Home_Suzhufang.vue ; d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_tab/components/Home_Suzhufang.vue
【来源会话ID】86696cb3-e77a-4306-8d93-2aa391d79f46
【代码基线】none

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "event_name": "indexmore_enum_fix",
  "goal": "Record enum mapping fix",
  "summary": "indexMore.vue called listRecommendProject with URL type directly as halfYearAgo, but backend enum for latest property is 2, causing empty data. Added HALF_YEAR_AGO_MAP in indexMore.vue to map page type to correct API param. Source session 86696cb3-e77a-4306-8d93-2aa391d79f46.",
  "ranges": "17-22",
  "source_extraction_id": "1198c13d69754632813bd8ca344722ae",
  "version": 1,
  "memory_type": "events"
}
-->
