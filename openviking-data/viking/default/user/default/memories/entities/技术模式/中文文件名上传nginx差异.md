# 中文文件名上传仅某客户现场失败多为 Nginx/网关差异
同一套前后端代码，仅某客户现场中文文件名上传失败，高概率为该现场 Nginx/反向代理/WAF 对 multipart 中文 filename 处理不一致。

## 排查要点
- 对比两个上传接口（/file/file/upload 与 /file/appendix/upload）的 nginx location 是否一致。
- 查 WAF 是否拦截 filename="中文"。
- 检查 client_max_body_size、client_body_buffer_size、proxy_request_buffering、proxy_buffering 配置。
- 查看 error/access 日志状态码与 upstream 响应。

## 验证与归属
- 验证：会话 d16898a2（007.md）ImageUpload 不能传中文文件名而 AnnexUpload 可以，定位为现场 Nginx/网关差异。
- 涉及文件：zhi2-web-admin/src/components/ImageUpload/index.vue、zhi2-web-admin/src/components/AnnexUpload/index.vue
- 所属项目：园区物管2.0（zhi2-web-admin）
- 来源会话ID：d16898a2-e79f-4dec-9864-0c6c23505b8f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "中文文件名上传nginx差异",
  "source_extraction_id": "b21f97ce3f0d42898d28fa313bf40a83",
  "version": 1,
  "memory_type": "entities"
}
-->