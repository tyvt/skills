# bookDetailTable模板外置button.label致报错
bookDetailTable.vue 的 v-for 外误粘 {{button.label}} 片段，button 未定义引发报错。

## 问题根因
- v-for 外误粘 {{button.label}} 片段导致 button 未定义引发渲染报错

## 解决方案
- 删除第9-11行冗余模板
- 修正 visible 绑定为 table.js 中 deleteButton 配置

## 验证与归属
- 验证证据：extracted source=cursor session=531f1b9a-0bdd-40d5-b647-610d1853af02
- 涉及文件：bookDetailTable.vue ; table.js
- 来源会话ID：531f1b9a-0bdd-40d5-b647-610d1853af02
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "book_table_button",
  "source_extraction_id": "a3bfbac947954a81ad8f12ef85714da5",
  "version": 1,
  "memory_type": "entities"
}
-->