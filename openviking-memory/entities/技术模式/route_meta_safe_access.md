# OperationBtnGroup 路由 meta 安全访问
产品2.0 中组件直接读取 router.currentRoute.meta.busCode 在 meta 未就绪时抛错，且因 router.currentRoute 为 Ref 须先取 value 再做空值守卫。
## 问题根因
- `OperationBtnGroup` 等组件直接读 `router.currentRoute.meta.busCode`，meta 未就绪或路由切换瞬间会 `Cannot read properties of undefined (reading 'busCode')`。
- index.vue:140 报错。
- Vue Router 4 中 `router.currentRoute` 为 Ref 对象，直接访问 `.query` 或 `.meta` 会因 undefined 触发 TypeError。
## 解决方案
- 先取 `const current = router.currentRoute && router.currentRoute.value`
- 再读 `current.query`、`current.meta.busCode` 等，并对 `current` 做空值守卫（或可选链 `current?.meta?.busCode`）
- 对同类 `this.$route.meta.xxx` 做全局排查；用户要求「全局修复类似问题」。
## 验证与归属
- 验证证据：index.vue:140 报错；src=2-0/014.md；src=2-0/011.md
- 涉及文件：zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- 所属项目：2-0（产品2.0）；来源会话：11afbbee-3388-4e8f-8411-f15186e36c48；58dcfdc3-e0eb-4a9d-a77c-6b00ecbf41cf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "route_meta_safe_access",
  "source_extraction_id": "6d18fa7d688944059b189e2db9628a41",
  "version": 2,
  "memory_type": "entities"
}
-->