# Vue2异步组件写法致Vue3渲染Promise文本
TagsView/index.vue 中子组件使用 Vue2 异步写法，在 Vue3 下被当作函数组件返回 Promise 而渲染为 [object Promise]，需用 defineAsyncComponent 包裹。

## 现象
- TagsView/index.vue 的 ScrollPane、Hamburger 子组件使用 `() => import(...)` 的 Vue2 异步写法。
- Vue3 将其视为函数组件返回 Promise，渲染出 `[object Promise]` 文本。

## 根因
- Vue3 对 Vue2 遗留的 `() => import()` 异步组件语法不再兼容，需使用 defineAsyncComponent。

## 修复方案
- 改用 `defineAsyncComponent` 包裹异步组件，替换原有的 `() => import(...)` 写法。

## 关联信息
- 涉及文件：TagsView/index.vue。
- 来源会话：78c42ac6-3d01-4efb-aa4f-c62740fb9e52；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "vue2_async_component",
  "source_extraction_id": "5f4a8e9e8b1749e193841376524c88e4",
  "version": 1,
  "memory_type": "entities"
}
-->