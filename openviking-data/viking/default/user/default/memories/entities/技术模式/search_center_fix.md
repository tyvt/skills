# 两行搜索栏垂直居中修复
苏州市房地产监测V3 的 zs-search-form 相关组件修复了两行搜索栏按钮与搜索项未垂直居中问题。

## 问题根因
- 多行布局里 el-row 在 isExpanded === false 时使用 align="top"，4~6 个搜索项时右侧搜索/重置顶对齐
- 超过两行但收起时 margin-top: 12px 也破坏居中

## 修改内容
- 新增 multiLineRowAlign：无展开按钮（4~6 项）或超过两行未展开时 → middle；仅展开后 → top
- 新增 multiLineButtonMarginTop：仅在展开态使用 -40px，其余为 0

## 涉及文件与归属
- 涉及文件：zs-search-form.vue、QueryResetButtons.vue、SearchFormItem.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：5d74e5ab-2eac-4349-9f53-ca8649792eab
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_center_fix",
  "source_extraction_id": "4b2de2a5bed3429c8dadec66071ab087",
  "version": 1,
  "memory_type": "entities"
}
-->