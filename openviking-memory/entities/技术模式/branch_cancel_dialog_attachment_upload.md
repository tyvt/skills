# 分支注销弹窗新增必填附件上传
苏州市房地产监测V3 新增 AppendixPictureUpload.vue 并在 CancelDialog.vue 接入必填附件上传组件。

## 变更要点
- 新增 `AppendixPictureUpload.vue` 通过 `listAppendixPackage` 加载要件，卡片式 `picture-card` 上传至 `/file/appendix/upload`
- `before-remove` 失败保留列表，`uid` 与 `loadSeq` 处理并发
- `CancelDialog.vue` 采用 `form-box` 与 `label-position="right"`，注销时间 placeholder 为「请选择时间」
- 「注销材料」改必填附件接入上传组件，主按钮文案「确认」，提交逻辑 `validate` 不变

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/036.md
- 涉及文件：AnnexUpload/index.vue、AgencyPersonnelDetail.vue、AgencyBranchDetail.vue、SupervisionAddDialog.vue、branchStatus.js、agencyBranch/index.vue、agencyBranch/detail.vue、CancelDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：485a0b05-80d5-45aa-91a0-e2f3e44801ed；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_cancel_dialog_attachment_upload",
  "source_extraction_id": "f6b75d3a1aac4e18b8e906f5b0ed4a14",
  "version": 1,
  "memory_type": "entities"
}
-->