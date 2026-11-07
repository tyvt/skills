# 公共表格列开关列空提示修复
苏住房G 项目修复 zs-table-column 组件 switch 类型列宽度不足与空 tooltip 问题。

## 问题根因
- switch 类型列固定宽度 60px，表头「状态」两字被 text-overflow: ellipsis 截断为「.」
- 所有列默认开启 showOverflowTooltip，开关列无文本内容仍触发空 tooltip 显示黑色空提示

## 修复内容
- 将 switch 列固定宽度从 60px 调整为 88px，保证表头「状态」正常显示
- 对 switch 类型列关闭 showOverflowTooltip，避免悬停空提示
- 修改文件：zs-table-column.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话：1cc96294-89aa-419f-a3f0-3c4fbc943d76
- 涉及路径：zhi2-web-admin/src/views/property/workOrder/category 等

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workorder_switch_fix",
  "source_extraction_id": "430454bfe60c45a1a179cfb3e392ff41",
  "version": 1,
  "memory_type": "entities"
}
-->