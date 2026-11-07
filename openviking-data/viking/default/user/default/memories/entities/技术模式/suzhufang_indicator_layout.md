# 苏住房G 基础信息列表表格排布优化
苏住房G 项目完成基础信息列表（及良好/不良共用列表）表格排布优化并修复 `zs-table-column` 问题。
## 主要改动
- `indicatorComponents/index.vue`：列宽设指标编号160、指标分类120、指标名称240、选项明细 slotWidth:300、启用状态 slotWidth:100、业务状态100、业务时间110；指标名称 `showOverflowTooltip:false` + `indicator-config__name-cell` 多行换行；选项明细单行 nowrap，表格加 `indicator-config-table` 横向滚动；`itemList` 的 `v-for` 增 `:key`
- `zs-table-column.vue` 合并列配置 `className` 与弹性列 `zs-table-column--auto-w`
## 涉及文件与归属
- 涉及 `indicatorComponents/index.vue`、`zs-table-column.vue`、`creditIndicator/index.vue`
- 所属项目：苏住房G；来源会话：b3a9c220-7fdb-4c57-9aa9-ea701de8f93b；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_indicator_layout",
  "source_extraction_id": "47bc4314ee6040b39df5c2f234d4de2f",
  "version": 1,
  "memory_type": "entities"
}
-->
