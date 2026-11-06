# toggle_row与range滑块样式修复
苏住房C(zhi2-mobile-shimin) 页面中全局 `uni-button` 样式打散 `.toggle-row` 布局、range 滑块被主题样式压成「数字1」的问题已部分修复。

## 问题根因
- 全局 `uni-button { display:block; background:transparent }` 将 `.toggle-row` 里的按钮布局打散
- range 滑块被当成普通输入框，并被主题样式压成「数字 1」

## 修复内容
- 收窄全局 reset 范围，避免破坏 `.toggle-row` 布局
- 补全 `.toggle-row` 与 `range` 专属样式
- 布局重叠问题已修复，range 滑块展示问题仍在处理

## 验证与归属
- 像素差状态：结构/布局已通过，整体像素仍差约 5%–40%，正对照参考站图片与 `uni-image` 渲染差异继续压缩
- 项目：苏住房C（zhi2-mobile-shimin）；来源：2026-11-06 会话，消息 [0][19][60]

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "toggle_range_fix",
  "source_extraction_id": "c69a50105d9a4090a04ce258efc281d6",
  "version": 1,
  "memory_type": "entities"
}
-->