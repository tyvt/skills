- TMap.Map 实例不可存入 Vue2 data()，否则深度响应式破坏实例，导致 MultiPolygon 等图层 instanceof TMap.Map 校验失败
- map 移出 data() 并在 created() 中赋值 this.map=null 保持非响应式
- 地图容器改为 ref="tmapRoot"，样式选择器由 #map 变更为 .tmap-root
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue、statisticsMap/index.vue

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "TMap实例响应式处理",
  "source_extraction_id": "aa50523b6a354b449d9d0ea5f5964e57",
  "version": 1,
  "memory_type": "preferences"
}
-->