# Summary
In contracts.vue, parent scoped styles failed to penetrate the base-card child component root, causing card spacing to not apply. Fixed by using :deep() to set margin-top: 10px on .contract_card_item and .fee_card_item.
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】bug
【标题】scoped样式不穿透子组件根节点致间距失效
【内容】`contracts.vue` 中父页面 scoped 样式无法穿透 `base-card` 子组件根节点，致卡片间距未生效。使用 `:deep()` 穿透 scoped，对 `.contract_card_item` 与 `.fee_card_item` 设置 `margin-top: 10px` 修复。
【验证证据】src=苏住房C/072.md
【涉及文件】d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/company/info/contracts.vue ; d:/repository/苏住房C/zhi2-mobile-shimin/src/components/commonNew/baseCard.vue ; d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/company/info/index.vue ; d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/community/info/index.vue ; d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/maintain/info.vue ; d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/company/housekeeper/detail.vue ; contracts.vue
【来源会话ID】9fcef1ba-4f8b-422b-b728-7de7e7801513
【代码基线】none

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "event_name": "deep_style_fix",
  "goal": "Fix scoped style spacing",
  "summary": "In contracts.vue, parent scoped styles failed to penetrate the base-card child component root, causing card spacing to not apply. Fixed by using :deep() to set margin-top: 10px on .contract_card_item and .fee_card_item.",
  "ranges": "12-16",
  "source_extraction_id": "1f9551ad6bc2466fbbeb54613828c3ca",
  "version": 1,
  "memory_type": "events"
}
-->
