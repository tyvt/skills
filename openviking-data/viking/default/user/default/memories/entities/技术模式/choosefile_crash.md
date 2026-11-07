# 小程序端 ImageUploader 调 uni.chooseFile 必崩
小程序端 ImageUploader 直接调 uni.chooseFile 会报 chooseFile is not a function，需按平台分派 chooseFile/chooseMedia/chooseImage。

## 问题现象
- 微信开发者工具（lib 3.7.12）点图片上传报 TypeError: common_vendor.index.chooseFile is not a function
- 栈落在 ImageUploader.js 的 chooseMedia 处，页面是 pages_owner/house/owner/register

## 问题根因
- ImageUploader 统一用 uni.chooseFile 选文件，但 uni.chooseFile 只在 H5/App 等平台实现，微信小程序端不存在该 API
- H5 测试通过不代表小程序可用，H5 与小程序混用的自研上传组件最容易踩

## 解决方案
- 组件内按平台与选择类型分派：H5 等支持平台走 uni.chooseFile；需要视频用 uni.chooseMedia；只选图片（如 register 页）用 uni.chooseImage
- 把「校验 + 上传」抽成独立的 uploadSelectedFile 方法
- 兼容小程序临时路径没有扩展名的情况（不能靠文件名后缀推类型）
- 改完要在微信开发者工具真机路径复测整条上传链路，而非只在 H5 预览

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话 f62dbdc4（基线 5f0f4dc）用户贴出 TypeError 完整栈，结论为小程序端不支持该 API，改为按平台分派并抽 uploadSelectedFile
- 涉及文件：zhi2-mobile-shimin/src/components/ImageUploader/ImageUploader.vue、zhi2-mobile-shimin/src/pages_owner/house/owner/register.vue、zhi2-mobile-shimin/src/api/file.js
- 所属项目：苏住房C；来源会话：f62dbdc4-5a71-4b38-86cc-ade4a540eb59；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "choosefile_crash",
  "source_extraction_id": "0bb48399527b42a8b82c414ecfd73497",
  "version": 1,
  "memory_type": "entities"
}
-->