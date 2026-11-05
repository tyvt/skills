# 房屋质量保证金账户明细子表修复
产品2.0 项目修复房屋质量保证金账户明细（缴存/支用明细）查到其他账户数据及资金缴存列表重置问题。

## 修改文件
- guaranteeDepositAccount/detail.vue
- AccountDetailTable.vue（子表组件）

## 问题根因
- 路由复用时 form 保留上一次访问的 accountId；子表在详情接口返回前就挂载并用旧的 accountId 请求数据
- detailCallback 用 { ...this.form, ...data } 合并，若接口未返回 accountId 旧值不被覆盖
- 子表只传 accountId/account，未传 propertyProjectId（物业管理区域）；subTableMixins 在 created 时自动调 getList()，可能在过滤参数就绪前发起请求
- 资金缴存列表重置时 handleQuery() 在区域树就绪前执行，parentDeptId 未带上就请求接口

## 主要改动
- guaranteeDepositAccount/detail.vue：子表在 !loading 且 resolvedAccountId（form.accountId 就绪）后才请求数据，并补全 propertyProjectId 过滤条件

## 验证与归属
- 验证：余额为 1856.53 元却出现 266.62 元记录，说明子表查到其他账户数据，修复后应仅显示当前账户
- 所属项目：产品2.0；来源会话：a2b93bb4-760d-4bb3-93a2-a4c0506cfb2f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_account_detail_fix",
  "source_extraction_id": "d29ececa168b4f758ad876f7efb26ee0",
  "version": 1,
  "memory_type": "entities"
}
-->