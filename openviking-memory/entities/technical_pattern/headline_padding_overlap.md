# Headline标题栏与内容区内边距叠加重复
苏州市房地产监测V3 的 Headline 标题栏与内容区内边距叠加导致间距约 28px 重复问题。

## 问题根因
- Headline 标题栏 padding-bottom:12px 与 .collapse-content:not(.hide) 上内边距叠加
- 导致间距约 28px 超出预期

## 解决方案
- 撤销标题栏 padding-bottom
- 全局样式中将该内容区上内边距设为 12px（--detail-tab-stack-gap），左右下维持 16px（--detail-content-padding）

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/026.md
- 涉及文件：components/HeadTitle/index.vue、styles/index.scss、components/Headline/index.vue、styles/variables.css、components/detail-template/detail-template.vue、styles/mixin.scss、views/maintenance/final/components/projectFeeApplyTable.vue、e2e/detail/headline-spacing.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：167b3703-c8a7-49cb-99a1-7c5f83425618；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "headline_padding_overlap",
  "source_extraction_id": "c16e59fc81ec457286441b3da25ad8e7",
  "version": 1,
  "memory_type": "entities"
}
-->