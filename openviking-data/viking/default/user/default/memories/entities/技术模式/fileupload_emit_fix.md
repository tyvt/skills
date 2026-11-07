# 修复 FileUpload 中 emit 和 v-model 的顺序
在项目 苏州市房地产监测V3 中，`FileUpload/index.vue` 的 `handleUploadSuccess` 在同步 `v-model` 之前触发了 `getList`，导致 `validateField` 中出现空字段错误。

## 描述
- FileUpload 组件和证书对话框受影响
- 所属项目: 苏州市房地产监测V3

## 问题根因
- 原始顺序：先 `$emit('getList')` 再同步 `v-model`
- 这导致在 `validateField` 时 `form.certificateFile` 为空，触发了 «不能为空»

## 解决方案
- 调整为先 `handleFileListChanged()` 同步 `v-model`，再 `$emit('getList')`
- 相关文件：位于 staffManagement 和 personnelRecord 的 `certificatesDialog.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：6ae031ba-01c4-4fb7-b554-8fab64e1aa45
- 验证证据: src=苏州市房地产监测V3-leftover/032.md
- 涉及文件: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/components/FileUpload/index.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/staffManagement/personnelRecord/certificatesDialog.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/package.json; d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/company/personnel-record.spec.js
- 源会话: 6ae031ba-01c4-4fb7-b554-8fab64e1aa45; 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fileupload_emit_fix",
  "source_extraction_id": "9e8fdb1f8e9d4c00b0343d17cab91324",
  "version": 1,
  "memory_type": "entities"
}
-->