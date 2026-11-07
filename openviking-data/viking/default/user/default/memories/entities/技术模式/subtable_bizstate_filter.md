# 聚合类子表明细查询必须显式传 bizState=2
房屋质量保证金账户详情页的缴存明细/支用明细子表只应展示已备案（bizState=2）数据，需显式传参过滤。

## 问题现象
- 房屋质量保证金账户详情页的缴存明细/支用明细子表（AccountDetailTable）把待提交、审核中的记录也同步展示了出来
- 子表查询接口未传 bizState，后端按全状态返回；账户明细是聚合口径，只应反映已生效（已备案）的资金流水

## 解决方案
- 在子表组件 getQueryParams() 中显式增加 bizState: '2'，只查询已备案记录
- 通用约定：凡是「账户/汇总类详情」里展示业务流水的子表，查询参数必须显式传 bizState=2 做口径过滤，不能依赖列表默认状态

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 5050ef10 最终结论：getQueryParams() 增加 bizState: '2'，未备案的缴存/支用记录不再出现在账户明细中
- 涉及文件：zhi2-web-admin/src/views/maintenance/guaranteeDepositAccount/components/AccountDetailTable.vue
- 所属项目：产品2.0；来源会话ID：5050ef10-38f1-41cf-a707-d4f0fa6f0f5a；代码基线：产品2.0/zhi2-web-admin（苏房V3同源），基线 414029f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtable_bizstate_filter",
  "source_extraction_id": "b2b84215894c4ce686e5d8228693700e",
  "version": 1,
  "memory_type": "entities"
}
-->