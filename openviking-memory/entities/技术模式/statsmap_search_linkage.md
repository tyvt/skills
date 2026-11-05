# statisticsMap 搜索框联动接口
statisticsMap/index.vue 已对接真实搜索接口，完成搜索框联动地图点位与中心定位。

## 接口与字段适配
- 初始化请求改为 this.$get('/v2.0/benefit/pubOperatingAsset/listPubOperatingAsseProject', { keyWord })，移除 mockSearchApi
- 后端 lng/lat 映射为地图组件需要的 longitude/latitude，页面内统一转换

## 搜索交互
- 点击搜索或回车带 keyWord 请求接口，成功后地图中心定位第一条结果并调整缩放
- 搜索框清空自动恢复全量数据，新增 @clear="handleSearchClear"

## 地图刷新
- 因 Map 组件未监听 markList 变化，页面用 mapVisible 重建刷新保证搜索后点位更新

## 验证与归属
- 涉及文件：src/views/benefit/statisticsMap/index.vue
- 来源会话：fbdf2d00-85f2-47af-8a5a-b24f097bad6f
- 已检查 lint 无新增报错

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "statsmap_search_linkage",
  "source_extraction_id": "fcd8a128f48a41fc9c6111b9caff053b",
  "version": 1,
  "memory_type": "entities"
}
-->