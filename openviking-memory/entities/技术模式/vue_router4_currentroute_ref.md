# 路由4中currentRoute为Ref须取value
Vue Router 4 中 router.currentRoute 为 Ref 对象，直接访问其属性会因 undefined 触发 TypeError。

## 问题根因
- router.currentRoute 是 Ref 而非普通对象
- 直接访问 router.currentRoute.query.formMode 会因 undefined 触发 TypeError

## 解决方案
- 在 src/main.js 的全局 mixin 中，computed 的 currentRoute 与 formMode 需经 router.currentRoute.value 获取路由信息

## 验证与归属
- 验证证据：src=2-0/013.md
- 涉及文件：src/main.js
- 来源会话ID：b6010e11-77ce-4a06-bc26-84bea5793888
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_router4_currentroute_ref",
  "source_extraction_id": "e92e113b6217448e810aa27c305e1d32",
  "version": 1,
  "memory_type": "entities"
}
-->