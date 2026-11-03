# Vue Router 4 全局 mixin 须用 currentRoute.value 访问
zhi2-web-admin 在 Vue Router 4 下 router.currentRoute 是 Ref，直接读 query/formMode 会报 undefined。

## 问题根因
- main.js 全局 mixin 的 computed formMode/currentRoute 及 methods goBack、changeFormState 直接读 router.currentRoute.query.formMode
- 因 router.currentRoute 是 Ref，直接访问 .query 得到 undefined，抛 Cannot read properties of undefined (reading 'formMode')

## 解决方案
- 先取 const current = router.currentRoute && router.currentRoute.value
- 再读 current.query、current.path 等，并对 current 做空值守卫

## 验证与归属
- 验证证据：会话 b6010e11，main.js:80 formMode 报错，改为 currentRoute.value 后恢复
- 涉及文件：zhi2-web-admin/src/main.js
- 所属项目：2-0（产品2.0）；来源会话：b6010e11-77ce-4a06-bc26-84bea5793888；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "router_currentroute_ref",
  "source_extraction_id": "4ed02f8bfd3c4575a720e18d89269ce4",
  "version": 1,
  "memory_type": "entities"
}
-->