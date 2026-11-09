# 微信小程序不支持 defineAsyncComponent
苏住房C（uni-app Vue3）小程序端编译/预览时报 defineAsyncComponent is not suppprted，页面组件不渲染，需改静态导入或走分包/easycom。

## 现象与根因
- zhi2-mobile-shimin 某次编译/预览报 `defineAsyncComponent is not suppprted`（原文拼写），页面组件不渲染
- 根因在 src/components/ZsPaging/ZsPaging.vue 用 `defineAsyncComponent(() => import('z-paging/components/z-paging/z-paging.vue'))` 延迟加载 z-paging
- 微信小程序运行时无 Vue 动态 import/异步组件能力，该 API 仅 Web/SSR 构建下成立，编译阶段不报，易误判为 z-paging 问题

## 解决方案
- 改为静态顶部导入 `import ZPagingInner from 'z-paging/components/z-paging/z-paging.vue'`，其余 ref/useSlots/useAttrs/computed/provide 保持不动
- 若有主包体积诉求，走 pages.json 的 `subPackages` 分包或 `easycom` 自动引入，不依赖异步组件
- 注意分包不能跨包引用组件与静态资源（根治套路：迁移组件 + componentPlaceholder）
- 排查口诀：小程序端任何 `defineAsyncComponent`/`() => import()` 组件加载先怀疑不支持，而非先查路径与依赖

## 验证与归属
- 验证证据：用户报错原文「defineAsyncComponent is not suppprted」；改为静态导入后本地构建通过编译阶段
- 涉及文件：src/components/ZsPaging/ZsPaging.vue、src、package.json
- 所属项目：苏住房C；来源会话ID：5aa7d8b1-67f8-4176-87c9-4be5cb616b81；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "define_async_component",
  "source_extraction_id": "822c31f3d8f34cd88bf5d0b804a2c0f8",
  "version": 1,
  "memory_type": "entities"
}
-->