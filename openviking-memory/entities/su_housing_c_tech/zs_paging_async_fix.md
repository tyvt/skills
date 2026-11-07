# ZsPaging.vue 异步组件不支持修复
苏住房C 小程序 `ZsPaging.vue` 使用 `defineAsyncComponent` 加载 `z-paging`，uni-app 微信小程序不支持该 API 导致运行时报错，已改为静态导入。

## 问题原因
- `ZsPaging.vue` 用 `defineAsyncComponent` 异步加载 `z-paging`
- uni-app 微信小程序不支持 `defineAsyncComponent`，运行报 `defineAsyncComponent is not supported`

## 修复要点
- 改为静态导入 `z-paging/components/z-paging/z-paging.vue` 及 `ZsImage`
- 若需减小主包体积，应改用分包（`pages.json` 的 `subPackages`）或 `easycom`，不可依赖 Vue 异步组件 API

## 涉及文件
- src/components/ZsPaging/ZsPaging.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话：5aa7d8b1-67f8-4176-87c9-4be5cb616b81
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zs_paging_async_fix",
  "source_extraction_id": "72b5a7991bd24f12a5931971c8afda85",
  "version": 1,
  "memory_type": "entities"
}
-->