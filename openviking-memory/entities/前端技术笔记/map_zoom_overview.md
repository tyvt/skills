# Map组件缩放监听误触概览显示
Map组件监听地图zoom_changed事件并emit clickMark/hoverMark false，导致搜索引发缩放变动时误触发概览内容显示。

## 问题根因
- src/components/Map/index.vue 监听地图 zoom_changed 事件
- 监听回调内 emit clickMark/hoverMark 为 false
- 搜索操作引发缩放级别变动，间接触发 overview-content 显示
- 父组件 src/views/benefit/statisticsMap/index.vue 中 @clickMark 绑定 showOverviewContent
- showOverviewContent 原仅接收 menu 参数并无条件将 contentVisible 设为 true，导致传入 false 也被当作点击标记处理而打开抽屉

## 解决方案
- 在 statisticsMap/index.vue 的 showOverviewContent 中增加参数判断，仅当参数为 true 时才设 contentVisible 为 true
- 保留 Map 组件 zoom_changed 监听逻辑，父组件不再误响应 false 而打开概览

## 验证与归属
- 验证：会话 0c978c4d-3266-400e-856a-6b12b6446659 中搜索导致概览异常显示
- 涉及文件：src/components/Map/index.vue、src/views/benefit/statisticsMap/index.vue
- 来源会话ID：0c978c4d-3266-400e-856a-6b12b6446659
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "map_zoom_overview",
  "source_extraction_id": "aaadbf8ca9be4ccba8e374a3527b183d",
  "version": 2,
  "memory_type": "entities"
}
-->