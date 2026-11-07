# 地图下钻接口错乱两类根因
GIS 地图从街道下钻到物业管理区域时接口参数和数据错乱，根因为遗留重复请求 + zoom 动画误触发回退两类叠加。

## 问题根因
- loadAreaComplexLayer 在正确请求 selectOptionalComplexList 并写 markList 后，遗留代码又无条件调了一次 selectAreaComplexNumList（dimension:1 行政区聚合），把项目点位覆盖成聚合气泡
- 下钻会程序化改 zoom，地图 zoom_changed 事件进入 handleMapZoomChange，动画过程中 zoom 短暂低于阈值（OVERVIEW_STREET_MIN 11.1）会误触发「退回概览」，把刚压入的下钻栈 areaDrillStack 弹掉，导致后续请求参数错乱

## 解决方案
- 排查地图下钻接口错乱时先 grep 加载函数里是否有重复/遗留的第二次请求
- 程序化改 zoom 必须加 drillInProgress 标志（下钻点击期间忽略 zoom 回退逻辑）
- programmaticViewGuard 时长要覆盖 zoom 动画（本项目从 450ms 延长到 900ms），否则守护窗口短于动画时长就会误触发回退

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 ae57812c 删除重复调用 AREA_COMPLEX_NUM_API 的遗留代码并加 drillInProgress + 900ms 守护后，下钻只发一次正确请求
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue；zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue
- 所属项目：园区物管2.0；代码基线：3965548b6；来源会话：ae57812c-b3cb-4223-9f82-106d7065e69c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_drill_chaos",
  "source_extraction_id": "045a65d55d4b439cb1758c87ddea6f9a",
  "version": 1,
  "memory_type": "entities"
}
-->