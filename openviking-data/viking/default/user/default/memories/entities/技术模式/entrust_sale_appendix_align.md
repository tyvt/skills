# 委托代售要件上传对齐全局并隐藏附件抽屉
苏州市房地产监测V3预售委托代售重构 EntrustSaleAddAppendix.vue 复用全局 FileList/ImageGrid 对齐 AnnexUpload 样式与工具栏，并隐藏查看态附件抽屉避免重复。

## 修复方案
- 重构 `EntrustSaleAddAppendix.vue` 复用 `FileList`/`ImageGrid` 组件，对齐 `AnnexUpload` 样式与工具栏
- `detail.vue` 设置 `:show-attachment="false"`，避免查看态附件抽屉与内联区块重复展示
- 业务逻辑与 E2E 选择器保持不变

## 涉及文件
- presale/entrustSale/detail.vue、presale/entrustSale/components/EntrustSaleAddAppendix.vue
- src/main.js、src/components/AnnexUpload/index.vue、src/utils/appendix.js
- e2e/fixtures/entrust-sale-helpers.js、e2e/fixtures/institution-helpers.js
- e2e/presale/entrust-sale-real-api-flow.spec.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/079.md
- 来源会话：ea5712c4-59ac-4c16-8f4b-79c895e6b7b4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_sale_appendix_align",
  "source_extraction_id": "88ea79ae85784da2bf423cd701fea8a0",
  "version": 1,
  "memory_type": "entities"
}
-->