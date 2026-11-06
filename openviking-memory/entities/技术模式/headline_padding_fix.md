# Headline内容区上内边距调整
苏州市房地产监测V3 全局调整 Headline 内容区上内边距为 12px，避免标题栏与内容区重复留白。

## 修改说明
- 撤销 Headline 标题栏的 padding-bottom:12px（会与内容区原有上内边距叠成约28px）
- 全局样式将 Headline 内容区（.collapse-content:not(.hide)）上内边距改为 12px（--detail-tab-stack-gap），左右下仍为 16px（--detail-content-padding）
- 标题行与下方表单/表格固定为 12px 间距

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：src/components/HeadTitle/index.vue、src/styles/index.scss、src/components/Headline/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：167b3703-c8a7-49cb-99a1-7c5f83425618；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_padding_fix",
  "source_extraction_id": "532c5184418545dea132530ce12ccb1a",
  "version": 1,
  "memory_type": "entities"
}
-->