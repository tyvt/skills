# 区街聚合气泡尺寸收敛为72px常量
园区物管2.0 中 benefit/statisticsMap 区县级、街道级聚合气泡尺寸由96px调整为72px，字号16px改14px。

## 实现要点
- 区县级、街道级聚合气泡尺寸由96px调整为72px，字号16px改14px
- 在 map.vue 新增常量 AREA_BUBBLE_SIZE_PX = 72 控制 DOM 气泡圆与 LabelStyle 兜底尺寸
- project 模式点标记未改动

## 涉及文件
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/statisticsMap/index.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue

## 验证与归属
- 来源会话：51ebab0c-4c70-4bdf-8d6d-a662e11c2615
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "area_bubble_72",
  "source_extraction_id": "b3308256c9da4e959219e2ced6ad87dd",
  "version": 1,
  "memory_type": "entities"
}
-->