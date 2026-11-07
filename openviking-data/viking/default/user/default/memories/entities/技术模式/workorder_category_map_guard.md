# 工单分类接口对象数据直接map致下拉空
产品2.0(zhi2-web-admin)工单分类下拉因接口返回结构变化，原解析取到对象后 .map() 抛错被 catch 吞掉，导致 categoryOptions 为空。

## 问题根因
- 原代码 `const list = response.data || response.rows || []`
- `/property/workOrder/category/list` 返回 `{data:{list:[]}}` 时取到对象，`.map()` 抛错被 catch 吞掉致 `categoryOptions` 空

## 解决方案
- 保持该接口，兼容 `rows`/`data.records`/`data.list`/`data.rows`/`data` 数组等结构解析
- 映射 `workOrderCategoryId`/`_categoryName` 等字段
- 移除状态过滤与 `/page` 调用

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/024.md
- 涉及文件：zhi2-web-admin/src/views/property/workOrder/report/index.vue、report/components/AddOrderDialog.vue、components/zs-select/zs-select.vue、mixins/listMixins.js、components/zs-select/SingleSelect.vue、zs-search-form/SearchFormItem.vue、property/workOrder/category/index.vue、mixins/table.js
- 所属项目：产品2.0；来源会话：1401b92d-0ad2-433b-83f9-aa435e2c7296；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workorder_category_map_guard",
  "source_extraction_id": "0de41dbc8e2e4f76806309cdcb14ee8c",
  "version": 1,
  "memory_type": "entities"
}
-->