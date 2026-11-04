# 步骤组件不应重复块标题
在苏州市房地产监测V3项目中，`institutionRegister/index.vue` 移除了步骤2中冗余的 `<h2>管理员信息</h2>`，并直接渲染 `Step2AdminInfo`，避免与步骤条上的标题重复。

## 实现
- `institutionRegister/index.vue` 步骤2移除了冗余的 `<h2>管理员信息</h2>`
- 直接渲染 `Step2AdminInfo` 组件
- 避免重复步骤条上已有的标题

## 验证与归属
- 验证证据: extracted source=cursor session=e6a70106-1904-4b9e-9ff5-cc44b3452aa4
- 涉及文件: institutionRegister/index.vue, institutionRegister/components/Step2AdminInfo.vue, register/companyRegister.vue
- 所属项目: 苏州市房地产监测V3; 会话: e6a70106-1904-4b9e-9ff5-cc44b3452aa4; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "step_dup_heading",
  "source_extraction_id": "6433a7001a3e48e3b87e2ed8833cfa99",
  "version": 1,
  "memory_type": "entities"
}
-->