# 全局mixin与组件formMode同名冲突修复
修复苏州市房地产监测V3中全局mixin注入的formMode computed与组件prop同名触发Vue警告的问题。
## 问题根因
- main.js 通过全局mixin为所有组件注入 formMode computed（从路由 query.formMode 或路径推断）
- PermitInfoPanel 声明同名 formMode prop，与全局 computed 冲突，触发 vue.js:5108 [Vue warn]
## 修复方案
- PermitInfoPanel.vue 删除 formMode prop，isView 继续使用全局mixin的 this.formMode
- detail.vue 移除两处多余的 :form-mode="formMode" 传参
- 行为不变：子组件仍通过路由解析得到 view/add
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：main.js、PermitInfoPanel.vue、detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：c8141e9b-07dc-46ab-b4d6-78d2e9881aa2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "formmode_mixin_conflict",
  "source_extraction_id": "212c18051ff547cab1b52f1f1e9fd4df",
  "version": 1,
  "memory_type": "entities"
}
-->