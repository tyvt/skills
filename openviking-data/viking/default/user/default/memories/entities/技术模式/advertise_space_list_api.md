# 物业管理区域广告位列表接口（苏住房G）
苏住房G 项目物业管理区域查询详情页的广告位列表由子组件 advertiseTable 渲染。

## 接口信息
- 请求方式：GET
- 路径：/benefit/pubAdvertiseSpace/page（完整 URL 如 /prod-api/benefit/pubAdvertiseSpace/page）
- 参数：pageNum（默认1）、pageSize（默认10）、projectId（即物业管理区域 complexId）

## 代码位置
- views/publicQuery/complex/components/advertiseTable.vue
- mixins/table.js
- views/publicQuery/complex/index.vue、detail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "advertise_space_list_api",
  "source_extraction_id": "85aebb1930c949e9b8df248d137025f2",
  "version": 1,
  "memory_type": "entities"
}
-->