
# OperationBtnGroup渲染报错修复
园区物管2.0 的 pubElevMaintenanceNew 页面因 OperationBtnGroup 缺少必要属性且 businessName 误用导致读取 undefined 的 bug 与修复。

## 问题根因
- OperationBtnGroup 渲染时访问 form[primaryKey] 用于打印按钮 url-params
- detail.vue 未传入 :form、:primaryKey、:moduleName、:businessName
- 错误写 business-name="benefit:pubElevMaintenanceNew" 把权限字符串当成 businessName
- primaryKey 为 undefined 且 form 未传入时触发 Cannot read properties of undefined (reading 'undefined')

## 修复方案
- 为 operation-btn-group 补全必要属性，与 pubElevMaintenance/detail.vue 保持一致
- 新增计算属性按路由区分业务：EnergyDeclaration → pubElevMaintenanceNew/maintainId；其他路由 → pubPublicEnergyConsumption/consumptionId
- 发布按钮权限改为动态：${moduleN...（原文截断，保留动态权限意图）

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：问题已修复，会话 99b102a3 给出修改内容
- 涉及文件：pubElevMaintenanceNew/index.vue、components/expendTable.vue、pubElevMaintenance/detail.vue 等
- 所属项目：园区物管2.0；来源会话：99b102a3-dcff-4e89-a5a6-982a16f73b88；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_btn_group_fix",
  "source_extraction_id": "590443c3f99d4bf09846992fd31e3d90",
  "version": 1,
  "memory_type": "entities"
}
-->