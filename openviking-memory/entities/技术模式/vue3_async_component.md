# Vue3 局部异步组件须用 defineAsyncComponent
Vue3 在 `components` 选项里直接写 `() => import(...)` 会把 Promise 当组件渲染，须改用 `defineAsyncComponent` 包裹。

## 问题根因
- 在 `components` 选项写 `Foo: () => import('...')`，Vue3 会把 Promise 当组件渲染，页面出现 `[object Promise]`（如 Settings、attachmentDraw 等）

## 解决方案
- `import { defineAsyncComponent } from 'vue'` 并写 `Foo: defineAsyncComponent(() => import('...'))`

## 边界与归属
- 路由表 `component: () => import(...)` 与 `store/modules/permission.js` 动态路由组件赋值保持原样，由 Vue Router 处理懒加载，不要套 defineAsyncComponent
- 验证证据：会话 b06efc30 中 Settings 显示 [object Promise]，全局 20 个文件替换且明确未改 router/permission；另会话 d4e317f1 将在 views/home/index.vue、views/system/config/detail.vue 等文件的 components 选项内直接函数导入改写为 defineAsyncComponent 形式（src=2-0/009.md）
- 涉及文件：zhi2-web-admin/src/layout/components/Settings/index.vue、zhi2-web-admin/src/components/OperationBtnGroup/attachmentDraw.vue、zhi2-web-admin/router/index.js、zhi2-web-admin/src/store/modules/permission.js、zhi2-web-admin/src/views/home/index.vue、zhi2-web-admin/src/views/system/config/detail.vue
- 所属项目：2-0；来源会话：b06efc30-d150-4428-a1c0-f054d8e38798、d4e317f1-0c0f-4664-a597-3028cba67933；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue3_async_component",
  "source_extraction_id": "6fe784494645457794d83b09b9193f65",
  "version": 2,
  "memory_type": "entities"
}
-->