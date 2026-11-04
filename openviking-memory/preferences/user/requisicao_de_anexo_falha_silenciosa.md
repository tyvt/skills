- `getFiles` 使用 `{ noReject: true }` 来抑制 HTTP 错误 Toast。
- 结合 `try/catch` 与 `Array.isArray`，并在异常时静默返回 `[]`。
- 调用方不变；附件失败显示空列表。
- 涉及文件: `src/api/common.js`, `src/api/index.js`, `src/api/httpInstance.js`, `src/api/property.js`.
- 验证：会话 175eae30-82c4-41a9-8ce2-4d7f29dee217.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 附件请求静默失败",
  "source_extraction_id": "081ef03380ad48028e0ca8b696a67f17",
  "version": 1,
  "memory_type": "preferences"
}
-->
