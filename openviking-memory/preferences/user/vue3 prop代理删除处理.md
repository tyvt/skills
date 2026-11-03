- 在 Vue3 中，`prop` 的 `this.element` 为响应式 Proxy，直接 `delete` 其 `businessObject.$attrs` 会触发只读代理报错。
- 习惯在 `task.vue` 中引入 `toRaw` 并新增 `deleteFlowableAttr` 方法，对原始对象执行 `delete` 以规避 Proxy 限制。
- 验证证据：extracted source=cursor session=438ecac1-fc8f-4115-89d2-b8e10fee8055；涉及文件：task.vue；来源会话ID：438ecac1-fc8f-4115-89d2-b8e10fee8055；代码基线：none

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue3 prop代理删除处理",
  "source_extraction_id": "9fee5d40800342799edd0912880a11e7",
  "version": 1,
  "memory_type": "preferences"
}
-->