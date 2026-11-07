# scoped 样式不穿透子组件根节点致间距失效
苏住房C 移动端 `contracts.vue` 父页面 scoped 样式无法穿透 `base-card` 子组件根节点，已用 `:deep()` 修复。

## 问题根因
- `contracts.vue` 中父页面 scoped 样式无法穿透 `base-card` 子组件根节点，致卡片间距未生效

## 修复要点
- 使用 `:deep()` 穿透 scoped
- 对 `.contract_card_item` 与 `.fee_card_item` 设置 `margin-top: 10px` 修复

## 涉及文件
- src/pages_owner/company/info/contracts.vue
- src/components/commonNew/baseCard.vue
- src/pages_owner/company/info/index.vue
- src/pages_owner/community/info/index.vue
- src/pages_owner/maintain/info.vue
- src/pages_owner/company/housekeeper/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：src=苏住房C/072.md
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：9fcef1ba-4f8b-422b-b728-7de7e7801513

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scoped_deep_fix",
  "source_extraction_id": "792ac32c904246d5a8d095eccd5645e4",
  "version": 1,
  "memory_type": "entities"
}
-->