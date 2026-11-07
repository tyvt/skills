# B端业务列表按小区隔离
产品2.0 房屋质量保证金模块在 B 端从业人员账号下，统一用 isBTerminalPractitioner 门控 + currentProjectId 传 propertyProjectId 做小区过滤。

## 问题背景
- 房屋质量保证金模块（保证金管理/协议管理/协议终止/资金缴存/资金支用）在 B 端账号下不做小区过滤，展示全部区域数据，属越权可见
- 根因是列表查询参数从未带 propertyProjectId，后端拿不到当前小区只能全量返回
- B 端顶栏小区选择器只是前端上下文（store 的 currentProjectId），不主动下发就不参与查询

## 解决方案
- 列表页覆写/新增 getQueryParams()，在查询与导出共用层加过滤：isBTerminalPractitioner 为真时 params.propertyProjectId = currentProjectId
- 必须用 isBTerminalPractitioner 门控，不能无条件传：G 端主管部门同用这些页面，无当前小区，无脑传会变空过滤或出错
- 改造范围是整个模块所有列表菜单，已有的（资金缴存/支用列表、新增弹窗账户选择）要复查口径一致
- 验收用 B 端账号切换不同小区确认只返回该小区数据，再用 G 端账号回归没被误过滤

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：会话 dfe1828a（2026-07-23）用户截图指 B 端未做权限过滤，要求传 propertyProjectId，房屋质量保证金相关列表菜单都加
- 涉及文件：guaranteeDepositAccount/index.vue、guaranteeDepositAgreement/index.vue、guaranteeDepositAgreementEnd/index.vue、guaranteeDeposit/components/index.vue、AddDialog.vue、AccountDetailTable.vue
- 所属项目：产品2.0；来源会话：dfe1828a-18d8-4f50-bd96-5b846ee22649；代码基线：414029f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bterminal_list_isolation",
  "source_extraction_id": "367daf60193e4512bd7f31c6fd55c740",
  "version": 1,
  "memory_type": "entities"
}
-->