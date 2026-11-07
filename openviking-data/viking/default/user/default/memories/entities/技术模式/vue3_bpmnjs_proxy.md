# Vue3 BpmnJS Proxy报错规避
Vue3 中 data() 返回对象被 Proxy 深度代理，BpmnJS 实例内部只读 $pkg 属性触发报错，使用 markRaw 包裹可避免。

## 问题根因
- Vue3 的 data() 返回对象被 Proxy 深度代理
- BpmnJS 实例内部只读 $pkg 属性在代理下触发报错

## 解决方案
- 从 vue 导入 markRaw 并包裹 new BpmnJS(...)
- 模板与 methods 仍可正常调用实例方法

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：index.vue
- 所属项目：2-0；代码基线：none
- 验证证据：src=2-0/016.md
- 来源会话ID：7a277917-5523-45af-a656-79143ad80af9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_bpmnjs_proxy",
  "source_extraction_id": "1c14e868233949f988121dd48731d257",
  "version": 1,
  "memory_type": "entities"
}
-->