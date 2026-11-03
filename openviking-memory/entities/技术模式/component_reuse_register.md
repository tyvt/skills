# 跨目录复用子组件必须 import 并注册
在 Vue2/Options API 页面模板中使用 PascalCase/camelCase 自定义标签时，若未 import 并在 components 中注册，运行时会报 Failed to resolve component。

## 问题根因
- 从其他业务目录复用组件（如 company 下的 propertyContractTable.vue）必须在当前 SFC 显式 import 路径并注册。
- 未注册时 Vue 无法解析组件，报错 Failed to resolve component，与是否原生 custom element 无关。

## 解决方案
- 在当前 SFC 中显式 import 组件路径，并在 components 选项注册后再使用。
- 避免依赖全局注册或误认为原生 custom element。

## 验证与归属
- 验证证据：会话 1dad72c5：/toB/companyInfo 对应 companyRecord/detail.vue 使用 propertyContractTable 未注册导致解析失败。
- 涉及文件：zhi2-web-admin/src/views/toB/companyRecord/detail.vue；zhi2-web-admin/src/views/company/companyManagement/components/propertyContractTable.vue
- 所属项目：2-0；来源会话ID：1dad72c5-73f0-43c2-8c13-cda8490370ba；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "component_reuse_register",
  "source_extraction_id": "12c8bea9efd949bd9c1e84c070f2e9ac",
  "version": 1,
  "memory_type": "entities"
}
-->