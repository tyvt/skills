# 拟开户账户名称按主体类型生成
苏住房G后台「监管账户详情」页按管理主体类型拼接生成拟开户账户名称，物管会类型可编辑、企业与业委会类型只读。

## 功能描述
- `pubRegulatoryAccount/detail.vue` 新增 `proposedAccountName` 输入框及必填校验
- `updateProposedAccountName()` 按管理主体类型拼接生成名称：物管会('2')可编辑，企业('1')与业委会('0')不可编辑

## 触发联动
- `changeType()` 切换管理主体类型时触发名称更新
- `showCompanyDialog()` 选择主体名称后触发名称更新

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：苏住房G/041.md
- 涉及文件：pubRegulatoryAccount/detail.vue、pubRegulatoryAccount.js、mobilePreview/pubRegulatoryAccount/index.vue、ZsPrint/index.vue、OperationBtnGroup/index.vue、pubRegulatoryAccount/index.vue、property/account/detail.vue、pubRegAccPropMgmt/detail.vue
- 所属项目：苏住房G；来源会话：ea26c60b-ee52-4d27-b035-5fdd8146dfa7

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "proposed_account_name",
  "source_extraction_id": "9e279c11c0ff4cb281cd315baecbe44b",
  "version": 1,
  "memory_type": "entities"
}
-->