# 新房列表页布局筛选栏吸顶修复
苏住房C 新房列表页(newHouse/index.vue)修复 z-paging 全屏 fixed 导致列表遮挡导航栏、筛选栏吸顶失效的问题。

## 问题原因
- z-paging 默认 `fixed: true`，以全屏固定定位从页面顶部(`top: 0`)铺开
- 列表遮挡顶部导航栏「新房」标题栏
- 筛选栏 `position: sticky` 失效，因其不在同一滚动上下文

## 修复方案
- 给 z-paging 设置 `:fixed="false"`，避免全屏覆盖
- 页面容器使用 `flex` 纵向布局 + `height: 100vh`
- 列表区域 `flex: 1; min-height: 0`，只在剩余空间内滚动
- 对齐二手房页(`stockHouse/index.vue`)布局方式

## 修复结果
- 搜索框 → 快捷入口 → 筛选栏固定在顶部，列表在下方独立滚动
- 「最新楼盘」「在售楼盘」等子页面若有同类问题可按此方式调整

## 验证与归属
- 涉及文件：newHouse/index.vue、stockHouse/index.vue、conditionScreening.vue、pages.js
- 验证证据：extracted source=cursor project=苏住房C；来源会话ID：3346e472-72e7-4a7c-857b-e8e4f61316e0

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_layout_fix",
  "source_extraction_id": "b9576b83830643c7a838f2b915795c6c",
  "version": 1,
  "memory_type": "entities"
}
-->