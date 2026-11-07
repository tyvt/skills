# 嵌套宽表多重横向滚动须外层单滚动防错位
苏州市房地产监测V3 中嵌套宽表因多重隐式 `overflow-x: auto` 叠加致横向滚动条重复与表头错位，须仅保留外层单滚动。

## 问题根因
- `.s16-party-table-wrap`、el-table body-wrapper 与 `.s16-scroll` 隐式 `overflow-x: auto` 多重叠加
- 导致横向滚动条重复与表头错位

## 解决方案
- 在 `sz-contract.scss` 为 `.s16-scroll` 加 `overflow-x: hidden`
- 对 `.s16-party-table-wrap` 内 el-table 的 body/header-wrapper 设 `overflow-x: hidden !important` 并钉宽 `100%`
- 仅保留外层单滚动

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/308.md
- 涉及文件：contract/index.vue、sz-contract.scss、SzPartyBlock.vue、chapter1.vue、tableComponents.js、zs-table.vue
- 所属项目：苏州市房地产监测V3；来源会话：3fa03048-8413-4019-ae3c-66f76f963cb6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "nested_table_single_scroll",
  "source_extraction_id": "38445eb31c6a47e2ac30471981805d26",
  "version": 1,
  "memory_type": "entities"
}
-->