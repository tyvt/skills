# businessItemTable循环外引用button致Vue警告
businessItemTable.vue 的 v-for 外残留 {{button.label}} 等模板片段，button 未定义触发 Vue 警告。

## 问题根因
- v-for 外残留 {{button.label}} 等模板片段导致 button 未定义触发 Vue 警告

## 解决方案
- 删除第9-11行多余模板
- operationButtons 由 subTableMixins 的 table mixin 计算属性提供

## 验证与归属
- 验证证据：extracted source=cursor session=2b55625d-ad3f-426b-89da-994604e35af2
- 涉及文件：businessItemTable.vue
- 来源会话ID：2b55625d-ad3f-426b-89da-994604e35af2
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "business_table_button",
  "source_extraction_id": "a3bfbac947954a81ad8f12ef85714da5",
  "version": 1,
  "memory_type": "entities"
}
-->