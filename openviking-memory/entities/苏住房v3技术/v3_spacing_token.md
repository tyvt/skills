# 详情页间距全局修复（16px token 体系）
苏州市房地产监测V3 完成详情页间距全局修复，统一为 16px 间距体系并消除 Headline 与 DetailTemplate 叠加。

## 变更内容
- `variables.css` 新增间距 token：`--detail-page-padding: 16px`、`--detail-section-gap: 16px`、`--detail-block-gap: 12px`、`--detail-content-padding: 16px`
- `index.scss` 与 `Headline/index.vue` 替换原 24px 硬编码为 token
- `index.scss` 消除 Headline + DetailTemplate 叠加：去重复边框和 margin-bottom；collapse-content 用 padding 替代 margin-top 叠加；Tab 区移除冗余 margin-top:12px 改用 token

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：280dea0c-9d8d-46bc-8e8f-9208741e4322
- 涉及文件：variables.css、index.scss、Headline/index.vue、customerProject/detail.vue
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "v3_spacing_token",
  "source_extraction_id": "1c43be6e1763445fbf0f4d5695251802",
  "version": 1,
  "memory_type": "entities"
}
-->