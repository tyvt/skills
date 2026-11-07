# 信用指标名称列换行修复
苏住房G(zhi2-web-admin)信用指标库基础/良好/不良信息列表页修复"指标名称"列单行省略问题。

## 问题根因
- 该组件为三个列表页共用表格，"指标名称"列只设 `minWidth` 无 `width`，被组件库判定为弹性列并加 `zs-table-column--auto-width` 类
- 全局样式 `src/styles/element-ui.scss` 对这类单元格强制 `white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important`，压住换行

## 解决方案
- 改动 `src/views/evaluation/indicatorComponents/index.vue`
- 将"指标名称"单元格换行规则提升到更高特异性并加 `!important`，显式抵消全局 auto-width 规则
- 使用 `::v-deep .indicator-config-table .el-table td.indicator-config__name-cell .cell { white-space: normal !important; word-break: break-word !important; }`

## 验证与归属
- 涉及文件：evaluation/indicatorComponents/index.vue、src/styles/element-ui.scss、credit/creditIndicator/index.vue
- 所属项目：苏住房G；来源会话：ce112429-0d94-4d8f-98f1-35543c91d958；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "indicator_name_wrap",
  "source_extraction_id": "fc267760b60448b0969348d7d12b352f",
  "version": 1,
  "memory_type": "entities"
}
-->