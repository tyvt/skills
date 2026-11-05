# 巡检步骤弹窗重置不全
`resetStepForm` 仅清理 `stepFormImages` 但未清掉 `ZsUploader` 内部状态，且 `ZsUploader` 的 `watchEffect` 保留旧图，导致泰兴小程序巡检步骤弹窗在真机环境上传区残留旧图。
## 问题根因
- `resetStepForm` 只清了 `stepFormImages`，但 `ZsUploader` 内部的 `fileList` 和 `uni-file-picker` 状态没清掉（弹窗关闭后组件仍挂在 DOM 里）。
- `ZsUploader` 的 `watchEffect` 在 `modelValue` 为空时故意保留旧图片（`if (fileList.value.length > 0) return`），导致父组件清空后子组件仍显示旧图。
## 解决方案
- `resetStepForm`：每次重置时 `stepUploaderKey++`，强制重建上传组件。
- `ZsUploader`：父组件把 `modelValue` 清空时，同步调用 `clearPickerFiles()` 清掉 picker 内部文件列表。
- 验证：编辑 → 删除步骤 → 新增，上传区应为空白。
## 验证与归属
- 验证证据：src=泰兴小程序/001.md；extracted source=cursor project=泰兴小程序
- 涉及文件：src/staff/pages_facility/record/add.vue、src/components/ZsDialog/ZsDialog.vue、src/staff/components/ZsUploader/ZsUploader.vue、src/components/ZsTextarea/ZsTextarea.vue、src/components/ZsBottomPopup/ZsBottomPopup.vue、src/staff/pages_facility/issue/components/ReplyDialog.vue、src/App.vue
- 来源会话ID：78ffd4e2-d969-438b-a172-f36dd0d6fbad
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "reset_step_form",
  "source_extraction_id": "3a37b65da1f046779078aeddca3b83b5",
  "version": 2,
  "memory_type": "entities"
}
-->