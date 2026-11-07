# 区域和街道聚合气泡缩小
园区物管2.0 统计地图中区县级、街道级聚合气泡由 96px 调整为 72px（约缩小 25%），同步缩小字号与内边距。

## 修改要点
- 新增常量 `AREA_BUBBLE_SIZE_PX = 72`
- DOM 气泡圆宽高 96px → 72px，字号 16px → 14px
- LabelStyle 兜底方案使用同一尺寸
- 物业管理区域点标记（`project` 模式）未改动

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue、statisticsMap/index.vue
- 所属项目：园区物管2.0；来源会话ID：51ebab0c-4c70-4bdf-8d6d-a662e11c2615；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "area_street_bubble_size",
  "source_extraction_id": "fb80bfca03ac4c659cad7642f8b60177",
  "version": 1,
  "memory_type": "entities"
}
-->