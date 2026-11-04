
# 小程序不支持uni.chooseFile致上传报错
苏住房C(zhi2-mobile-shimin)中ImageUploader.vue直接调用uni.chooseFile在微信小程序端不支持致上传TypeError，按平台选择API。

## 问题根因
- ImageUploader.vue直接调用uni.chooseFile在微信小程序端不支持，导致pages_owner/house/owner/register页上传TypeError

## 解决方案
- 按平台选择API：H5用uni.chooseFile，图片用uni.chooseImage，视频用uni.chooseMedia，并抽取uploadSelectedFile兼容临时路径无扩展名

## 验证与归属
- 验证证据src=苏住房C/069.md
- 涉及文件：src/components/ImageUploader/ImageUploader.vue、src/pages_owner/house/owner/register.vue、src/api/file.js、src/api/index.js、src/utils/index.js、src/components/ZsUploader/ZsUploader.vue
- 来源会话：f62dbdc4-5a71-4b38-86cc-ade4a540eb59；代码基线none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "choosefile_miniprogram_error",
  "source_extraction_id": "f50f877d11dc4b4680b3c1097a023672",
  "version": 1,
  "memory_type": "entities"
}
-->