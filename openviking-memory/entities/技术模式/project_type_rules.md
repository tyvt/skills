# 项目类型校验分散致错误提示静默
园区公共收益(zhi2-web-admin)分散的 rules 导致 projectType 校验错误未在可见字段显示。

## 问题根因
- 分散的 rules 导致 projectType 校验错误未在可见字段显示

## 解决方案
- 在 projectTypeRules.js 新增 createProjectTypeRules 统一处理未选一级与子类型校验提示
- 于 complex/detail.vue 与 complexChange/detail.vue 移除隐藏的 projectSubType 表单项

## 涉及文件
- src/views/property/complex/components/projectTypeRules.js、projectTypeConstants.js
- src/views/property/complex/detail.vue、ProjectTypeCascadeSelect.vue
- src/mixins/form.js、src/views/property/complexChange/detail.vue

## 验证与归属
- 验证证据：src=园区公共收益/016.md
- 来源会话ID：76645e4d-9f4d-4dff-9aa8-1c457e2f7af1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_type_rules",
  "source_extraction_id": "b3c359ee43174392b704337490851bd2",
  "version": 1,
  "memory_type": "entities"
}
-->