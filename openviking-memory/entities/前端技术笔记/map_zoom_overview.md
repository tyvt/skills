# Map组件缩放监听误触概览显示
Map组件监听地图zoom_changed事件并emit clickMark/hoverMark false，导致搜索引发缩放变动时误触发概览内容显示。

## 问题根因
- src/components/Map/index.vue 监听地图 zoom_changed 事件
- 监听回调内 emit clickMark/hoverMark 为 false
- 搜索操作引发缩放级别变动，间接触发 overview-content 显示

## 解决方案
- 审查 zoom_changed 监听逻辑，避免搜索缩放联动误 emit 关闭标记
- 区分用户主动交互与程序缩放变动的触发来源

## 验证与归属
- 验证：会话 0c978c4d-3266-400e-856a-6b12b6446659 中搜索导致概览异常显示
- 涉及文件：src/components/Map/index.vue
- 来源会话ID：0c978c4d-3266-400e-856a-6b12b6446659
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "map_zoom_overview",
  "source_extraction_id": "f9ec5b11ea454e45917b012e0977c33f",
  "version": 1,
  "memory_type": "entities"
}
-->