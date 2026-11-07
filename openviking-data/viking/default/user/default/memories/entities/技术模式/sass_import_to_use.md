# 在 Sass 中将 @import 迁移到 @use
在 Vue 组件中用 @use 替换 @import 可消除 Sass 的弃用警告。

## 上下文
- 9 个组件使用了 @import './overviewEmpty.scss'。

## 解决方案
- 更改为 `@use './overviewEmpty.scss' as *;`，样式行为不变，无警告。

## 文件与来源
- 涉及文件: publicQuery/complex/detail.vue, propertyContractTable.vue, buildingTable.vue, committeeTable.vue, advertiseTable.vue, index.vue, subTableMixins.js, table.js.
- 验证证据: 会话 cursor=4f89ea4c-149b-4217-b962-c76fcfb5aaea.

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：4f89ea4c-149b-4217-b962-c76fcfb5aaea


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sass_import_to_use",
  "source_extraction_id": "101ea3de48ee43dbb0f0a7c8a375f9f1",
  "version": 1,
  "memory_type": "entities"
}
-->
