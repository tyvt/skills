# 大屏指标区 repeat(3,1fr) 间距虚大
园区物管2.0 mapOverview 左栏 summary 三列指标用 repeat(3,1fr) 在宽容器内数字间出现大块空白，需改 auto 列宽并居中。

## 问题根因
- 左栏 summary 类三列指标使用 grid-template-columns: repeat(3, 1fr)，较宽容器内每列占满三分之一且内容居中，数字间出现大块空白

## 解决方案
- 改 repeat(3, auto) 让列宽随内容
- justify-content: center 整体居中
- 减小 gap 与左右 padding（如 gap 4px、padding 6px）

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 76615610 mapOverview 物业管理区域三项间距过大，结论指向 .summary-list 的 1fr 三等分根因及四处样式调整
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话：76615610-2741-4c89-accc-c5cfe6621d05；代码基线：f00310232

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "mapoverview_summary_grid",
  "source_extraction_id": "6d1260c5d95f40dea1323fb5b5278536",
  "version": 1,
  "memory_type": "entities"
}
-->