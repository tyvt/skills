# 小区台账地图街道气泡与小区点混显修复
benefit/statisticsMap 缩放或下钻时偶发街道气泡与小区点同时显示或标记残留，需父子组件协同修复异步竞态与重绘。

## 父页 index.vue 修复
- 用 areaLayerLoadSeq 丢弃过期区域层加载结果。
- 缩放事件 200ms 防抖，拆 handleMapZoomChange/processMapZoomChange。
- 层级切换立即清空 markList 并同步 markListLayerLevel；loadAreaComplexLayer 支持 restoreOnFail；下钻前清空 markList；用 resolveOverviewLayerLevel 替代硬编码 'district'。

## 子组件 map.vue 修复
- markerRenderSig 改为全列表内容签名，列表变化必触发重绘。
- _overlayLayers 追踪所有图层，clearMarkers 统一 destroy。
- _markerRedrawSeq：markList 为空时立即清图层避免残留。

## 迁移与回归
- 从其他分支迁移须保留目标分支已有地图行为修复（如 setProgrammaticView、syncMapView 的 zoomUnchanged+panTo）避免回归。
- 回归标准：街道↔小区反复缩放不混显；下钻过渡旧气泡消失；快速滚轮无叠加；搜索定位正常。

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 验证：小区台账地图有时显示小区又显示街道，子模块 2.6.2-suzhufang 修复过迁移过来；新增 areaLayerLoadSeq；markerRenderSig 全列表签名；markList 为空立即清图层；保留惠山修复 setProgrammaticView bug3619、syncMapView zoomUnchanged+panTo bug2966。
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue
- 所属项目：惠山二期G；来源会话：73211399-9c08-4ecc-af7f-b78cecabbc2e；代码基线：341682e
- 验证证据：src=惠山二期G/007.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_layer_fix",
  "source_extraction_id": "e65d0db6f82a47e2b9b2a6cb82142971",
  "version": 2,
  "memory_type": "entities"
}
-->