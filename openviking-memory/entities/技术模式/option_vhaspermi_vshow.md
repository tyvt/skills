# v-hasPermi 与 v-show 冲突导致多余按钮
在项目太仓G的 optionDecision/detail.vue 文件中，v-show 与 v-hasPermi 的冲突导致了多余按钮。

## 问题根因
- 底部按钮同时使用了 `v-show` 和 `v-hasPermi`
- 当权限通过时，`v-hasPermi` 执行 `el.style.display = ''` 覆盖 v-show 的 `none`

## 修复
- 在 `optionDecision/detail.vue` 中的 7 个业务按钮将 `v-show` 替换为 `v-if`
- 当条件为假时，不渲染以避免干扰

## 验证与文件
- 原始会话: d78da6c5-2f67-48d6-9fd2-d7742debc541
- 涉及文件: optionDecision/detail.vue, OperationContainer/index.vue, detailMixins.js, ownerDecision/detail.vue, optionDecision/index.vue, sortDecison/detail.vue, main.js, directives/permission/hasPermi.js
- 所属项目: 太仓G; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_vhaspermi_vshow",
  "source_extraction_id": "e638529fe1a04b0d9c00eafeb905f6f1",
  "version": 1,
  "memory_type": "entities"
}
-->