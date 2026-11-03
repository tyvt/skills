# Vue Router meta 安全访问模式
Vue3 迁移中直接访问 `router.currentRoute.meta.xxx` 会抛 Cannot read properties of undefined，因 router.currentRoute 为 Ref 须先取 value 再安全访问。
## 问题根因
- Vue Router 4 中 `router.currentRoute` 是 Ref 对象，直接访问 `.meta.busCode` 会得到 undefined 并抛出 Cannot read properties of undefined。
## 解决方案
- 统一改为先取 `const current = router.currentRoute && router.currentRoute.value`，再用 `current?.meta?.busCode` 等安全访问消除异常。
## 验证与归属
- 验证证据：src=2-0/011.md；src=2-0/014.md
- 涉及文件：index.vue、@zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- 所属项目：2-0；来源会话ID：11afbbee-3388-4e8f-8411-f15186e36c48；58dcfdc3-e0eb-4a9d-a77c-6b00ecbf41cf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "router_meta_safe",
  "source_extraction_id": "6d18fa7d688944059b189e2db9628a41",
  "version": 2,
  "memory_type": "entities"
}
-->