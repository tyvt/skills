# 在 FileUpload 中发出 getList 之前同步 v-model
在项目 苏州市房地产监测V3 中，`FileUpload` 在同步 `v-model` 之前发出了 `getList`，导致 `validateField` 因 `form.certificateFile` 为空而报错；已在 `handleUploadSuccess` 中修复。

## 描述
- 员工证书对话框中的空字段验证错误
- 原因: `handleUploadSuccess` 在同步之前发出

## 解决方案
- 在 `FileUpload/index.vue` 中，`handleUploadSuccess` 调用 `handleFileListChanged()` 以在 `$emit('getList')` 之前同步 `v-model`
- 影响了 `staffManagement` 中的两个 `certificatesDialog.vue`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/232.md
- 涉及文件: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/FileUpload/index.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/staffManagement/personnelRecord/certificatesDialog.vue
- 源会话: 6ae031ba-01c4-4fb7-b554-8fab64e1aa45; 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fileupload_vmodel_sync",
  "source_extraction_id": "ed4340c4032043b1baf185a8b9851f9f",
  "version": 1,
  "memory_type": "entities"
}
-->