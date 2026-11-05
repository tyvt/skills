# 报修页上传图片不显示修复
泰兴小程序报修页 `ZsUploader` 上传状态同步问题已修复，微信小程序构建通过，双端组件已同步。

## 修改内容
- 修复 `watchEffect` 过激清空：`props.str` 为空时，若 `fileList` 仍有本地临时项或已上传项，不再执行 `fileList = []`，避免通过 `v-model` 把 picker 内预览一并清掉。
- 重构 `handleUpload`：选中后立即 `syncFileListFromPicker()` 缩略图即时显示；上传成功后按 `uuid` 就地更新 picker 内部文件，不再额外 `push` 造成重复；上传失败或缺少 `fileSite` 时移除对应项并 `showToast`；全部完成后用 `nextTick` 再置 `isUploading = false` 避免竞态。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：`src/components/ZsUploader/ZsUploader.vue`、`src/staff/components/ZsUploader/ZsUploader.vue`、`src/pages_owner/repair/submit.vue`、`src/components/ImageUploader/ImageUploader.vue`、`src/api/file.js`。
- 来源会话ID：a04d7ad4-c531-4671-9106-08611d5e5edf
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "repair_upload_image_fix",
  "source_extraction_id": "d0b95a1ac762463e87faf215f6601357",
  "version": 1,
  "memory_type": "entities"
}
-->