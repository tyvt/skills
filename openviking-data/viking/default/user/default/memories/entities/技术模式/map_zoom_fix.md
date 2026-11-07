
# 共管小区地图缩放层级竞态修复（苏住房G）
苏住房G 项目共管小区地图（benefit/statisticsMap）缩放层级竞态修复，避免旧请求覆盖新层级数据与气泡残留。

## 改动文件
- `zhi2-web-admin/src/views/benefit/statisticsMap/index.vue`：新增 `areaLayerLoadSeq` 请求序号守卫，每次 `loadAreaComplexLayer` 递增，接口返回后若序号过期则丢弃；层级切换时（`nextMarkListLayerLevel !== markListLayerLevel`）先 `markList = []` 避免旧气泡残留；`handleMapZoomChange` 仅记录最新 zoom 并 200ms 防抖，逻辑移至 `processMapZoomChange`；`beforeDestroy` 清除 `_zoomDebounceTimer`
- `zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue`：重绘定时器修复（scheduleRedrawMar 相关）

## 项目归属
- 所属项目：苏住房G（zhi2-web-admin）
- 验证：extracted source=cursor project=苏住房G；来源会话ID 08185609-5b39-49e3-a32e-abce2cd09d68


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_zoom_fix",
  "source_extraction_id": "759fdfdefd9e43239155ff8624012ede",
  "version": 1,
  "memory_type": "entities"
}
-->