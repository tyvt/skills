# Tab 内全局样式误清 Headline 内边距致要件贴边
苏州市房地产监测V3 的 zhi2-web-admin 中，备案详情置于 tabs--card 内，全局样式将 Tab 内 Headline 的 collapse-content 设 padding-top:0，导致编辑态外要件贴边。

## 问题根因
- 备案详情置于 tabs--card 内
- 全局样式将 Tab 内 Headline 的 collapse-content 设 padding-top:0
- 编辑态外要件贴边，无内边距

## 修复方案
- Tab 样式不再作用于 .appendix-section
- 为右栏要件恢复 padding: var(--detail-content-padding) !important
- 覆盖 AnnexUpload 的 height: calc(100% - 50px)

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/006.md
- 涉及文件：zhi2-web-admin/src/views/presale/entrustSale/detail.vue、src/styles/index.scss、src/views/presale/permit/components/PermitAppendixPanel.vue、src/components/AnnexUpload/index.vue、e2e/presale/entrust-sale-detail-layout.spec.js、src/views/company/companyManagement/components/AgencyBasicInfoForm.vue、src/views/presale/entrustSale/components/EntrustSaleAddAppendix.vue、src/views/supervision/bank/superviseBank/detail.vue
- 来源会话ID：51578e2c-0265-49db-bc23-9770861b7789；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tab_headline_padding",
  "source_extraction_id": "462201af45e742729b026ea5c07ddb26",
  "version": 1,
  "memory_type": "entities"
}
-->