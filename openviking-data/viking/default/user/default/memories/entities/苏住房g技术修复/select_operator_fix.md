# 公共查询下拉字段操作符异常修复（苏住房G）
苏住房G 项目修复公共查询高级筛选中下拉类字段（行政区域、物业类型、信用等级）错误出现「大于」等操作符导致后端报错的问题。

## 问题原因
- 高级筛选组件 `zs-advanced-query` 将选择类字段当成数值/日期字段，操作符出现「大于」等选项，提交后后端报错

## 修复内容
- `complexFieldConfig.js` 新增 `SELECT_OPERATORS` 仅含「等于」，选择类字段（`valueType === 'select'`）只返回该列表，并增加 `fixedOperator` 标记强制提交 `EQ`
- `zs-advanced-query.vue` 选择字段后自动将操作符设为「等于」、下拉框禁用不可改、回显已有条件时选择类字段也纠正为「等于」

## 效果与验证
- 物业管理区域查询中选择行政区域等下拉字段，操作符自动为「等于」且不可编辑，避免「行政区域 大于 高新区」类服务器异常
- 所属项目：苏住房G；来源会话：c97f319c-5174-4600-8411-186ea4f2a5d6；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：`complexFieldConfig.js`、`zs-advanced-query.vue`、`publicQuery/complex/index.vue`

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "select_operator_fix",
  "source_extraction_id": "6c711be48c694126ab487e463c9d3689",
  "version": 1,
  "memory_type": "entities"
}
-->