# ListTemplate 表格列重复 key 致 Duplicate keys 警告
在 accountCancel/index.vue 等表格中，列配置存在相同 prop 导致 ListTemplate.js 用 column.prop 作 key 时 Vue 报 Duplicate keys。
## 根因
- accountCancel/index.vue 中「业务账户分类名称」和「账户类型」两列均配置 prop: 'acctypeName'。
- ListTemplate.js 对列循环使用 :key="column.prop"，同 prop 产生相同 key。
## 修复
- 将 ListTemplate.js 列 key 改为 (column.prop || '') + '-' + (column.label || '') 组合。
- 同一表格一般同 prop 对应不同 label，可区分两列且不影响 v-bind="column"。
## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：src/mixins/ListTemplate.js、src/views/maintenance/accountCancel/index.vue。
- 所属项目：2-0；来源会话：3c906608-3287-4fa5-8f92-5704230e2aad；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listtemplate_duplicate_key",
  "source_extraction_id": "a2bc8961895245fc8e999b0fee80988e",
  "version": 1,
  "memory_type": "entities"
}
-->