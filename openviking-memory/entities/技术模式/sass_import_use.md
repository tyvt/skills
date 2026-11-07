# Sass 用 @use 替换 @import 以消除警告
在 9 个组件中，将 `@import './overviewEmpty.scss'` 替换为 `@use './overviewEmpty.scss' as *;`，消除了弃用警告。

## 描述
- Sass 已弃用 @import；使用它会生成编译警告。
- 切换到 @use 保持样式行为不变。

## 解决方案
- 在 9 个组件中改为 `@use './overviewEmpty.scss' as *;`。
- 编译无弃用警告。

## 文件和来源
- 涉及文件: publicQuery/complex/detail.vue; publicQuery/complex/components/propertyContractTable.vue; publicQuery/complex/components/buildingTable.vue; publicQuery/complex/components/committeeTable.vue; publicQuery/complex/components/advertiseTable.vue; publicQuery/complex/index.vue; mixins/subTableMixins.js; mixins/table.js.
- 验证证据: cursor session=4f89ea4c-149b-4217-b962-c76fcfb5aaea.

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：4f89ea4c-149b-4217-b962-c76fcfb5aaea


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sass_import_use",
  "source_extraction_id": "569b09638b2b4de39d502b43e3f6f15e",
  "version": 1,
  "memory_type": "entities"
}
-->
