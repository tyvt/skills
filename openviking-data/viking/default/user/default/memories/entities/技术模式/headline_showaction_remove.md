# Headline 恢复展开和收起（去除 showAction false）
在 zhi2-web-admin（产品 2.0）中，带有 :showAction="false" 的 Headline 组件隐藏了展开和收起按钮。

## 问题
- 带有 :showAction="false" 的 Headline 隐藏了展开和收起按钮
- committeeTable.vue、managementOrgPanel.vue、regulatoryAccountPanel.vue 和 detail.vue 需要恢复该行为

## 解决方案
- 在 committeeTable.vue、managementOrgPanel.vue、regulatoryAccountPanel.vue 和 detail.vue 中移除 :showAction="false"
- 运营资产信息块保持 v-model="showBenefitTable" 默认展开
- buildingTable.vue 和 propertyContractTable.vue 也进行了调整

## 验证与归属
- 涉及文件: publicQuery/complex/detail.vue, publicQuery/complex/components/committee

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_showaction_remove",
  "source_extraction_id": "0edb7cc648894aa9871156f6c2fe3d68",
  "version": 1,
  "memory_type": "entities"
}
-->