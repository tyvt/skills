
# 工单分类下拉无数据修复
产品2.0 的工单上报模块修复了因接口返回结构解析错误导致工单分类下拉为空的问题。

## 问题根因
- 原代码用 `response.data || response.rows || []` 解析列表
- 当 `/list` 返回 `{code:200, data:{list:[]}}` 时 `response.data` 为对象，调用 `.map()` 抛错被 catch 吃掉，导致 `categoryOptions` 为空数组

## 修改内容
- 继续使用 `/property/workOrder/category/list` 接口
- 按多种结构解析：`rows`、`data.records`、`data.list`、`data.rows` 及 `data` 本身为数组
- 补充字段映射：`workOrderCategoryId`、`_categoryName` 等
- 去掉误加的状态过滤和 `/page` 调用

## 涉及文件与来源
- 文件：`zhi2-web-admin/src/views/property/workOrder/report/index.vue`、`AddOrderDialog.vue` 等
- 项目：产品2.0；来源会话：1401b92d-0ad2-433b-83f9-aa435e2c7296；代码基线：none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workorder_category_parse",
  "source_extraction_id": "997c2c3837c04b879544186d7655de27",
  "version": 1,
  "memory_type": "entities"
}
-->
