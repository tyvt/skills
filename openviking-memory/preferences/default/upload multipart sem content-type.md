- 不要手动设置 `Content-Type: multipart/form-data` 请求头，因为这会省略浏览器自动生成的 boundary，导致上传失败。
- 在 gateway.js 中：移除 `blobToBase64` 并使用 `formData.append` 进行直接二进制发送；`biz_content` 应仅包含业务参数；添加 `buildUploadGatewayHeader` 以保留必要的请求头（例如：`zs-authorization`）并移除冗余的请求头。
- 在 httpInstance.js 中：停止传递额外的请求头，并优先通过 `formData.token` 进行身份验证。

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "Upload multipart sem Content-Type",
  "source_extraction_id": "0e29cc68446e451f8607eb6f35513056",
  "version": 1,
  "memory_type": "preferences"
}
-->