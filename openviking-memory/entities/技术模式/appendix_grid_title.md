# 要件网格标题行固定高度且操作区占位
AppendixRequirementCard.vue 同排要件标题高度不齐，固定标题行 40px 并常驻操作区占位以修复对齐。

## 问题现象
- 同排要件标题高度不齐，因长名称撑高及操作区按钮有无不一

## 修复方案
- AppendixRequirementCard.vue 固定 .requirement-grid 标题行 40px（背景 #f5f8ff、padding: 0 12px）
- 标题用 -webkit-line-clamp: 2 限制两行并增 :title 显示全称
- operable && cardOperable 时常驻 .requirement-header-actions（min-width: 72px）占位，仅未达上限显「文件上传」

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/181.md
- 涉及文件：AppendixRequirementCard.vue、AppendixRequirementGrid.vue、AppendixPackageSection/index.vue、Headline/index.vue、companyRecord/detail.vue、DeveloperBasicInfoForm.vue、QualificationFormSection.vue、index.scss
- 所属项目：苏州市房地产监测V3；来源会话：18659b1e-74a9-4c54-8baf-badd2b1f687e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_grid_title",
  "source_extraction_id": "d2f3bc9cdf3c4c72be8ab951414c7c0b",
  "version": 2,
  "memory_type": "entities"
}
-->