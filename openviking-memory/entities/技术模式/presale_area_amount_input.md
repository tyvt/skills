# 预售面积字段切换为 amount-input 组件
在 苏州市房地产监测V3 模块中，PermitInfoPanel.vue 在编辑模式下使用 amount-input 替代 zs-input 用于货币值输入。

## 变更点
- PermitInfoPanel.vue 在编辑模式下使用 amount-input (unit="㎡", :dot="2", v-money) 替代 zs-input
- 查看模式通过 formatFixedDecimal 格式化
- presaleAreaValue 为空时返回 ''
- presaleAreaText 为空时返回 '-'

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/145.md
- 涉及文件: presale/permit/components/detail.vue, presale/permit/permitConstants.js, presale/permit/components/PermitInfoPanel.vue, projectManagement/buildinginfo/detail.vue, package.json, contract/dialogs/pricingModeDialog.vue, vite.config.js, main.js
- 会话: 52e97276-20ef-4050-8053-34217a106e19; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_area_amount_input",
  "source_extraction_id": "afd68a6c072143ec9e83e94f7a4a492d",
  "version": 1,
  "memory_type": "entities"
}
-->