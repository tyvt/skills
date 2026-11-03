# 弹窗关闭按钮垂直居中修复
苏州市房地产监测V3 的 zhi2-web-admin 中 zs-dialog 关闭按钮原按上内边距对齐且 line-height 偏大导致视觉偏移，改为标题栏相对定位、按钮 50% 居中。

## 变更内容
- `zs-dialog` 关闭按钮原用 `top: var(--zs-dialog-padding-y)` 对齐上内边距且 `line-height:1.5` 致视觉偏移
- `src/styles/element-ui.scss` 设标题栏 `position:relative`、按钮 `top:50%`+`translateY(-50%)`+`inline-flex` 与图标 `line-height:1`
- 重置 `.approval-dialog` 避免二次位移，并移除 `zs-dialog.vue` 错误 `top`

## 涉及文件
- `zhi2-web-admin/src/views/login.vue`
- `zhi2-web-admin/src/views/components/OrgTypeDialog.vue`
- `zhi2-web-admin/e2e/register/property-register-entry.spec.js`
- `zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue`
- `zhi2-web-admin/src/views/autonomy/components/VoteQrcodeDialog.vue`
- `zhi2-web-admin/src/components/AuditDialog/index.vue`
- `zhi2-web-admin/src/styles/element-ui.scss`
- `zhi2-web-admin/package.json`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/143.md
- 来源会话ID：186a234b-b8c5-43be-8142-a0b0c30a7e10；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_close_align",
  "source_extraction_id": "72d05272e66f4c8da18668a0d230c1cf",
  "version": 1,
  "memory_type": "entities"
}
-->