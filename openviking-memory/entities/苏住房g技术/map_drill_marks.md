# 地图下钻先清空标记再请求
小区台账地图下钻应在请求前先清空旧标记层，避免慢接口下旧层级名称残留成新层级圆圈。

## 问题现象
- 小区台账（views/benefit/statisticsMap）按角色权限过滤行政区/街道/物业管理区域，点区县下钻后接口只返回一条街道数据，但地图圆圈仍显示上层「区域名称」，缩放一次才正常
- 接口慢，期间一直挂着旧标记

## 根因
- 标记层（markList）与下钻结果渲染是两条时序，点击后不立即清场，在接口返回并走 applyMarkListAfterDrillView 之前旧层级 mark 及「名称+数量」气泡还在
- 缩放触发地图重绘/聚合重算，表现成「缩放后自愈」——典型的「数据已换、DOM/图层未清」假象，不要误判为名称字段取错

## 解决方案
- 下钻点击回调里第一件事 this.markList = []（同步清空气泡/标记），再由接口回包走原有渲染逻辑重建新层级
- 失败分支补回退 restoreParentAreaLayerAfterDrillFail 重新拉上一级标记，避免异常时地图永久空白
- 适用面：所有「点一个元素 → 请求 → 重绘同一容器」的图表/地图/看板，都应在请求前清空旧数据并把失败回退一并设计，而非只做 loading

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话用户诉求「点了区域接口返回一条街道但圆圈仍显示区域名称，缩放后还原正常」+「接口慢能否点了先移除点再渲染」；结论点击时 markList=[]，回包走 applyMarkListAfterDrillView，失败走 restoreParentAreaLayerAfterDrillFail
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、components/map.vue
- 所属项目：苏住房G；来源会话：7c8a2586-a002-4baf-abaf-c868fa7a8a63；代码基线：ff55f8f

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "map_drill_marks",
  "source_extraction_id": "be6275e6d8164640a8327727cd8ac6dd",
  "version": 1,
  "memory_type": "entities"
}
-->