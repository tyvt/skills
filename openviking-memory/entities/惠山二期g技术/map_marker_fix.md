# 小区台账地图标记混显修复
惠山二期G 项目小区台账地图标记混显修复已迁移完成，改动 2 个文件（+95/-27 行）。

## 修改文件
- zhi2-web-admin/src/views/benefit/statisticsMap/index.vue
- zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue

## 关键改动
- index.vue 新增 areaLayerLoadSeq 防止异步请求竞态；缩放事件加 200ms 防抖，拆分为 handleMapZoomChange 与 processMapZoomChange
- 层级切换立即清空 markList 并同步 markListLayerLevel；loadAreaComplexLayer 支持 restoreOnFail，失败时回退父级
- 下钻前清空 markList，用 resolveOverviewLayerLevel 替代硬编码 'district'
- map.vue 将 markerRenderSig 改为全列表签名确保内容变化触发重绘；新增 _overlayLayers 追踪所有图层，clearMarkers 统一销毁
- 新增 _markerRedrawSeq 用于重绘序列控制

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 所属项目：惠山二期G；来源会话：73211399-9c08-4ecc-af7f-b78cecabbc2e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "map_marker_fix",
  "source_extraction_id": "3dbc8c42edae4e499a4f6a25469a070a",
  "version": 1,
  "memory_type": "entities"
}
-->