# 多行搜索栏按钮对齐修复
多行搜索栏因el-row对齐与margin导致两行时按钮不居中，新增对齐与margin控制属性修复。

## 问题根因
- 多行布局 `el-row` 在 `isExpanded === false` 时使用 `align="top"`
- 收起态带 `margin-top: 12px`，致使 4~6 搜索项两行时右侧按钮顶对齐而不居中

## 解决方案
- 新增 `multiLineRowAlign`：无展开或收起态为 `middle`、展开态为 `top`
- 新增 `multiLineButtonMarginTop`：仅在展开态置 `-40px`、其余 `0`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/325.md
- 涉及文件：zs-search-form.vue、QueryResetButtons.vue、SearchFormItem.vue
- 所属项目：苏州市房地产监测V3；来源会话：5d74e5ab-2eac-4349-9f53-ca8649792eab；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_button_align",
  "source_extraction_id": "bcd04e9a91754eea9e43e07c2c83f87f",
  "version": 1,
  "memory_type": "entities"
}
-->