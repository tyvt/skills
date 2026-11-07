# 房屋质量保证金前端校验移除
产品2.0 项目中移除了房屋质量保证金相关页面的前端业务校验逻辑，统一由后端处理。

## 修改范围
- 涉及文件：`guaranteeDepositAgreement/detail.vue`、`guaranteeDepositAgreementEnd/detail.vue`、`guaranteeDeposit/components/index.vue`、`guaranteeDeposit/components/AddDialog.vue`
- 删除 `beforeSaveHook` 中重复协议校验及仅用于该校验的 `TERMINATED_AGREEMENT_STATE` 常量
- 删除 `loadAgreementById` 中「仅已备案协议可发起终止」前端拦截
- `checkAccountAndAgreement` 改为 `fetchAccountAndAgreement`，仅拉取信息不再拦截新增
- 移除新增弹窗中余额不足、缴存超协议金额等前端校验及多条提示

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：d36ae770-4f20-4b95-9e87-4e3c0ac46142；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_deposit_validation_remove",
  "source_extraction_id": "b748adfbea38472688052e3ba8fcbc14",
  "version": 1,
  "memory_type": "entities"
}
-->