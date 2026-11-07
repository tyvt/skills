# 地图组件深度监听markList重绘
自封装 Map 组件需 watch markList 深度重绘 marker，并映射后端经纬度字段。

## 问题根因
- Map 组件若不监听 markList，外部数据更新后点位不刷新。
- 后端经纬度字段常为 lng/lat，而地图组件需要 longitude/latitude。

## 解决方案
- Map 组件 watch markList(deep) 清理旧 MultiMarker/MultiLabel 并按最新列表重绘。
- 页面里统一将 lng/lat 映射为 longitude/latitude 再传入地图组件。

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 验证证据：009.md 会话 fbdf2d00/e9da2cc8（Map markList watch 重绘 + lng/lat 映射）。
- 涉及文件：src/components/Map/index.vue、src/views/benefit/statisticsMap/index.vue。
- 来源会话ID：fbdf2d00-85f2-47af-8a5a-b24f097bad6f, e9da2cc8-539e-440d-8eed-4630633a5b6e；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_marklist_watch",
  "source_extraction_id": "e9498e5ec3134785bc60d5eca40d3bd0",
  "version": 1,
  "memory_type": "entities"
}
-->