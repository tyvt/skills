# 详情页子表按未就绪主键发请求查到别的数据
房屋质量保证金账户明细页子表未按物业管理区域过滤，因路由复用残留旧 accountId、subTableMixins 提前请求、detailCallback 浅合并不覆盖，查到别的账户数据。
## 问题现象
- 缴存明细/支用明细未按所属物业管理区域过滤，余额 1856.53 却出现 266.62 记录，子表查到其他账户数据
- 子表只传 accountId/account，压根没传 propertyProjectId
## 根因
- 同一详情路由复用进另一条记录时 form 保留上一次 accountId
- subTableMixins 在 created 自动调 getList()，早于详情接口返回，用旧 accountId 发请求
- detailCallback 用 {...this.form, ...data} 合并，接口未返回 accountId 时旧值不覆盖，错误状态固化
## 解决方案
- 子表在 !loading 且 resolvedAccountId（form.accountId || 路由 id）就绪后再用 v-if 渲染
- detailCallback 改为先重置 form 再合并，用路由 id 兜底 accountId
- 子表组件新增 propertyProjectId 参数且 accountId 与 account 同时传；覆盖 init() 阻止 mixin 提前请求
- mounted 且过滤参数就绪后再拉数，用 filterSignature 统一 watch 过滤条件变化
- 同类「重置后立刻查询」列表（资金缴存/账户列表）也要等区域树就绪再刷新，否则 parentDeptId 丢失
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：guaranteeDepositAccount/detail.vue、AccountDetailTable.vue、guaranteeDeposit/components/detail.vue、deposit/index.vue
- 所属项目：产品2.0；代码基线：414029f
- 来源会话ID：a2b93bb4-760d-4bb3-93a2-a4c0506cfb2f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_subtable_stale_pk",
  "source_extraction_id": "5a1f60793990469a86c8c5a93e7974f0",
  "version": 1,
  "memory_type": "entities"
}
-->