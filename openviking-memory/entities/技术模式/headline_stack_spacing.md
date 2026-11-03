# 区块标题统一栈容器间距
苏州市房地产监测V3 中企业/机构详情各区块 Headline 间距过挤，采用 presale-detail-section-stack 包裹统一 16px 纵向间距与白卡片分段。

## 问题根因
- 各区块 Headline 间距过挤，因未使用统一栈容器包裹
- AgencyEntryNetworkSections、LeaseEntryNetworkSections、DeveloperEntryNetworkSections 等区块标题直接平铺

## 解决方案
- 采用 presale-detail-section-stack 包裹各 Headline
- 全局样式统一 16px 纵向间距与白卡片分段
- index.scss 中 lease-entry-network-sections 规则同步调整

## 涉及文件
- AgencyEntryNetworkSections.vue、LeaseEntryNetworkSections.vue、DeveloperEntryNetworkSections.vue
- AgencyBasicInfoDetail.vue、Headline/index.vue、index.scss、companyRecord.js
- agencyBasicInfoContent.js、companyBasicInfoShared.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/009.md
- 所属项目：苏州市房地产监测V3；来源会话：8c3c7790-3198-42c7-8854-d0b971635778；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_stack_spacing",
  "source_extraction_id": "eb40dec2781a45a9a11c09c062168035",
  "version": 1,
  "memory_type": "entities"
}
-->