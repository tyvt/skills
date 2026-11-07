# 工单报事/报修两个菜单共享index/detail加orderType薄包装
工单列表只有 order/index.vue 与 detail.vue 一套，需拆出「报事」(orderType=1) 与「报修」(orderType=2) 两个独立菜单，用共享组件 + 薄包装套路避免复制漂移。

## 问题背景
- 工单列表只有 order/index.vue 与 detail.vue 一套，需要拆两个独立菜单页面
- 复制两份会立刻漂移；项目已有 article 模块成熟做法（父组件 type prop + 子目录薄包装）

## 解决方案
- order/components/enums.js 定义 ORDER_TYPE.REPORT='1'/REPAIR='2'，禁止页面写字面量
- 共享 index.vue/detail.vue 增加 orderType prop，在 getQueryParams() 注入，按类型切换标题/列名/权限前缀/分类接口 categoryType
- report/index.vue、repair/index.vue、report/detail.vue、repair/detail.vue 只做薄包装，import 共享组件并钉死 orderType
- AddOrderDialog 加 orderType prop，弹窗标题/表单标签随类型变化，提交体带 orderType

## 配套约束
- 路由必须指向 report/index 与 repair/index，不能指向 order/index，否则 listMixins 默认 handleView 跳到 order 详情页
- 原有 handleView 里的「待开发」提示要删掉，交还给 listMixins

## 验证与归属
- 用户明确点名参考 article 用法；改造后 report/repair 引用 order 的 index/detail，区分 1=报事 2=报修
- 涉及文件：order/index.vue、order/detail.vue、report/index.vue、repair/index.vue
- 所属项目：产品2.0；来源会话：d004f28a-5899-46e7-af27-f1b3531c2289；基线：42b6033

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "workorder_type_wrapper",
  "source_extraction_id": "6285554fd6dd46f69040df906ff0d5fd",
  "version": 1,
  "memory_type": "entities"
}
-->