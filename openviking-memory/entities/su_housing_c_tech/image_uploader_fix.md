# ImageUploader 微信小程序上传报错修复
苏住房C `ImageUploader.vue` 直接调用 `uni.chooseFile` 在微信小程序端不支持，导致 `register` 页上传报错，已按平台选择 API 修复。

## 问题根因
- `ImageUploader` 直接调用 `uni.chooseFile`，该 API 在微信小程序端不支持（仅 H5/App 可用），`register` 页点击上传时报错

## 修复内容
- H5 等支持平台继续使用 `uni.chooseFile`
- 需要视频时使用 `uni.chooseMedia`
- 仅图片（如 register 页）使用 `uni.chooseImage`
- 校验和上传逻辑抽成 `uploadSelectedFile`，兼容小程序临时路径无文件扩展名的情况

## 涉及文件与归属
- 涉及文件：`components/ImageUploader/ImageUploader.vue`、`pages_owner/house/owner/register.vue`、`api/file.js`、`src/api/index.js`、`src/utils/index.js`、`src/components/ZsUploader/ZsUploader.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：f62dbdc4-5a71-4b38-86cc-ade4a540eb59
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "image_uploader_fix",
  "source_extraction_id": "e393299e4a9740aba5960facd459a397",
  "version": 2,
  "memory_type": "entities"
}
-->