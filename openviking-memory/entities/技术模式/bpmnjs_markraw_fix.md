# BpmnJS 实例需用 markRaw 避免响应式代理
产品2.0（zhi2-web-admin）中在 Vue 3 的 data() 里放置 new BpmnJS(...) 会触发 Proxy 只读属性报错。

## 问题根因
- Vue 3 的 data() 返回对象会被做成深度响应式（Proxy 包裹）
- bpmn-js 内部对象（如 moddle 的 $pkg）带有只读且不可配置的 data property
- Proxy 代理这些属性时触发 `'get' on proxy: property '$pkg' is a read-only and non-configurable data property`

## 解决方案
- 从 vue 导入 markRaw
- 创建 modeler 时用 markRaw 包裹：`this.modeler = markRaw(new BpmnJS({ ... }))`
- modeler 仍可在模板与 methods 正常使用（如 v-if="modeler"、this.modeler.importXML），只是不参与响应式

## 验证与归属
- 验证证据：会话 7a277917，BpmnJS 实例报 get on proxy $pkg 错误，改用 markRaw 修复
- 涉及文件：index.vue（含 BpmnJS 实例的组件）
- 所属项目：2-0（产品2.0）；来源会话：7a277917-5523-45af-a656-79143ad80af9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bpmnjs_markraw_fix",
  "source_extraction_id": "eab15e2643d8472fb3c8ad4f437a0997",
  "version": 1,
  "memory_type": "entities"
}
-->