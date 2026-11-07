# 使用 zs-dialog 的企业/许可证详情对话框
门户中的企业和许可证详情对话框遵循 zs-dialog + .form-box，标签在固定宽度列中右对齐。

## 规格
- 标签列固定宽度且右对齐：企业 168px，许可证 150px
- 标签与值之间的间距：12px
- 主体内边距：20px 40px
- Line-height 40px，行间距 16px
- 头部无下边框，带有浅色下划线

## 文件与来源
- 涉及文件: PropertyDetailDialog.vue, PortalDialogHost.vue, zs-dialog.vue, CompanyDialog/index.vue, ProjectDialog/index.vue, detail-template.vue, public-portal-designs.md, detail-form.scss (位于 zhi2-web-admin/src/views/home/publicPortal)
- 验证证据: workbuddy 会话 47720336-5f4d-49c6-8fa8-1a7fc52beb93

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_permit_dialog_spec",
  "source_extraction_id": "ad9fab4e29e04bf990aabad89cc7012f",
  "version": 1,
  "memory_type": "entities"
}
-->