- 偏好上传组件遵循 InstitutionUploadItem 标准：文件为带有图标和名称的独立行，操作区域包含删除/preview/download/upload。
- 对于图片预览使用 preview/openPreview；其他文件通过 window.open；下载通过 resolveServerAssetUrl 解析 fileSite。
- 在 E2E 测试中，偏好使用 data-testid 进行定位（例如：company-register-step3-appendix.spec.js）。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 上传代码风格",
  "source_extraction_id": "7d93cb8ae368422f9c4b1c74a757c166",
  "version": 1,
  "memory_type": "preferences"
}
-->
