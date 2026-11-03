# 嵌套容器overflow-x叠加致宽表多横滚动条
苏州市房地产监测V3 中外层 .s16-party-table-wrap、内层 el-table body-wrapper 及 .s16-scroll 隐式 overflow-x:auto 叠加多条横向滚动条致表头错位。

## 问题根因
- 外层 `.s16-party-table-wrap`、内层 el-table body-wrapper 及 `.s16-scroll` 均隐式 `overflow-x: auto`
- 多条横向滚动条叠加导致表头错位

## 解决方案
- 在 `sz-contract.scss` 中为 `.s16-scroll` 添加 `overflow-x: hidden`
- 对 `.s16-party-table-wrap` 内 el-table 的 wrapper 设 `overflow-x: hidden !important` 与表宽 `100%`
- 仅保留外层横向滚动

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/107.md
- 涉及文件：zhi2-web-admin/src/views/contract/index.vue、sz-contract.scss、SzPartyBlock.vue、chapter1.vue、mixins/tableComponents.js、components/zs-table/zs-table.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：3fa03048-8413-4019-ae3c-66f76f963cb6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "s16_table_overflow",
  "source_extraction_id": "db8ea7dbd9be4e8bab0f903cf2e33840",
  "version": 1,
  "memory_type": "entities"
}
-->