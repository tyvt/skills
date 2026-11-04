# subVenueTable 导入路径错误
在 leaseApply/detail.vue 中对 subVenueTable 的导入指向了 pubUseMoneyApply/components，而不是自身的包。

## 问题
- 在 leaseApply/detail.vue 中 subVenueTable 的导入路径指向了 pubUseMoneyApply/components。
- 模块未找到错误 (module not found)。

## 解决方案
- 已修正为 @/views/benefit/leaseApply/components/subVenueTable.vue。
- 既有的 TS 类型错误无关紧要。

## 文件和来源
- 涉及文件: benefit/leaseApply/detail.vue; benefit/leaseApply/components/subVenueTable.vue.
- 验证证据: cursor 会话 e9d0317f-8909-475d-8300-5760a17efba4.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subvenue_import_path",
  "source_extraction_id": "9e5325997abb4bf8bfb4d64dabe6b2a1",
  "version": 1,
  "memory_type": "entities"
}
-->