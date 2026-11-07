# 门户接入凭证弹窗布局调整
门户项目 CredentialDialog.vue 中因 zs-dialog 横向 flex 导致提示语与表单并列，已用 form-box 包裹修正。

## 问题根因
- `zs-dialog` 里 `.dialog-box` 是横向 `flex`，提示语和 `zs-form` 作为两个并列子节点时会左右排布

## 解决方案
- 用 `form-box` 包住提示语和表单（与项目里其他弹窗一致）
- 在该弹窗上把 `form-box` 的内边距设为 `0`，避免与 `el-dialog__body` 的左右内边距重复
- 刷新页面后重新打开「查看接入凭证」，提示语在上方、表单在下方纵向排列

## 涉及文件
- d:/repository/门户/zhi2-web-admin/src/views/portal/application/components/CredentialDialog.vue
- d:/repository/门户/zhi2-web-admin/src/styles/detail-form.scss
- d:/repository/门户/zhi2-web-admin/src/styles/index.scss

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 所属项目：门户；来源会话：7e03542d-2de3-4bb7-9718-e8ece18a0a0d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "credential_dialog_layout_fix",
  "source_extraction_id": "26b930e378994743a28ddd22bfcec007",
  "version": 1,
  "memory_type": "entities"
}
-->