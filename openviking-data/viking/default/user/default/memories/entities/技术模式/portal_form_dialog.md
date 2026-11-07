# 门户公共表单弹窗体布局规范
门户详情弹窗（公司/许可等）按项目公共表单弹窗（zs-dialog + .form-box）重排，统一标签列与边距。

## 字段对齐
- 标签列定宽 + 右对齐：公司 --portal-form-label-width: 168px，许可 150px，冒号统一落在同一条右边缘，值统一从左边缘起排
- 标签→值间距 12px（对齐 el-form-item__label 的 padding-right: 12px）
- 删除原 gap:17px / gap:1px 与 .portal-company-body .portal-detail-row:last-child { min-height:0 } 等特例

## 边距
- 正文 padding: 20px 40px（= zs-dialog el-dialog__body 20px + .form-box 20px），替换原魔法值 52.5px 26px 48.5px 153px
- 行高 40px，行距 16px（--dialog-form-item-gap）→ 行节距 56px
- 头部按 zs-dialog 节奏：padding: 20px 20px 14px、白底无下边框、标题浅色下划线（--primary-color-light-9）、关闭按钮

## 验证与归属
- 验证证据：extracted source=workbuddy project=门户
- 涉及文件：PortalDialogHost.vue、PropertyDetailDialog.vue、public-portal-designs.ts、portal.scss、UnifiedLogin.vue、tests/e2e/fixtures/public-portal-designs.ts、tests/e2e/public-portal-visual.spec.ts
- 所属项目：门户；来源会话ID：47720336-5f4d-49c6-8fa8-1a7fc52beb93；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_form_dialog",
  "source_extraction_id": "8ec795904ec548c1801fc2e87c6a2106",
  "version": 1,
  "memory_type": "entities"
}
-->