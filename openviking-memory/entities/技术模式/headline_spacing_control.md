# Headline下间距由内容区上内边距控制
苏州市房地产监测V3 中 Headline 标题栏原 padding-bottom:12px 与内容区上内边距叠加致约28px，撤销后由 .collapse-content 上内边距统一控制为12px。

## 问题根因
- Headline 标题栏 `padding-bottom:12px` 与内容区上内边距叠加成约28px 重复留白

## 解决方案
- 撤销 Headline 的 `padding-bottom:12px`
- 全局样式将 `.collapse-content:not(.hide)` 上内边距改为 12px（变量 `--detail-tab-stack-gap`）
- 左右下内边距维持 16px（变量 `--detail-content-padding`），标题与下方间距固定12px

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/226.md
- 涉及文件：HeadTitle/index.vue、styles/index.scss、Headline/index.vue、variables.css、detail-template.vue、mixin.scss、projectFeeApplyTable.vue、e2e/detail/headline-spacing.spec.js
- 来源会话：167b3703-c8a7-49cb-99a1-7c5f83425618；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_spacing_control",
  "source_extraction_id": "4fe7174ff6a848f997b961c458a1194b",
  "version": 1,
  "memory_type": "entities"
}
-->