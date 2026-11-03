# ImageUpload未传二进制流致后端file为空
园区物管2.0 公共组件 ImageUpload 因 customRequest 未传真实二进制流，导致后端收到的 file 为空对象（非 Nginx 问题）。

## 问题根因
- customRequest 未将真实二进制流传给后端
- 序列化后 file 为空对象，曾被误判为 Nginx 问题

## 修复方案
- zhi2-web-admin/src/components/ImageUpload/index.vue 优先取 file.raw
- 字段名使用 options.filename
- 校验 size 并对 Blob/File 重新构造标准 File([blob], safeName, {type}) 确保 multipart 标准流

## 验证与归属
- 验证证据：extracted source=cursor session=7a1cac84-09ff-4e62-9499-a23a1aef9cbf
- 涉及文件：zhi2-web-admin/src/components/ImageUpload/index.vue
- 所属项目：园区物管2.0；来源会话ID：7a1cac84-09ff-4e62-9499-a23a1aef9cbf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "imageupload_binary_stream",
  "source_extraction_id": "addfb2f3b8c345c6ab59dedb2975d7b9",
  "version": 1,
  "memory_type": "entities"
}
-->