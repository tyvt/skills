# OperationBtnGroup 渲染期必传四件套：缺 :form/:primaryKey 会直接崩，businessName 不能填权限串

什么情况：详情页（pubElevMaintenanceNew/detail.vue）渲染时报 `Cannot read properties of undefined (reading 'undefined')`，错误定位在公共组件 OperationBtnGroup，页面本身看不出问题。为什么：OperationBtnGroup 内部渲染打印按钮时会访问 `form[primaryKey]` 来拼 url-params；页面若未传 `:form`、`:primaryKey`，primaryKey 为 undefined 且 form 也未传，渲染期直接崩溃。同时页面把权限串当成了 business-name（写成 `business-name="benefit:pubElevMaintenanceNew"`），导致 `moduleName` 未定义告警。怎么做：给 operation-btn-group 补全 `:form`、`:primaryKey`、`:moduleName`、`:businessName` 四个必要属性（可对齐同模块已有 detail.vue 的写法）；moduleName 与 businessName 分开——moduleName 是模块段、businessName 是业务名（不带模块前缀），发布类按钮权限按 `${moduleName}:${businessName}:publish` 动态拼；form 中须含业务主键字段（如 consumptionId/consumptionNo）供打印 url-params 使用。同一详情页按路由区分业务时，用 computed 按路由名返回不同的 moduleName/primaryKey 组合。

**验证证据**：会话最终结论：OperationBtnGroup 渲染访问 form[primaryKey]（打印按钮 url-params），页面未传 :form/:primaryKey/:moduleName/:businessName 且把权限串当 business-name 传入，报 Property "moduleName" is not defined 与 Cannot read properties of undefined (reading 'undefined')；修复为补全属性并新增按路由区分业务的 computed（EnergyDeclaration→pubElevMaintenanceNew/maintainId，其他→pubPublicEnergyConsumption/consumptionId）。

**涉及文件**：zhi2-web-admin/src/views/benefit/pubElevMaintenanceNew/detail.vue、zhi2-web-admin/src/components/OperationBtnGroup/index.vue、zhi2-web-admin/src/views/benefit/pubElevMaintenanceNew/components/expendTable.vue

**所属项目**：园区物管2.0
**来源会话**：99b102a3-dcff-4e89-a5a6-982a16f73b88
**代码基线**：fc994977f

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "btn_group_props",
  "source_extraction_id": "a7402af70cfa466c86fdee52d80cd310",
  "version": 2,
  "memory_type": "entities"
}
-->
