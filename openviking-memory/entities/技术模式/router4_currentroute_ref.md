# Vue Router4中currentRoute为ref非对象
Vue Router 4 中 router.currentRoute 是 ref 而非路由对象，直接访问 .query 得 undefined。

## 问题根因
- Vue Router 4 中 router.currentRoute 是 ref 而非路由对象
- 直接访问 .query 得 undefined

## 解决方案
- AppMain.vue 改用组件内 this.$route 并加空值保护

## 验证与归属
- 涉及文件：AppMain.vue
- 验证证据：extracted source=cursor session=10b68c5e-e8dd-4ad6-b706-b4db9da0103d
- 来源会话ID：10b68c5e-e8dd-4ad6-b706-b4db9da0103d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "router4_currentroute_ref",
  "source_extraction_id": "90385991b34a4bfc9228b2efe8b61831",
  "version": 1,
  "memory_type": "entities"
}
-->