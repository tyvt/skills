# zs-input 无金额格式化致预售面积精度异常
`zs-input` 无金额格式化致预售面积浮点精度暴露，编辑态替换 `amount-input` 并格式化两位小数。

## 问题根因
- `zs-input` 无金额格式化，预售面积浮点精度暴露

## 修复方案
- `PermitInfoPanel.vue` 编辑态替换 `zs-input` 为 `amount-input`（`unit="㎡"`、`:dot="2"`、`v-money` 自动格式化）
- 查看态 `presaleAreaText` 用 `formatFixedDecimal` 格式两位小数
- 空值编辑态返 `''`、查看态返 `'-'`

## 涉及文件
- zhi2-web-admin/src/views/presale/permit/（components/detail.vue、permitConstants.js、components/PermitInfoPanel.vue）
- zhi2-web-admin/src/views/projectManagement/buildinginfo/detail.vue
- zhi2-web-admin/src/views/contract/dialogs/pricingModeDialog.vue
- zhi2-web-admin 根目录（package.json、vite.config.js、src/main.js）

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/097.md
- 来源会话：52e97276-20ef-4050-8053-34217a106e19
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_input_format",
  "source_extraction_id": "b42df2619b2946769fe76a6a8ccd120a",
  "version": 1,
  "memory_type": "entities"
}
-->