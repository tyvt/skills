# 文件预览地址相对路径改造
filePreview 的地址解析改为与 ZsImage 一致，新增 resolveFilePreviewUrl 按平台处理路径。

## 平台行为
- H5：已是 http(s):// 等绝对地址则原样使用；以 / 开头转为相对路径（如 /api/file → ./api/file），走当前域名与 Vite 代理
- 微信小程序：仍拼接 BASE_URL，逻辑不变

## 改动要点
- filePreview 不再使用 IMAGE_BASE 拼接 H5 地址，已移除对应 import
- DescribePopup.vue 等调用前若手动拼接 IMAGE_BASE，H5 下为空不受影响；小程序传入完整 URL 识别为绝对地址不重复拼接

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话 da88fbd0 用户要求文件预览路径改为相对路径
- 涉及文件：DescribePopup.vue、src/utils/index.js、src/env/mp.js
- 所属项目：无锡市区小程序嵌入H5；来源会话ID：da88fbd0-10ce-496a-a71f-84d83cffcc43

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "file_preview_relative_path",
  "source_extraction_id": "db939e041a9d4a98beb9e35906b8523f",
  "version": 1,
  "memory_type": "entities"
}
-->