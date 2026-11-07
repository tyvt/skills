- 在提交到门户之前，执行 `git add portalTheme.js` 以避免 CI 构建失败（未跟踪的文件导致了错误）
- 现有的绿色表头 E2E 用例必须继续断言标题 «可售房屋展示»
- 上下文：门户表头颜色的改造；不带 `portalSegment` 的深度链接 `?portal=houses` 显示了不正确的蓝色
- 涉及文件: portalTheme.js, PortalDialogHost.vue, UnifiedLogin.vue, PropertyPages.vue
- 会话： b642c935-7aec-4bc3-b375-5091c39f01f7

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 来源会话：b642c935-7aec-4bc3-b375-5091c39f01f7


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 预防门户CI故障",
  "source_extraction_id": "dd37fc1ce95e4bc7ac6e21d7160d2ee6",
  "version": 1,
  "memory_type": "preferences"
}
-->
