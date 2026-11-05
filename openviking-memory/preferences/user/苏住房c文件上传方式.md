- 偏好苏住房C小程序文件上传使用 multipart/form-data 直传：文件作为表单字段（formData.append）以二进制上传，不转为 base64 写入 biz_content。
- 偏好上传网关精简 header，仅保留`zs-authorization`、`zs-path`、`zs-source`，不手动设置 Content-Type 默认值（由浏览器自动带 boundary）。
- 偏好附件上传优先使用`formData.token`作为鉴权 token，不向网关透传多余 HTTP headers。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "苏住房C文件上传方式",
  "source_extraction_id": "8ed8cc7c612c4cff9097a608de758469",
  "version": 1,
  "memory_type": "preferences"
}
-->