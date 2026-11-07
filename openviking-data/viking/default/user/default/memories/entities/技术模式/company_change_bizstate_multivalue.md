# company_change_bizstate_multivalue
在提交 c2ab33f8b 将 bizState 全局改为多选后，companyManagement/components/index.vue 中对 /company/companyRecordChange/page 的调用错误地将多值字符串序列化为 '1,2'。

## 操作
- 规范化该文件中 bizState 的传递格式。
- 涉及文件: companyManagement/components/index.vue, userManagement/operator/index.vue, change/index.vue, utils/companyListQuery.js, zs-search-form.vue, layout/index.vue, userManagement/companyRecordAuth/index.vue, mixins/listMixins.js.
- 所属项目: 苏住房G; 验证证据: src=苏住房G/056.md; 会话: 04c6f559-f726-4199-99cd-5e92be1922e5.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_bizstate_multivalue",
  "source_extraction_id": "365bab52c52f4179bd3a6d0ab0e8c6cc",
  "version": 1,
  "memory_type": "entities"
}
-->