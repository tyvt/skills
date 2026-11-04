# zs-button 模板外残留片段致 button 未定义报错
bookDetailTable.vue 与 businessItemTable.vue 因模板中被多复制一段 `{{ button.label }}` 等片段，在 v-for 作用域外访问 button 导致报错。

## 问题根因
- bookDetailTable.vue 约 205 行（编译后）报错 `Cannot read properties of undefined (reading 'label')`，因 v-for 外多了 `v-on="button.listeners">`、`{{ button.label }}`、`</zs-button>` 残缺片段
- businessItemTable.vue 出现 `[Vue warn]: Property or method "button" is not defined`，同样因第 9–11 行重复模板片段在循环外访问 button
- 这些片段不在 v-for 作用域，模板无名为 button 的 data，button 为 undefined；Vue 也会将其视为组件实例属性

## 解决方案
- 删除各组件第 9–11 行那段重复、无效的 HTML，仅保留 operationButtons 里正确的 v-for 按钮循环
- operationButtons 由 subTableMixins → table mixin 计算属性提供，无需在组件内声明 button
- bookDetailTable.vue 顺带修正删除按钮配置：`visible: this.editButton` 改为与基类 table.js 里 deleteButton 一致的正确语义

## 验证与归属
- bookDetailTable.vue 验证证据：src=bugfix；会话：531f1b9a-0bdd-40d5-b647-610d1853af02；涉及文件：bookDetailTable.vue、table.js
- businessItemTable.vue 验证证据：src=bugfix；会话：2b55625d-ad3f-426b-89da-994604e35af02；涉及文件：businessItemTable.vue
- 所属项目：bugfix；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_template_fragment",
  "source_extraction_id": "8c338360553b4596af2801645e408eea",
  "version": 1,
  "memory_type": "entities"
}
-->