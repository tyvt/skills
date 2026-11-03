# ListTemplate列v-for的key不能仅用prop
ListTemplate.js 对 displayColumns 循环若 :key="column.prop"，当两列配置相同 prop 不同 label 会触发 Vue Duplicate keys 警告。
## 根因
- accountCancel/index.vue 两列 prop 均为 acctypeName，同 prop 不同 label 导致 key 重复。
## 修复
- 将 key 改为 (column.prop || '') + '-' + (column.label || '') 区分同 prop 不同 label 列。
- 若未来出现同 prop 同 label 两列，需在列配置增加唯一 columnKey。
## 验证与归属
- 涉及文件：zhi2-web-admin/src/mixins/ListTemplate.js、zhi2-web-admin/src/views/maintenance/accountCancel/index.vue。
- 验证证据：会话 3c906608 中 accountCancel/index.vue 两列 prop 均为 acctypeName。
- 所属项目：2-0；来源会话：3c906608-3287-4fa5-8f92-5704230e2aad；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listtemplate_key_prop",
  "source_extraction_id": "db699db3e683428f80cc7d381629b63a",
  "version": 1,
  "memory_type": "entities"
}
-->