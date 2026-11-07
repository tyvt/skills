# 楼幢区Tab内容留白修复
苏州市房地产监测V3 中楼幢区内层 Tab 的 tabs-content 已补充左右留白，使表格与 Tab 标题对齐。

## 问题根因
- 楼幢区内层 Tab 把卡片 padding 清成 0 后，仅给 tabs-bar 加左右留白
- tabs-content 里的表格仍占满整宽，导致「序号」列贴左边

## 修复内容
- 为 building-section-tabs 的 tabs-content 加左侧 24px、右侧 var(--detail-content-padding)（16px）留白
- 底边同样 16px 留白
- 分页行不再单独加左右 padding，避免与父级叠加两层

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：customerProject/detail.vue、register-form.scss
- 所属项目：苏州市房地产监测V3；来源会话ID：aec02b58-7ae2-4aa5-8d40-4d59d6aa2b00；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_tabs_padding",
  "source_extraction_id": "b4f9b8ee9a074a1f9493bbc90de9a86f",
  "version": 1,
  "memory_type": "entities"
}
-->