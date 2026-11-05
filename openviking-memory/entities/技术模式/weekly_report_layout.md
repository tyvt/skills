# 服务周报详情页字段布局修复
产品2.0 服务周报详情页查看模式下「发布范围」与「查阅人次」字段布局错位已修复。

## 问题原因
- 查看模式使用 `DetailTemplate` 时，`layout` 中 `16` 映射为整行（24），导致「发布范围」独占一行，「查阅人次」被挤到下一行。

## 修改内容
- 将「发布范围」的 `layout` 从 `16` 改为 `12`，与「查阅人次」的 `8`（映射为 12）合计 24，两者并排显示。
- 编辑模式下 `el-col`（16+8）本身正确，无需调整。

## 涉及文件与来源
- 文件：`src/views/system/message/components/detail.vue`、`src/views/property/dailyService/detail.vue`（前缀 `d:/repository/产品2.0/zhi2-web-admin`）。
- 所属项目：产品2.0；来源会话：49aa0c4f-506a-4246-af2e-a77dde771e08。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "weekly_report_layout",
  "source_extraction_id": "d862fbde073b4aeb99df7780c2490c15",
  "version": 1,
  "memory_type": "entities"
}
-->