# 异步组件改用 defineAsyncComponent
产品2.0 前端全局将 `components: { Xxx: () => import('...') }` 写法迁移为 Vue 3 的 defineAsyncComponent 形式。

## 修改方式
- 在匹配文件中引入 `import { defineAsyncComponent } from 'vue'`
- 将 `GuideSettingDialog: () => import('./GuideSettingDialog.vue')` 替换为 `GuideSettingDialog: defineAsyncComponent(() => import('./GuideSettingDialog.vue'))`

## 涉及视图文件
- views/home/index.vue
- views/home/components/FastGuide.vue
- views/system/config/detail.vue
- views/system/user/detail.vue
- views/system/menu/index.vue

## 涉及工具组件文件
- views/tool/archives/index.vue
- views/tool/print/components/PrintDialog.vue

## 验证与归属
- 修复页面组件显示 [object Promise] 的问题
- 验证证据：extracted source=cursor project=2-0；来源会话：d4e317f1-0c0f-4664-a597-3028cba67933

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "async_component_vue3",
  "source_extraction_id": "1f8c04859ada4140bd4d762d8c5a4972",
  "version": 1,
  "memory_type": "entities"
}
-->