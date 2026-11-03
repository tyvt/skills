# 搜索表单多行垂直居中修复
苏州市房地产监测V3 中 `zs-search-form` 组件在多行搜索时因 `el-row` 的 `align="top"` 与 `margin-top` 导致按钮未垂直居中。

## 问题根因
- `isExpanded===false` 时 `el-row` 使用 `align="top"`，4~6 搜索项两行无展开按钮时右侧按钮顶对齐
- 超两行收起时 `margin-top:12px` 亦破坏居中

## 解决方案
- 新增 `multiLineRowAlign`：无展开按钮或超两行未展开为 `middle`，展开为 `top`
- 新增 `multiLineButtonMarginTop`：仅展开态 `-40px`，其余 `0` 实现垂直居中

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/125.md
- 涉及文件：zhi2-web-admin/src/components/zs-search-form/zs-search-form.vue、QueryResetButtons.vue、SearchFormItem.vue
- 所属项目：苏州市房地产监测V3；来源会话：5d74e5ab-2eac-4349-9f53-ca8649792eab；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_form_align",
  "source_extraction_id": "49b1868bc018469f96c995906c65075e",
  "version": 1,
  "memory_type": "entities"
}
-->