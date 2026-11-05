# 物业管理区域项目类型校验修复
修复园区公共收益项目物业管理区域备案与变更页「项目类型」保存时校验错误静默失败的问题，改为在可见字段显示错误。
## 修改说明
- 新增 projectTypeRules.js 的 createProjectTypeRules(getProjectSubType)，统一一级与二级校验：未选一级提示「项目类型不能为空」，只选一级提示「请至少选择一项项目子类型」。
- triggerProjectTypeValidate 仅触发 projectType 字段校验。
- complex/detail.vue 与 complexChange/detail.vue 使用 createProjectTypeRules(() => this.form.projectSubType) 替换原先分散 rules。
- 移除隐藏的 projectSubType 表单项，数据仍由逻辑保留。
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/projectTypeRules.js、property/complex/detail.vue、property/complexChange/detail.vue
- 所属项目：园区公共收益；来源会话：76645e4d-9f4d-4dff-9aa8-1c457e2f7af1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "projecttype_validation_fix",
  "source_extraction_id": "044e3b4a996244d2bf42860f06972767",
  "version": 1,
  "memory_type": "entities"
}
-->