# 地图聚合层级缩放竞态序号守卫
苏住房G 资金统计地图在聚合层级切换时异步请求返回顺序不确定，旧响应覆盖新层级数据且旧标记残留。

## 问题根因
- 聚合层级切换时 loadAreaComplexLayer 异步请求返回顺序不确定
- 旧响应覆盖新层级数据，且旧标记残留地图

## 解决方案
- index.vue 的 loadAreaComplexLayer 采用 areaLayerLoadSeq 序号守卫，丢弃过期响应
- 层级变化（nextMarkListLayerLevel !== markListLayerLevel）时置 markList = [] 清空旧标记
- 对 handleMap 缩放事件做防抖，避免高频触发

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：苏住房G/082.md
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue
- 所属项目：苏住房G；来源会话：08185609-5b39-49e3-a32e-abce2cd09d68；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_zoom_race_guard",
  "source_extraction_id": "8192fcebecfa468d86c9a9c151b01762",
  "version": 1,
  "memory_type": "entities"
}
-->