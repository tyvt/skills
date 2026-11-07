# zs-select 高度不齐：el-select 内层改为 .el-select__wrapper
zhi2-web-admin 搜索区 zs-select 在 Element Plus 下因旧选择器命不中而高度与其他组件不一致。

## 问题根因
- 老样式只针对 .el-input__inner 设 min-height
- Element Plus 的 el-select 主容器是 .el-select__wrapper，旧选择器命不中

## 解决方案
- 在 zs-search-form 用 :deep 为 .el-form-item__content > .el-select .el-select__wrapper 补 min-height/height（如 38px）与 box-sizing: border-box
- 与 input/cascader/date-editor 同一套高度

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 5243d3e5，zs-select 尺寸与其他组件不一致，补 el-select__wrapper 高度样式
- 涉及文件：zhi2-web-admin/src/components/zs-search-form/zs-search-form.vue
- 所属项目：2-0（产品2.0）；来源会话：5243d3e5-5f28-4d11-a612-08a460e721ca；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsselect_wrapper_height",
  "source_extraction_id": "4ed02f8bfd3c4575a720e18d89269ce4",
  "version": 1,
  "memory_type": "entities"
}
-->