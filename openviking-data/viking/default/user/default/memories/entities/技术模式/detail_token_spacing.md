# 在详情页中使用 tokens 统一间距
在项目 zhi2-web-admin (苏州市房地产监测V3) 中，将固定的 24px 值替换为间距 tokens。

## 变更
- `variables.css` 添加了诸如 `--detail-page-padding` 之类的 tokens
- `index.scss` 和 `Headline/index.vue` 替换了硬编码的 24px
- 移除了 `Headline` 中 `DetailTemplate` 的重复边框和重叠 margin

## 涉及的文件
- src/styles/index.scss
- src/components/Headline/index.vue
- src/views/projectManagement/customerProject/detail.vue
- src/components/detail-template/detail-template.vue
- src/layout/components/AppMain.vue
- src/mixins/detailMixins.js
- src/main.js
- src/views/projectManagement/buildinginfo/detail.vue

## 验证
- cursor 会话: 280dea0c-9d8d-46bc-8e8f-9208741e4322

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：280dea0c-9d8d-46bc-8e8f-9208741e4322


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_token_spacing",
  "source_extraction_id": "a4c1b4b28e954766b9f8128b10303b6f",
  "version": 1,
  "memory_type": "entities"
}
-->
