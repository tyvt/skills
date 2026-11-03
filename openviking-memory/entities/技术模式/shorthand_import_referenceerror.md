# 组件未导入简写变量致ReferenceError
苏州市房地产监测V3 中 noticeChange/detail.vue 因使用 ES6 简写组件未导入变量，模块加载时抛出 ReferenceError，已改为异步懒加载修复。

## 问题根因
- `noticeChange/detail.vue` 的 `components` 中使用 ES6 简写 `TransactionDetailTable` 但未 import 该变量
- 模块加载时抛出 `ReferenceError`

## 修复方案
- 在 `noticeChange/detail.vue` 第 250 行采用异步懒加载注册 `TransactionDetailTable: () => import('@/views/supervision/deposit/notice/components/TransactionDetailTable.vue')`
- 写法与 `notice/detail.vue` 一致，免 top-level import

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/315.md
- 涉及文件：noticeChange/detail.vue、notice/detail.vue、views/supervision/deposit/notice/components/TransactionDetailTable.vue
- 所属项目：苏州市房地产监测V3；来源会话：97f8fc4b-8d6e-4425-965a-75edd085590c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shorthand_import_referenceerror",
  "source_extraction_id": "8298b83dd6b24dbbbfaf79725dcec981",
  "version": 1,
  "memory_type": "entities"
}
-->