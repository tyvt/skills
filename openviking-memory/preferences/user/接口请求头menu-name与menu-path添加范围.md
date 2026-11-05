- 仅对 OperationBtnGroup 点保存（formMode=edit）触发的编辑接口、列表页 handleDelete 触发的删除接口添加 menu-name/menu-path 请求头，其他接口（查询、新增、详情等）不加
- 通过 pageRequestContext.js 的 pendingOperHeaders 标记下一次请求类型（edit/delete），仅在匹配的 PUT/DELETE 请求上消费并附加对应请求头
- 编辑保存调用 enableDetailSaveHeaders(primaryKey, form) 打标；删除调用 enableListDeleteHeaders() 打标
- 适用于园区公共收益项目 pageRequestContext.js、OperationBtnGroup/index.vue、mixins/table.js、mixins/form.js

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "接口请求头menu-name与menu-path添加范围",
  "source_extraction_id": "ba7d59c85b1e426abf2d99029459c78e",
  "version": 1,
  "memory_type": "preferences"
}
-->