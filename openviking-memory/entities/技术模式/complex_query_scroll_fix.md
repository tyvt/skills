# 物业管理区域查询页面滚动修复
苏住房G 项目公共查询模块修复了物业管理区域查询页面右侧内容超出时无法滚动的问题。

## 问题原因
- 右侧内容区 `.sort-right` 同时使用 `list-container` 类和 `overflow: hidden`
- 搜索表单、高级筛选条件组、查询结果表格超出可视高度时，内容被裁切且不出现纵向滚动条

## 修改内容
- 去掉右侧区域多余的 `list-container` 类，避免重复的高度与溢出限制
- 新增 `.sort-right-body` 滚动容器，包裹搜索表单、高级筛选和列表区域
- 为 `.sort-right-body` 设置 `overflow-y: auto`，内容超出时显示纵向滚动条

## 验证与归属
- 展开多个筛选条件组、组内条件增多或查询较多数据时右侧出现纵向滚动条；左侧行政区域树保持独立滚动
- 涉及文件：publicQuery/complex/index.vue、zs-advanced-query.vue
- 所属项目：苏住房G；来源会话ID：33637a85-f189-4220-824c-b5f9a204802c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_query_scroll_fix",
  "source_extraction_id": "9d36e0008f33493084394e9c26960c81",
  "version": 1,
  "memory_type": "entities"
}
-->