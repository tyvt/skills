# 要件上传区块 16px 间距修复
苏州市房地产监测V3 为「要件上传」相关区块补上 16px 间距，涉及预售许可等页面两处。

## 修改内容
- 「要件上传」区块标题与宫格：`presale-detail-section-stack` 中 `appendix-section` 内容区加 `padding-top: 16px`
- 单个要件名称行与缩略图：`AppendixRequirementCard` 缩略图区域上边距由 12px 改为 token `APPENDIX_TITLE_TO_THUMB_GAP = 16`（经 `AppendixRequirementGrid` 注入 CSS 变量）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 刷新预售许可申请详情查看效果；可要求只改其中一处
- 所属项目：苏州市房地产监测V3；来源会话：872e66a4-1acc-44d6-ac4e-811259ddf984
- 涉及文件：`src/components/AnnexUpload/components/AppendixRequirementCard.vue`、`src/components/AnnexUpload/index.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_gap_fix",
  "source_extraction_id": "638fb30e6cd94513816c8de2632f1313",
  "version": 1,
  "memory_type": "entities"
}
-->