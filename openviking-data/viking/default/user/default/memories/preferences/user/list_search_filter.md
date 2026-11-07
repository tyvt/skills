- 公共组件 `zs-search-form.vue` 还原，`searchFormVisibility.js` 删除。
- 列表页在各自 `formItems` 计算属性中根据 `$store.state.user.terminalType` 过滤标签如企业名称，避免共享黑盒。
- 适用于约60个列表页的搜索表单字段显隐控制。


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "list_search_filter",
  "source_extraction_id": "d1feece445ef4148b81c08e9d8a871a2",
  "version": 1,
  "memory_type": "preferences"
}
-->