# 车标图标色按资产色兜底
园区物管2.0 中 operatingAssets.vue 车标图标色逻辑仅依赖 asset.status，status 不可用时红色单元格走默认灰色。

## 问题根因
- 车标颜色逻辑仅依赖 `asset.status`
- `status` 不可用时，`asset.color` 渲染的红色单元格走默认灰色

## 解决方案
- 在 `operatingAssets.vue` 保留原映射并新增兜底
- 按 `asset.color` 推断图标色
- `#f7cbcb` 映射 `car-red.png`

## 验证与归属
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 来源会话：b05a1c98-e264-4355-b218-abd698bfef65
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "car_icon_status_color",
  "source_extraction_id": "d913d1a6135b48b89f883365240910a1",
  "version": 1,
  "memory_type": "entities"
}
-->