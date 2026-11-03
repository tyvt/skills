# zs-table-column 内嵌复杂控件列宽修复
在子表内用 zs-table-column 内嵌 zs-select/zs-input 等复杂控件时，列宽会被压到约 80px，需改用 min-width。

## 问题根因
- zs-table 默认列宽按纯文本测算 + 剩余宽度均分，对单元格内是表单控件一无所知
- 复杂控件无文本宽度可测算，结果趋近最小值，被压成窄缝；固定 width 也因参与均分冲突而无效

## 解决方案
- 将列固定 width 改为 min-width，保证输入所需最小宽度
- 关键列显式加宽（如回调地址列 260px）
- 表格整体设 width:100%，使剩余空间分配有意义
- 查看模式空值统一显示 -；详情加载保证数组字段始终为数组避免渲染异常
- 列表页纯文本列仍走默认测算，不要照抄 min-width

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/system/syncLog/index.vue
- 所属项目：产品2.0
- 来源会话ID：d9f3c68c-3ec6-4725-adf0-590b032f0388
- 代码基线：1d563df

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_col_width",
  "source_extraction_id": "2c4fb9e23b1f49d3949a5b972ee566fe",
  "version": 1,
  "memory_type": "entities"
}
-->