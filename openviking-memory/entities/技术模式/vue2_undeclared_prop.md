# Vue 2 中因 data() 未声明属性导致按钮无响应

在 淮安物管 项目中，一个切换按钮未更新界面，因为该属性在 Vue 2 中不是响应式的。

## 问题根因
- `pubRevenueContract/detail.vue` 未在 `data()` 中声明 `showManualInput`。
- 在 Vue 2 中，未声明的属性不是响应式的，因此按钮不会更新视图。

## 修复
- 在 `pubRevenueContract/detail.vue` 的 `data()` 中添加了 `showManualInput: false`。
- 参考了 `pubExpenditureContract/detail.vue`。

## 涉及文件
- `benefit/pubRevenueContract/detail.vue`
- `benefit/pubExpenditureContract/detail.vue`

## 验证
- Cursor 会话: 5dde2ae1-89fa-428b-838d-b1e71ffd7a23
- 所属项目: 淮安物管 zhi2-web-admin; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue2_undeclared_prop",
  "source_extraction_id": "f67373fbed294ece99126a068db590fe",
  "version": 1,
  "memory_type": "entities"
}
-->