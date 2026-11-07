# 预售域左右布局要件统一
苏州市房地产监测V3 中预售域备案详情 Tab 内要件上传区样式已修复，使查看态与编辑态左右内边距一致。

## 问题根因
- 备案详情在 Tab（tabs--card）里，全局样式会把 Tab 内所有 Headline 的 collapse-content 设为 padding-top:0 并去掉部分标题区样式
- 编辑态不在该 Tab 布局里，所以看起来正常，查看态异常

## 修复内容
- Tab 内样式不再作用于 .appendix-section（要件上传专用 Headline）
- 为 Tab 内右栏要件单独恢复 padding: var(--detail-content-padding) !important（与编辑态一致）
- 许可右栏下覆盖 AnnexUpload 的 height: calc(100% - 50px)，避免查看态列表贴边

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：presale/entrustSale/detail.vue、styles/index.scss、presale/permit/components/PermitAppendixPanel.vue
- 所属项目：苏州市房地产监测V3；来源会话：51578e2c-0265-49db-bc23-9770861b7789；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_appendix_layout",
  "source_extraction_id": "a43abec617b04cbbb35cf2e96893e74d",
  "version": 1,
  "memory_type": "entities"
}
-->