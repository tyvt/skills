# 组件内动态导入须用 defineAsyncComponent
zhi2-web-admin 中组件内 `() => import(...)` 动态组件需全局替换为 `defineAsyncComponent`。

## 规则
- 组件内动态组件写法 `() => import(...)` 需全局替换为 `defineAsyncComponent(() => import(...))`
- 涉及 views/index.vue 等 20 个文件

## 例外
- 路由与权限中的 `component: () => import(...)` 由 Vue Router 处理路由懒加载，保持原样不修改

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：src=2-0/007.md
- 涉及文件：zhi2-web-admin/src/views/index.vue 等 20 个文件
- 所属项目：2-0（产品2.0）；来源会话：b06efc30-d150-4428-a1c0-f054d8e38798；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "define_async_component",
  "source_extraction_id": "9b7970b9216d41dfac7377ac2dcc844d",
  "version": 1,
  "memory_type": "entities"
}
-->