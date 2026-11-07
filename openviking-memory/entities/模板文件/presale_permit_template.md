# presale-permit-template.docx
苏州市房地产预售许可证 Word 模板，位于 zhi3-presale 后端子仓 resources/templates 目录下。
## Description
- 预售许可证生成用的 docx 模板，含两个浮动文本框（noAutofit 固定尺寸）
- 由 PresaleDocRenderEngine 通过 Aspose Words 22.5 渲染为 PDF/PNG
## Bug 与修复
- Bug 6315：预售单位与资金开户行文本框因尺寸固定导致文字截断/压标签
- 预售单位框宽 197.55→217pt（右缘不触底图标签）
- 开户行框宽 193→157pt、高 30.45→45pt（折两行完整显示）
- EMU 与 pt 两套值已同步修改
## Relations
- 属于 苏州市房地产检测V3后端仓库 的 zhi3-presale 子仓
- 修复提交为 5db26c36，仅改动此文件


<!-- MEMORY_FIELDS
{
  "category": "模板文件",
  "name": "presale_permit_template",
  "source_extraction_id": "cf26555d96ca43f2a272f26cfe3a0f2c",
  "version": 1,
  "memory_type": "entities"
}
-->