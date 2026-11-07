# 附录标题与缩略图间距统一16px
设计稿规定标题与内容间距为16px，附录区域通过 padding 与注入 CSS 变量统一间距。

## 实现要点
- 于 presale-detail-section-stack 中为 .appendix-section 增 padding-top: 16px
- AppendixRequirementCard 缩略图区域改用 token APPENDIX_TITLE_TO_THUMB_GAP=16
- 由 AppendixRequirementGrid 注入 CSS 变量实现间距控制

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：872e66a4-1acc-44d6-ac4e-811259ddf984
- 验证证据：cursor 会话 872e66a4-1acc-44d6-ac4e-811259ddf984
- 涉及文件：AppendixRequirementCard.vue、AnnexUpload/index.vue、AppendixRequirementGrid.vue、presale/permit/components/detail.vue、appendix-requirement-grid.scss、Headline/index.vue、register-form.scss、utils/appendix.js
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_title_gap",
  "source_extraction_id": "ceefa154fa254c5592af0cd4cc7071e5",
  "version": 1,
  "memory_type": "entities"
}
-->