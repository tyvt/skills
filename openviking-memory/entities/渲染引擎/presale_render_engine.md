# PresaleDocRenderEngine
苏州市房地产预售许可证文档渲染引擎。
## Description
- 使用 Aspose Words 22.5 将 docx 模板渲染为 PDF/PNG
- 采用 range + shape 兜底替换语义处理文本框
- 由后端 zhi3-presale 子仓调用
## Purpose
- 将预售许可证数据填充进模板并生成客户可见的证照文档
## Relations
- 渲染 presale-permit-template.docx 模板
- 客测验证使用相同渲染路径独立出图确认修复


<!-- MEMORY_FIELDS
{
  "category": "渲染引擎",
  "name": "presale_render_engine",
  "source_extraction_id": "cf26555d96ca43f2a272f26cfe3a0f2c",
  "version": 1,
  "memory_type": "entities"
}
-->