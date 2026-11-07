# 房屋质量保证金B端权限过滤模式
产品2.0 项目为房屋质量保证金模块所有列表菜单补充 B 端权限过滤，按当前选中物业管理区域传入 propertyProjectId。

## 修改文件
- guaranteeDepositAccount/index.vue：新增 getQueryParams()，B 端查询和导出自动带 propertyProjectId，修复此前未做小区过滤展示所有区域数据的问题
- guaranteeDepositAgreement/index.vue：仅 isBTerminalPractitioner 为 true 时传 propertyProjectId，避免 G 端误过滤
- guaranteeDepositAgreementEnd/index.vue：同上，统一 B 端过滤逻辑
- 已具备过滤无需修改：guaranteeDeposit/components/index.vue（资金缴存/支用列表）、AddDialog.vue（新增缴存/支用弹窗账户选择）

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：dfe1828a-18d8-4f50-bd96-5b846ee22649；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_deposit_bterminal_filter",
  "source_extraction_id": "b03b5caf46e0410f892f1f3a0dcce3da",
  "version": 1,
  "memory_type": "entities"
}
-->