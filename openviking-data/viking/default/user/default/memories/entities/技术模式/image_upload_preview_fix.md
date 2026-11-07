# ImageUpload 多图预览匹配修复
园区物管2.0 全局公共组件 ImageUpload 修复多图上传后预览索引错乱问题。

## 问题原因
- 预览列表 `urlList` 使用 `resolveServerAssetUrl()` 处理后的完整地址
- 当前图索引用 `urlList.indexOf(file.fileUrl)`，`file.fileUrl` 多为后端原始路径（如 `/upload/xxx.jpg`）
- 格式不一致时 `indexOf` 几乎恒为 `-1`，预览固定跳到第 1 张，多图时点哪张都看错

## 修改内容
- `handlePictureCardPreview` 改用 `findIndex` 多条件匹配（`uid`、`fileUrl`、`name`、`url` 及解析后 URL），点击哪张预览哪张
- `handleUploadSuccess` 中保留 Element UI 传入的 `file.uid`，便于上传过程准确对应文件
- 组件为全局共用，`housePart/detail.vue` 等使用页面均受益

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：src/components/ImageUpload/index.vue、src/views/benefit/housePart/detail.vue
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：90aa41bd-ec8d-452e-9246-bbbc58df8558

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "image_upload_preview_fix",
  "source_extraction_id": "c518d16edcc64eb0894003e93bc52572",
  "version": 1,
  "memory_type": "entities"
}
-->