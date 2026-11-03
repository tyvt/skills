# DetailTemplate图片混排PDF卡片化
管理规约等使用 DetailTemplate 且字段 type:'image' 时，PNG 与 PDF 混排列表里 PDF 改为与图片一致的 100×100 卡片。

## 解决方案
- PDF 不再用 attachment-item-file 整行文字链，改为与图片一致的 100×100 卡片
- PDF 图标通过 getPdfAttachmentIconUrl() 调用 resolveServerAssetUrl('/assets/images/file/3.png')
- 点击 PDF 卡片仍走 handleAttachmentFileClick 新窗打开；其他文档类型保持文字链接

## 涉及文件
- zhi2-web-admin/src/components/detail-template/detail-template.vue
- zhi2-web-admin/src/utils/resolveServerAssetUrl.js

## 验证与归属
- 所属项目：园区公共收益
- 来源会话：7f300c14-221b-42ca-8513-b582bd83da6c
- 代码基线：191094f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_pdf_card",
  "source_extraction_id": "ae33c8b97175451f9aa74d76c19405ac",
  "version": 1,
  "memory_type": "entities"
}
-->