# 清理复制的详情页中未使用的代码
复制详情页时移除重复 mixins 和组件的规范。

## 描述
- `publicQuery/complex/detail.vue` 从 `property/complex/detail.vue` 复制而来，带来了重复的 `area` mixin 和未使用的 `houseTable` 组件。
- 移除了相关的日期字段和 `property-type-*` 样式。
- 接口数据的合并仍由 `detailCallback` 完成。

## 涉及的文件
- `publicQuery/complex/detail.vue`, `property/complex/detail.vue`
- `mixins/detailMixins.js`, `mixins/area.js`, `mixins/form.js`

## 验证
- 来源: cursor session=117b67e8-4e61-4da7-9503-e0038e998ea7

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：117b67e8-4e61-4da7-9503-e0038e998ea7


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_page_cleanup",
  "source_extraction_id": "0470ca24980e46c381bede7a0ebe5a55",
  "version": 1,
  "memory_type": "entities"
}
-->
