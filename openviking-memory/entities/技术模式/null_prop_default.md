# 对象 prop 传 null 不触发 default 致常驻弹窗崩溃
常驻挂载的预览/详情弹窗组件，对象型 prop 显式传 null 会绕过 Vue 的 default 机制，渲染期读取属性崩溃。

## 问题现象
- 弹窗常驻模板（非 v-if）里渲染 KnowledgePreviewDialog，父组件把数据对象初始为 null，弹窗未打开也报「Cannot read properties of null (reading 'title')」渲染错误

## 根因
- Vue 的 prop 默认值 default: () => ({}) 只在传入值为 undefined 时生效
- 显式传 null 绕过默认值机制，子组件模板直接 knowledge.title 就崩

## 解决方案
- 子组件内加计算属性做 null 归一化（knowledgeData = this.knowledge || {}），模板与派生列表都经计算属性访问
- 操作类方法（如 handleQuote）对 knowledge 为空直接 return 守卫
- 约定：常驻挂载的预览/详情弹窗组件一律通过归一化计算属性消费对象型 prop，不要信任 prop 默认值能兜住 null；父组件初始值用 null 表示「无」时尤其要注意

## 验证与归属
- 验证证据：会话 4041b099，previewKnowledge 初始 null 且弹窗始终挂载；结论指出 default 只对 undefined 生效，新增 knowledgeData 计算属性归一化并加空守卫
- 涉及文件：zhi2-web-admin/src/views/property/workOrder/order/components/KnowledgePreviewDialog.vue；zhi2-web-admin/src/views/property/workOrder/order/components/WorkOrderActionDialog.vue
- 所属项目：产品2.0；来源会话ID：4041b099-030a-481a-8753-6ecca6c475fd；代码基线：42b6033

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "null_prop_default",
  "source_extraction_id": "c8b52637b66a4cfba2ab5391cdb691f9",
  "version": 1,
  "memory_type": "entities"
}
-->