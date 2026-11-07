# 要件上传组件与标题栏左对齐修复
苏州市房地产监测V3 修复上传图片组件虚线框比标题文字更靠左的对齐问题。

## 问题根因
- 标题栏有 12px 左内边距，但上传框之前贴在整列最左边，虚线框比「* / 文字」更靠左

## 修改内容
- 增加 `requirement-column`，标题和上传区在同一列里排版
- 上传区用 `margin-left: 12px`（与标题栏 `padding-left` 相同），让虚线框左边与标题文字（含 `*`）起点对齐
- 标题栏最小宽度与缩略图列宽一致，并去掉 `el-upload` 列表可能带来的额外外边距

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`zhi2-web-admin/src/components/AnnexUpload/components/AppendixRequirementCard.vue`、`zhi2-web-admin/src/styles/appendix-requirement-grid.scss`
- 所属项目：苏州市房地产监测V3；来源会话ID：01e8df3d-6c81-47b3-9085-07a3082b51b9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "annex_upload_align",
  "source_extraction_id": "6677b5f047cc425687d16521ea64a021",
  "version": 1,
  "memory_type": "entities"
}
-->