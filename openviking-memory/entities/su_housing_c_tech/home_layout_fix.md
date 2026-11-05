# 苏找房首页白色背景紧贴Banner间隙修复
苏住房C 苏找房首页调整布局，使白色背景紧贴 Banner，消除中间灰色间隙。

## 问题原因
- `home-nav-wrap` 使用 `margin-top: 36px`
- 页面背景为 `#f5f5f5`，导致 Banner 与白色导航区出现灰色空隙

## 修复要点
- `home-nav-wrap` 的 `margin-top` 从 `36px` 改为 `0`，白色背景从 Banner 底部开始
- `header-wrap` 增加 `padding-bottom: 24px`，对应搜索框 `bottom: -24px` 悬出高度，避免与下方图标重叠

## 涉及文件
- src/pages_tab/components/Project_Suzhufang.vue
- src/pages/index/project.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：82834510-c303-48f8-b95b-7d3747c2cc8e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "home_layout_fix",
  "source_extraction_id": "05299e8d90ea44e7b84c45eab8c8e81c",
  "version": 1,
  "memory_type": "entities"
}
-->