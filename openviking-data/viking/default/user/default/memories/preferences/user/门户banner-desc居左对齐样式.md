- `platform-banner-desc` 原 `width: 33.55%` 致文案偏居中，按设计稿须居左对齐。
- 改 `height: 59.15%` + `width: auto` 等比缩放，增 `object-position: left top` 与 `max-width` 避右侧按钮重叠。
- 验证证据：src=门户/006.md；来源会话 1c06a96f-418e-4cc9-93c8-d8e81869540b。
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue、tests/e2e/unified-login-visual.spec.ts、package.json、playwright.config.ts。

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "门户banner-desc居左对齐样式",
  "source_extraction_id": "79033622a7cb4a268c141fd5ce945446",
  "version": 1,
  "memory_type": "preferences"
}
-->
