# Vue3 Proxy $attrs 报错与 toRaw 修复
产品2.0（zhi2-web-admin）在 Vue3 中因 prop 为响应式 Proxy，直接删 $attrs 报错，改用 toRaw 拿原始对象后删除。

## 问题根因
- 作为 prop 的 `this.element` 是响应式 Proxy，直接访问或 `delete this.element.businessObject.$attrs[...]` 会走到代理上的 `$attrs`（只读、不可配置）
- 与 BPMN 业务对象上的 `$attrs` 冲突，导致 parseElement.js:4 Uncaught 报错

## 修复内容
- task.vue 从 vue 引入 `toRaw`：`import { defineAsyncComponent, toRaw } from 'vue'`
- 新增 `deleteFlowableAttr(key)`：用 `toRaw(this.element)`、`toRaw(bo.$attrs)` 拿原始对象后再 `delete attrs[key]`
- 所有直接删 `$attrs` 的地方（如 formData.userType watch 两处）改为调用该方法

## 验证与归属
- 涉及文件：task.vue、parseElement.js、startEnd.vue
- 所属项目：2-0（产品2.0）；来源会话：438ecac1-fc8f-4115-89d2-b8e10fee8055；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_proxy_fix",
  "source_extraction_id": "3a52587429214e928da433b2513702f3",
  "version": 1,
  "memory_type": "entities"
}
-->