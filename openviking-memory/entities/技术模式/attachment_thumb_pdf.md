# 证书弹窗与附件缩略图显示修复
苏州市房地产监测V3 项目修复证书查看弹窗空白过大问题，并实现附件按类型显示缩略图（PDF 用固定占位图）。

## 证书弹窗
- 查看不再固定 `92vh`，弹窗随内容增高
- 施工证编辑仍用 `92vh`，内部可滚动
- 查看态内容过长时保留 `max-height` + 滚动，避免被裁切

## 附件缩略图
- 新增 `src/utils/detailAttachmentDisplay.js`：图片用原图地址；PDF 等用固定图 `/assets/images/file/1.png`
- `detail-template.vue`：证书 `type: 'image'` 字段，PDF 改为 100×100 缩略图，点击在新窗口打开 PDF
- `ParcelDialog.vue` 等同步调整

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：f8b24da1-fc8e-489b-974f-b2fbccebc6a9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "attachment_thumb_pdf",
  "source_extraction_id": "ad219bd3153445a1967d7e62570af761",
  "version": 1,
  "memory_type": "entities"
}
-->