# 共管小区地图蓝绿气泡叠层二次加固（苏住房G）
苏住房G 共管小区地图（benefit/statisticsMap）蓝绿气泡叠层二次加固，test 构建通过。

## 改动文件
- `zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue`：新增 _markerRedrawSeq 每次重绘递增、过期回调直接丢弃；空 markList 同步清图层立即 redrawMarkers（不再走 48ms 延迟）；新增 _overlayLayers 池统一登记 MultiMarker/MultiLabel，clearMarkers 全量销毁避免旧图层残留
- `zhi2-web-admin/src/views/benefit/statisticsMap/index.vue`：overviewLayerLevel 变化立即 markList=[] 并同步 markListLayerLevel（district/street）避免配色仍按旧层级算成蓝色；handleMarkClick 用 resolveOverviewLayerLevel(this.mapZoom) 替代硬编码 'district'

## 蓝色覆盖层调优
- 降低或加深蓝色覆盖层都会使分数下降，最佳仍是原覆盖层搭配 `100% 100%` 背景
- 临时 CSS 钩子已移除，先前构建状态文件确认退出码 0
- 本次尺寸变更已用构建器底层命令重新构建

## 项目归属
- 所属项目：苏住房G（zhi2-web-admin）
- 验证：extracted source=cursor project=苏住房G；来源会话ID 3c292493-fdb0-4029-9ace-2a736426ed0e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_overlay_reinforce",
  "source_extraction_id": "095756d9191943358ef72468515ecfed",
  "version": 2,
  "memory_type": "entities"
}
-->