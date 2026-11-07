# El-upload 要求必填的 action 属性
Element UI 的 el-upload 组件即使通过 http-request 进行自定义上传，也强制要求 action 属性。

## 问题
- 在 certificatesDialog.vue 中，el-upload 使用了 `:http-request="handleUpload"` 但没有 action，导致出现 "Missing required prop" 警告。
- 即使 http-request 接管了上传，Element UI 仍强制要求 action。

## 解决方案
- 在 certificatesDialog.vue 的 el-upload 中添加了 `action="#"`，遵循 userAvatar.vue 的模式。
- 自定义 http-request 接管了实际的上传，而不请求 URL #。

## 文件和来源
- 涉及文件: certificatesDialog.vue; userAvatar.vue.
- 验证证据: src=产品2.0/085.md; session: a3245b72-8923-4386-a8ad-ff00068ae739.

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：a3245b72-8923-4386-a8ad-ff00068ae739


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_upload_action",
  "source_extraction_id": "569b09638b2b4de39d502b43e3f6f15e",
  "version": 1,
  "memory_type": "entities"
}
-->
