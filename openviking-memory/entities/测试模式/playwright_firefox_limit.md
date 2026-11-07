# Playwright Firefox 录屏不生成文件
Playwright 对 Firefox 存在已知限制，Windows 及特定版本组合下配置 video:'on' 仍不生成视频文件，非项目配置错误。

## 现象
- Chromium 与 Edge 正常录制，Firefox 在 Windows 及特定版本组合下配置 `video:'on'` 不生成视频文件。
- 该局限非项目配置错误，需待 Playwright 后续版本修复。

## 根因
- Playwright 对 Firefox 的录屏支持存在已知限制。

## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：playwright.config.js
- 来源会话ID：78c72fa0-330c-40e1-a1f4-0f531bd5f3f6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "playwright_firefox_limit",
  "source_extraction_id": "9fee5d40800342799edd0912880a11e7",
  "version": 1,
  "memory_type": "entities"
}
-->