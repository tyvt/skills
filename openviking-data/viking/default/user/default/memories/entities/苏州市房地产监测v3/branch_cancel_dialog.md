# 分支机构注销弹窗改造
苏州市房地产监测V3 已按设计稿完成「分支机构注销」弹窗改造，新增附件上传组件并调整弹窗。

## 新增组件
- `AppendixPictureUpload.vue`：通过 `listAppendixPackage` 加载要件，卡片式 `picture-card` 上传，仍走 `/file/appendix/upload`
- 右侧提示：「请上传 大小不超过 5MB 格式为 jpg/png/pdf 的文件」
- 删除使用 `before-remove`，失败时不从列表移除；`uid` 与并发 `loadSeq` 已处理

## 弹窗更新
- `CancelDialog.vue`：`form-box` + `label-position="right"`
- 注销时间 placeholder：**请选择时间**
- 「注销材料」改为必填 **附件**，接入 `AppendixPictureUpload`
- 主按钮文案：**确认**；提交逻辑不变：`validate` → 提交

## 验证与归属
- 涉及文件：`src/views/institution/agencyBranch/components/AppendixPictureUpload.vue`、`CancelDialog.vue`
- 所属项目：苏州市房地产监测V3；来源会话：485a0b05-80d5-45aa-91a0-e2f3e44801ed；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3",
  "name": "branch_cancel_dialog",
  "source_extraction_id": "512a39ba2e844a0aac60c3d59941b745",
  "version": 1,
  "memory_type": "entities"
}
-->