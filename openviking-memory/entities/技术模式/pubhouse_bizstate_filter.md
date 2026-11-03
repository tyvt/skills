# 经营用房列表查询缺业务状态筛选
园区公共收益(zhi2-web-admin)经营用房列表缺失业务状态过滤条件。

## 问题根因
- `benefit/pubHouse/index.vue` 列表查询参数与表单项均缺失业务状态(bizState)过滤

## 解决方案
- 于 `queryParams` 增加 `bizState` 字段
- 添加「业务状态」下拉框，随 `/benefit/pubHouse/page` 请求提交

## 验证与归属
- 涉及文件：src/views/benefit/pubHouse/index.vue、src/views/benefit/pubRevenueContract/index.vue、src/mixins/listMixins.js、src/views/benefit/pubParkingSpace/index.vue、src/api/benefit/pubHouse.js
- 来源会话ID：55d70a90-ab8b-466b-88a5-7221f59b6b06；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pubhouse_bizstate_filter",
  "source_extraction_id": "ff320310ed4d44fca7c9fe7878836a34",
  "version": 1,
  "memory_type": "entities"
}
-->