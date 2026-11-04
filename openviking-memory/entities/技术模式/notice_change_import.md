# 组件中未导入 ES6 简写属性导致的 ReferenceError
`noticeChange/detail.vue` 在 `components` 中使用了 ES6 简写属性 `TransactionDetailTable`，但未导入该变量，导致模块加载时抛出 ReferenceError。

## 问题根因
- `noticeChange/detail.vue` 的 `components` 使用了 ES6 简写属性 `TransactionDetailTable`，但未导入该变量
- 模块加载时抛出 ReferenceError

## 解决方案
- 将 `noticeChange/detail.vue` 的第 250 行改为懒加载异步注册：`TransactionDetailTable: () => import('@/views/supervision/deposit/notice/components/TransactionDetailTable.vue')`
- 与 `notice/detail.vue` 保持一致，无需在顶部 import

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-leftover/115.md
- 涉及文件: noticeChange/detail.vue, notice/detail.vue, TransactionDetailTable.vue
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 97f8fc4b-8d6e-4425-965a-75edd085590c; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "notice_change_import",
  "source_extraction_id": "cb37c3e5026643ce8561e045e7a278a5",
  "version": 1,
  "memory_type": "entities"
}
-->