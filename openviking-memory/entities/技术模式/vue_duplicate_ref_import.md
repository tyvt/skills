# Vue中ref的重复导入
`ExpenseList.vue` 出现了从 'vue' 重复导入 `ref` 导致 ESLint 冲突。
## 描述
- 发生在 `src/pages_owner/maintain/components/ExpenseList.vue` (项目 zhi2-mobile-shimin)。
- 第28和34行重复了 `import { ref } from 'vue'`。
## 修正
- 移除冗余的第34行以符合 ESLint。
## 验证
- 会话 cursor 82027868-3f83-446c-a0bf-5e3fec501631 记录了此次更改。
- 基础代码: none.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_duplicate_ref_import",
  "source_extraction_id": "081ef03380ad48028e0ca8b696a67f17",
  "version": 1,
  "memory_type": "entities"
}
-->