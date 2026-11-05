# Vue 组件内动态导入改用 defineAsyncComponent
产品2.0前端将组件内的 `() => import(...)` 全局替换为 `defineAsyncComponent`，但路由与权限中的懒加载保持原样。

## 问题背景
- 抽屉组件等无法正常弹出，原因可能是组件内动态导入写法需调整
- 路由懒加载由 Vue Router 处理，不应改动 `component: () => import(...)`

## 修复方案
- 全局替换 20 个文件中的组件内 `() => import(...)` 为 `defineAsyncComponent`
- 不涉及路由与权限文件的 `component: () => import(...)`

## 涉及文件
- `views/index.vue`（Home）
- `views/tool/gen/detail.vue`（basicInfoForm, genInfoForm）
- `views/flowable/index.vue`（flow）
- `views/flowable/flow.vue`（bpmnModeler）
- `views/institution/company/index.vue`（HistoryRecord）
- `views/system/role/detail.vue`（AuthUserTable）
- `views/system/role/components/AuthUserTable.vue`（userDialog）
- `views/system/dict/detail.vue`（DictDataTable）
- 其余文件略

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 所属项目：2-0（园区物管2.0）
- 来源会话：b06efc30-d150-4428-a1c0-f054d8e38798

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "define_async_component_migration",
  "source_extraction_id": "d84370698f6d4f08927a749b5ae08557",
  "version": 1,
  "memory_type": "entities"
}
-->