# 小程序端 ImageUploader 调 uni.chooseFile 必崩
苏住房C 的 zhi2-mobile-shimin 中，ImageUploader 统一用 uni.chooseFile 选文件，但微信小程序端不存在该 API，运行时报 TypeError 崩溃。

## 问题根因
- ImageUploader 统一用 uni.chooseFile 选文件，但 uni.chooseFile 只在 H5/App 等平台实现，微信小程序端不存在该 API
- 小程序（微信开发者工具 lib 3.7.12）点图片上传报 TypeError: common_vendor.index.chooseFile is not a function，栈落在 ImageUploader.js 的 chooseMedia 处
- H5 与小程序混用的自研上传组件最容易踩，H5 测试通过不代表小程序可用

## 解决方案
- 组件内按平台与选择类型分派：H5 等支持平台走 uni.chooseFile；需视频用 uni.chooseMedia；只选图片（如 register 页）用 uni.chooseImage
- 把「校验+上传」抽成独立的 uploadSelectedFile 方法，兼容小程序临时路径无扩展名情况（不能靠文件名后缀推类型）
- 改完在微信开发者工具真机路径复测整条上传链路，不只 H5 预览

## 验证与归属
- 验证证据：会话 f62dbdc4（基线 5f0f4dc），用户贴出 TypeError 完整栈，结论为按平台分派 chooseFile/chooseMedia/chooseImage 并抽 uploadSelectedFile
- 涉及文件：zhi2-mobile-shimin/src/components/ImageUploader/ImageUploader.vue、zhi2-mobile-shimin/src/pages_owner/house/owner/register.vue、zhi2-mobile-shimin/src/api/file.js
- 所属项目：苏住房C；来源会话：f62dbdc4-5a71-4b38-86cc-ade4a540eb59；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "image_uploader_crash",
  "source_extraction_id": "62d87249144d403883d1af7d2739cef7",
  "version": 1,
  "memory_type": "entities"
}
-->