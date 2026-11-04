# 预售页面中带 justify 且输入框占满宽度的叙述行
在 Suzhou Real Estate Monitoring V3 项目中，叙述行使用了 text-align: justify，且输入框占满整行宽度，导致错位。

## 问题根因
- text-align: justify 使叙述行文本分散排列。
- 数字输入框默认占据整行。

## 解决方案
- 移除了 text-align: justify；叙述行使用 flex 与 flex-wrap。
- 文本包裹在 <span class="narrative-text"> 中。
- 输入框固定宽度：数字 88px，面积 108px，地名 280px。

## 文件与验证
- 涉及文件: PermitPlanPanel.vue, PresalePlanFillForm.vue, plan/detail.vue, detail.vue, Headline/index.vue, presale-permit-helpers.js, PermitAppendixPanel.vue.
- 验证证据: src=苏州市房地产监测V3-rest/057.md; session 3b1ff38c-e27a-4867-a215-6627c1d4380c.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_narrative_layout",
  "source_extraction_id": "ab08f4474f3d4570b5cc83bd74d094a3",
  "version": 1,
  "memory_type": "entities"
}
-->