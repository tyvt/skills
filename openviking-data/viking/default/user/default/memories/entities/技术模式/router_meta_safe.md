# Vue Router 4 currentRoute 为 Ref 须取 value 安全访问
产品2.0 在 Vue3 迁移中，Vue Router 4 的 `router.currentRoute` 是 Ref 对象，直接访问其属性（`.query`、`.meta`、`.params` 等）会因 undefined 触发 TypeError，须先取 `.value` 再安全访问。

## 问题根因
- Vue Router 4 中 `router.currentRoute` 是 Ref 对象，直接访问 `.meta.busCode`、`.query.formMode`、`.query` 等会因 undefined 触发 `Cannot read properties of undefined`。
- `main.js` 全局 mixin 的 computed `formMode`/`currentRoute` 及 methods 直接读 `router.currentRoute.query.formMode`，导致报错。
- `OperationBtnGroup` 组件本地 computed `formMode` 覆盖全局 mixin，且使用错误写法 `router.currentRoute.meta.busCode` 等。
- `AppMain.vue` 中使用 `router.currentRoute.query.formMode` 报 undefined。
- 路由切换瞬间或 meta 未就绪时易报错（如 index.vue:140 报 `reading 'busCode'`）。

## 解决方案
- 统一改为先取 `const current = router.currentRoute && router.currentRoute.value`，再读 `current.query`、`current.meta.busCode` 等。
- 使用可选链 `current?.meta?.busCode` 做空值守卫消除异常。
- 对同类 `this.$route.meta.xxx` 也做全局排查并改为安全访问（如 `this.$route?.meta?.busCode`）；用户要求全局修复类似问题。
- 在 `src/main.js` 全局 mixin 中，computed 的 `currentRoute` 与 `formMode` 经 `router.currentRoute.value` 获取路由信息。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：src=2-0/011.md；src=2-0/014.md；src=2-0/013.md；main.js:80 formMode 报错；index.vue:140 报错；AppMain.vue 报错。
- 涉及文件：
  - zhi2-web-admin/src/main.js（全局 mixin）
  - zhi2-web-admin/src/components/OperationBtnGroup/index.vue
  - zhi2-web-admin/src/layout/components/AppMain.vue
  - zhi2-web-admin/src/views/maintenance/depositNotice/company/components/index.vue
  - zhi2-web-admin/src/views/maintenance/depositNotice/components/detail.vue
  - 其他使用 `router.currentRoute.xxx` 的文件
- 所属项目：2-0（产品2.0）
- 来源会话ID：
  - b6010e11-77ce-4a06-bc26-84bea5793888（main.js mixin 修复）
  - 58dcfdc3-e0eb-4a9d-a77c-6b00ecbf41cf（OperationBtnGroup 等全局修正）
  - 10b68c5e-e8dd-4ad6-b706-b4db9da0103d（AppMain.vue 改用 this.$route）
  - 11afbbee-3388-4e8f-8411-f15186e36c48（meta 安全访问）
- 代码基线：none
- 全部改成安全访问后，错误基本解决；建议多切路由、刷新页面、从登录页直接进详情页等场景验证控制台是否还有类似错误。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "router_meta_safe",
  "source_extraction_id": "124dfc8798774857a6faa686dbc20e7d",
  "version": 4,
  "memory_type": "entities"
}
-->