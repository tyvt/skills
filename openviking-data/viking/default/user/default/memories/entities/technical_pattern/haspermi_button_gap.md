# 权限指令包裹按钮留空flex子项致间距异常
苏州市房地产监测V3 中 `v-hasPermi` 指令包裹按钮且内层 `v-if` 不显示时，留空 flex 子项占位导致按钮间距异常。

## 问题根因
- `ContractOperationActions` 中 `v-hasPermi` 包裹按钮，内层 `v-if` 不显示时留空 flex 子项
- `.buttons` 使用 `display:flex` + `gap`，空子项占位致间距异常

## 解决方案
- 修复 `src/views/contract/components/ContractOperationActions.vue`：将 `v-hasPermi` 直写 `zs-button`，「重签」改 `v-if`
- 于 `sz-contract.scss` 对 `.buttons > div:empty` 设 `display:none` 兜底

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/096.md
- 涉及文件：ContractOperationActions.vue、contract/index.vue、OperationBtnGroup/index.vue、sz-contract.scss、ZsPrint/index.vue、directives/permission/hasPermi.js
- 所属项目：苏州市房地产监测V3；来源会话：01a162e0-b3c0-70c5-a400-760bb8192dbc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "haspermi_button_gap",
  "source_extraction_id": "e144584a2db34952bb1d629f14ca179b",
  "version": 1,
  "memory_type": "entities"
}
-->