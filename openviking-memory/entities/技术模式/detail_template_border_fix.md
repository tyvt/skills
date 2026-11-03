# .detail-template设无边框误删外框
苏州市房地产监测V3预售许可详情页在 index.scss 中将 Tab 内 .detail-template 设 border:none 误删默认外框，已改为仅保留 margin-bottom:0。

## 问题根因
- index.scss 中将 Tab 内 .detail-template 设 border: none 以去除三层框
- 误删 DetailTemplate 默认 1px #f0f0f0 外框

## 修复方案
- 仅保留 margin-bottom: 0 避免 Tab 底边空白
- 不再去除边框以恢复左侧只读网格外框

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/043.md
- 涉及文件：permit/detail.vue、PermitInfoPanel.vue、PermitAppendixPanel.vue、detail.vue、detail-template.vue、Headline/index.vue、index.scss、AnnexUpload/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：93be20d8-831b-48da-b8df-1a5b31730ca5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_border_fix",
  "source_extraction_id": "5433c232efe34458a8cf874c6e884567",
  "version": 1,
  "memory_type": "entities"
}
-->