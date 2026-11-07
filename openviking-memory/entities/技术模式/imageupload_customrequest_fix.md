# ImageUpload customRequest 文件流修复
在 zhi2-web-admin 的 ImageUpload 组件 customRequest 中修复上传文件为空对象的问题，确保标准二进制流。
## 问题根因
- 走 http-request/customRequest 未传真正二进制文件流，后端拿到空/非 File/Blob 结构，序列化后 `{"file":{}}`
## 解决方案
- 上传内容优先用 `file.raw`（element-ui UploadFile 真实二进制）
- 表单字段名改用 `options.filename`（匹配模板 `name="file"`）
- append 前校验 rawFile 必须有 `size`
- 对 Blob/File 情况重新构造 `new File([blob], safeName, {type})` 确保 multipart 为标准二进制流
## 验证与归属
- 验证证据：extracted source=cursor project=repository
- 需用失败的非中文文件名重新上传验证后端不再返回 `file: {}`
- 涉及文件：zhi2-web-admin/src/components/ImageUpload/index.vue
- 所属项目：repository；来源会话：7a1cac84-09ff-4e62-9499-a23a1aef9cbf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "imageupload_customrequest_fix",
  "source_extraction_id": "21fd6d90a3ef4a549ff47a78e0a03a47",
  "version": 1,
  "memory_type": "entities"
}
-->