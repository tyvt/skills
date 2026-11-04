# rectification_bizstate_default
在 rectificationNotice 模块中，默认的 bizState '2' (已备案) 导致只列出已归档的记录。

## 修正
- 在 zhi2-web-admin/src/views/evaluation/rectificationNotice/index.vue 第 108 行，bizState 改为 undefined，空查询且 API 无过滤。
- 详情：新增房产区域弹窗保持逻辑；Vuex 缓存需要 reset click。
- 涉及文件: rectificationNotice/index.vue, detail.vue, mixins/listMixins.js, ListTemplate.js, table.js.
- 所属项目: 苏住房G; 验证证据: src=苏住房G/053.md; 会话: 952fd9dc-40f6-4af0-88c2-cdd449ab3e96.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rectification_bizstate_default",
  "source_extraction_id": "365bab52c52f4179bd3a6d0ab0e8c6cc",
  "version": 1,
  "memory_type": "entities"
}
-->