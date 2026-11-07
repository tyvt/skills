# 地图原生类实例禁入 data
园区物管2.0 腾讯地图 GL 组件须把 TMap.Map 等原生类实例挂到非响应式字段，否则深度观测破坏 instanceof 校验。

## 问题根因
- 腾讯地图 GL 创建 MultiPolygon/MultiMarker/MultiLabel 等图层时报「所传入参数并非 TMap.Map 的实例！」
- TMap 内部对传入 map 做 instanceof TMap.Map 校验；map 实例写进 Vue2 data() 被深度响应式化（递归 defineReactive）后原生类实例被改坏，instanceof 判定失败
- 与 echarts 需 markRaw 同类问题，但根因是深度观测破坏原生类实例 instanceof，比单纯性能问题更致命

## 解决方案
- 地图实例不放 data()，改在 created() 里 this.map = null 挂到组件实例（非响应式字段），并加注释说明原因
- TMap.MultiMarker 等图层实例也不能放进会被深度观测的 data 结构
- 容器从 id=getElementById 改为 ref 引用，避免多实例时取错 DOM

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 65d1ff41 报错来自 TMap 图层构造的 instanceof TMap.Map 校验；修复为删除 data 中的 map、created 里 this.map=null 非响应式挂载 + ref="tmapRoot" 替代 #map
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue
- 所属项目：园区物管2.0；代码基线：f00310232；来源会话：65d1ff41-2ab2-465d-a45a-6af439cdd397

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tmap_instance_data_reactive",
  "source_extraction_id": "a1ffc258770840b091dc679561b91a7b",
  "version": 1,
  "memory_type": "entities"
}
-->