# Headline 区块纵向间距统一为16px
苏州市房地产监测V3 通过 presale-detail-section-stack 包裹各 Headline 修复机构/租赁等区块间距过挤。

## 变更内容
- 在 AgencyEntryNetworkSections.vue、LeaseEntryNetworkSections.vue、DeveloperEntryNetworkSections.vue 中用 presale-detail-section-stack 包裹各 Headline
- index.scss 中 lease-entry-network-sections 增加间距规则，全局样式统一 16px 纵向间距和白卡片分段
- 模板缩进按 ESLint 自动修正

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：AgencyEntryNetworkSections.vue、LeaseEntryNetworkSections.vue、DeveloperEntryNetworkSections.vue、index.scss
- 所属项目：苏州市房地产监测V3；来源会话：8c3c7790-3198-42c7-8854-d0b971635778；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_spacing_16px",
  "source_extraction_id": "2c79c87a304d4b9a9dcb02329c6a7a73",
  "version": 1,
  "memory_type": "entities"
}
-->