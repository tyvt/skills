# H5文件预览相对路径解析
无锡市区小程序嵌入H5的文件预览 filePreview 与 ZsImage 一致，后端根路径转 ./ 相对地址走当前域与 Vite 代理。

## 背景与做法
- utils/index.js 的 filePreview 原用 IMAGE_BASE 拼 H5 地址，子路径部署或 dev 代理下预览 PDF 等文件路径错误
- 新增 resolveFilePreviewUrl：H5 下已是 http(s) 绝对 URL 原样返回
- 以 / 开头的后端路径改为 ./ 相对路径（如 /api/file → ./api/file），与 ZsImage 策略一致
- 微信小程序仍拼 BASE_URL
- 调用方若已传入完整 URL 勿重复拼接

## 验证与归属
- 验证会话：da88fbd0-10ce-496a-a71f-84d83cffcc43（基线 0804e57）
- 涉及文件：src/utils/index.js、src/components/ZsImage/ZsImage.vue
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "file_preview_relative",
  "source_extraction_id": "ebbf4b220692482fb080e0c398f71fe7",
  "version": 1,
  "memory_type": "entities"
}
-->