# listMixins 列表页同步路由 query 参数
产品2.0 中从详情页跳列表页带查询参数时，listMixins 不会消费 $route.query，需在列表页重写 init() 在 getList 前同步路由参数。

## 问题根因
- listMixins 在 created 里读本地缓存后立刻 init()→getList()，整个链路不把 $route.query 合入 queryParams
- 路由 query 只是躺在 $route 上没人消费，导致搜索表单为空、首次请求不带参

## 解决方案
- 列表页重写 init()（与 table mixin 默认逻辑一致），在 initDict/getList 前先执行同步函数
- 从 $route.query 取目标参数（兼容数组形式）写入 queryParams，zs-search-form 也会回显
- 同一路由下只改 query 不销毁组件还需再 watch $route.query

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/property/complexChange/index.vue、mixins/listMixins.js
- 所属项目：产品2.0；来源会话：56028024-cb08-49e4-ab44-98078061fc8a；代码基线：6da8974

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_mixins_route",
  "source_extraction_id": "4c0f6b4a207146ac99f3be82996d2ef1",
  "version": 1,
  "memory_type": "entities"
}
-->