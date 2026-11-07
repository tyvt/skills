# 二手房列表页UI间距与名称折行修复
苏住房C 二手房列表页 `stockHouse` 与 `houseCard` 的间距及名称折行未按设计处理，已在 cursor 会话 2f565b3c 修复。

## 问题根因
- `stockHouse/index.vue` 的 `tab-line` 缺少底部间距，列表页左右内边距不规范
- `houseCard.vue` 的 `.house-name` 受 `max-width` 限制且未防拆行，中文被提前折行

## 修复要点
- `stockHouse/index.vue` 的 `tab-line` 增加 `marginBottom: '12px'`，`stock-house` 左右内边距调为 `12px`
- `houseCard.vue` 的 `.house-name` 移除 `max-width` 限制并加 `word-break: keep-all` 防止中文拆行

## 涉及文件
- src/pages_transaction/stockHouse/index.vue
- src/pages_tab/components/Project_Suzhufang.vue
- src/components/commonNew/houseCard.vue
- src/components/commonNew/tabLine.vue
- src/pages_tab/components/menu/ProjectTabBar.vue
- src/pages_transaction/components/conditionScreening/conditionScreening.vue

## 验证与归属
- 验证证据：extracted source=cursor session=2f565b3c-4c6d-49db-b019-1fd53eb902b3
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stockhouse_spacing_fix",
  "source_extraction_id": "d87d02d750784fd08f483b63d35a6981",
  "version": 1,
  "memory_type": "entities"
}
-->