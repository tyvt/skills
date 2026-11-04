# 修复带有 zs 前缀的 Vue 闭合标签
在 苏州市房地产监测V3 项目中，闭合标签 `</el-input>` 和 `</el-button-group>` 被错误地写成了 `</zs-input>` 和 `</zs-button-group>`，导致 Vite 编译错误。

## 描述
- Vue 模板中 commercialHousingSales 和 contract 目录下的标签不匹配错误
- 所属项目: 苏州市房地产监测V3

## 问题根因
- 在 `contractRevoke/detail.vue` 第 207 行和 `saleAgencyDialog.vue` 第 38 行，闭合标签使用了 `zs-` 前缀而不是 `el-`

## 解决方案
- 已修正为带有 `el-` 前缀的正确标签
- 修正后，对 `commercialHousingSales` 和 `contract` 目录下的模板扫描通过

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/032.md
- 涉及文件: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/commercialHousingSales/presale/contractRevoke/detail.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/tables/MortgageEntitiesTable.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/tables/CommercialHousingTable.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/chapters/cash/chapter1.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/components/tables/PricingModeTable.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/dialogs/saleAgencyDialog.vue
- 源会话: c7884ca9-0f78-4e4e-9359-8fa478960362; 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_zs_tag_fix",
  "source_extraction_id": "9e8fdb1f8e9d4c00b0343d17cab91324",
  "version": 1,
  "memory_type": "entities"
}
-->