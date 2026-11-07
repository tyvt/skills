
# 物业管理区域间距收紧
园区物管2.0 mapOverview 左栏「物业管理区域」三项指标横向间距收紧，去除多余留白。

## 问题根因
- 原 .summary-list 使用 repeat(3, 1fr)，在较宽左栏里每列占满三分之一宽度，数字和底座列内居中，三项间留大块空白

## 解决方案
- grid-template-columns: repeat(3, auto)：列宽随内容，不再被拉成三等分
- justify-content: center：三项整体仍居中
- gap: 4px：列间距由 8px 改为 4px
- 左右 padding 由 12px 改为 6px：再收边距
- 若仍挤或松，可微调 gap 在 2px～8px 之间

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话：76615610-2741-4c89-accc-c5cfe6621d05；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mapoverview_summary_spacing",
  "source_extraction_id": "b738ee7b0ab3417382b2153d311bb087",
  "version": 1,
  "memory_type": "entities"
}
-->