# 2016合同出卖人宽表双横向滚动条修复
苏州市房地产监测V3 中 `sz-contract.scss` 修复第一部分「出卖人」宽表出现两条横向滚动条的问题。

## 问题原因
- 外层 `.s16-party-table-wrap`（`overflow-x: auto`）与内层 el-table body-wrapper 溢出各开一条横向滚动条
- `.s16-scroll` 仅写 `overflow-y: auto`，x 轴被 CSS 隐式置为 `auto` 再叠一条

## 改动要点
- `.s16-scroll` 显式加 `overflow-x: hidden`
- `.s16-party-table-wrap` 内禁掉 el-table 内层 body/header-wrapper 横向滚动（`overflow-x: hidden !important`，压过 zs-table 运行时内联样式），表宽钉为 `100%`
- 效果：仅剩外层一条横向滚动条，表头与数据同步平移不错位

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/contract/chapters/suzhou2016/styles/sz-contract.scss、contract/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：3fa03048-8413-4019-ae3c-66f76f963cb6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_scrollbar_fix",
  "source_extraction_id": "eb974d84ed2446a982b5539521f0ce63",
  "version": 1,
  "memory_type": "entities"
}
-->