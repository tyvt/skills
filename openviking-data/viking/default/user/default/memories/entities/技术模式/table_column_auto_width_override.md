# 表格列未设 width 触发全局样式强制单行省略
苏住房G 评价/信用指标表格「指标名称」列因未设 width 被加 auto-width 类，全局样式强制单行省略。

## 问题根因
- src/views/evaluation/indicatorComponents/index.vue 共用表格「指标名称」列仅设 minWidth 未设 width
- 组件库加 zs-table-column--auto-width 类
- 全局样式 src/styles/element-ui.scss 对该类强制 white-space: nowrap !important 致单行省略

## 解决方案
- 组件内以更高特异性选择器 td.indicator-config__name-cell .cell 加 !important 覆盖
- 设置 white-space: normal 与 word-break: break-word 允许换行

## 验证与归属
- 验证证据：苏住房G/085.md
- 涉及文件：zhi2-web-admin/src/views/evaluation/indicatorComponents/index.vue、zhi2-web-admin/src/styles/element-ui.scss、zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue、zhi2-web-admin/src/views/credit/creditIndicator/index.vue、zhi2-web-admin/src/views/evaluation/indicatorBasicConfig/index.vue
- 所属项目：苏住房G；来源会话：ce112429-0d94-4d8f-98f1-35543c91d958；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_column_auto_width_override",
  "source_extraction_id": "8192fcebecfa468d86c9a9c151b01762",
  "version": 1,
  "memory_type": "entities"
}
-->