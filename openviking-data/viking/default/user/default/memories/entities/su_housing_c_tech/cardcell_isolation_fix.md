
# 决策详情页CardCell样式隔离致空白修复
苏住房C 决策详情页 `pages_vote/decision/detail` 因小程序分包 + 组件样式隔离导致标签不渲染，已修复。

## 问题根因
- 不是数据结构问题，而是小程序分包 + 组件样式隔离
- `CardCell` 在 `pages_vote` 分包里样式被隔离，标签（编号、业务类型、决策主题…）渲染不出来，页面只剩值，像裸文字加大段空白

## 修复要点
- 去掉 `CardCell` 组件，在页面内直接写与生产版相同的 DOM 结构
- 样式写在当前页（`styleIsolation: shared`），确保标签、分割线、左右对齐都生效
- 合并为一张卡片：渐变头部 + 字段区在同一张白卡内，与生产版一致
- 保留底部按钮区的留白和全宽按钮样式

## 涉及文件
- src/pages.json
- src/pages_vote/decision/detail.vue
- src/pages_vote/decision/components/DetailTopCard.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：f7c75f86-93d3-413f-b2a8-5162c9c21849；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "cardcell_isolation_fix",
  "source_extraction_id": "81e24c7fac0540d9acc9252dc29ce269",
  "version": 1,
  "memory_type": "entities"
}
-->