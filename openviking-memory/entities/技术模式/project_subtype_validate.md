# 级联项目类型单级保存校验静默失败修复
物业管理区域等项目类型为「一级 + 子类型」级联时，el-form rules 只挂在已隐藏的 projectSubType 表单项会导致只选一级保存时可见输入框不报错。

## 问题根因
- el-form rules 只挂在已移除/隐藏的 projectSubType 表单项，Element 不会在可见「项目类型」输入框下报错
- 表现为保存无反应、无提示，complex/detail 只选住宅一级无法保存

## 解决方案
- 抽 createProjectTypeRules(getProjectSubType)，一级报「项目类型不能为空」、二级报「请至少选择一项项目子类型」
- triggerProjectTypeValidate 只触发 projectType 字段
- 子类型数据仍由 ProjectTypeCascadeSelect 写 form.projectSubType，但不必保留独立表单项
- 改为可见字段 projectType 统一校验并通过自测表验证三条场景

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/projectTypeRules.js、property/complex/detail.vue、property/complexChange/detail.vue
- 所属项目：园区公共收益；来源会话：76645e4d-9f4d-4dff-9aa8-1c457e2f7af1；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "project_subtype_validate",
  "source_extraction_id": "7f591e2941124ffe888ff01baea64df3",
  "version": 1,
  "memory_type": "entities"
}
-->