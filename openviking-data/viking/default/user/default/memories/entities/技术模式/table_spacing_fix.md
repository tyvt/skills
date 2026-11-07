# 表格容器底部间距样式修复
移除 zs-table-container--bottom-spacing 的 padding-bottom:12px，避免横向滚动条下方多余空白。

## 问题根因
- 该类在无可见分页时（如 total===0）由 zs-table 自动挂上
- 原意图是分页隐藏时给表格底部留空隙，与 padding-top:12px 对称
- padding 加在整个表格容器而非内容区，导致滚动条在容器内时下方多出 12px 空白

## 修复方案
- 去掉 .zs-table-container--bottom-spacing 的 padding-bottom:12px，仅保留 border-bottom 作为底部分隔
- 空表底边由 ::before 和 list-card 边框处理
- 建议若空表太贴边，将间距改到 list-card 的 padding-bottom 而非表格容器

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：benefit/pubHouse/index.vue、pubHouseTable.vue、property/complex/components/regionTree.vue
- 来源会话：c719772b-6ff9-441f-b247-7d29dfa7d3e2；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_spacing_fix",
  "source_extraction_id": "1361bd3813744042a98313dc80ef9a52",
  "version": 1,
  "memory_type": "entities"
}
-->