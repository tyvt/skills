# 账号管理编辑银行账号与名称显示只读修复（苏住房G）
苏住房G 项目修复 propertyAccount/detail.vue 与 account/detail.vue 在编辑模式下银行账号和账户名称的显示与只读逻辑。

## 修改说明
- propertyAccount/detail.vue：编辑时若已有银行账号或账户名称也显示这两个字段；编辑模式字段禁用不可修改；已开户备案新增时可正常填写
- account/detail.vue（物业服务企业账户）：编辑模式银行账号、账户名称设为只读
- 仅在有数据或为「已开户备案」记录时显示这两个字段

## 效果
- 新增或已开户备案创建的数据点击编辑后，银行账号、账户名称正常显示且为灰色禁用状态
- 其他字段（开户银行、网点联系人等）仍可正常编辑

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/views/property/propertyAccount/detail.vue、zhi2-web-admin/src/views/property/account/detail.vue、zhi2-web-admin/src/views/property/account/index.vue
- 来源会话ID：c0706220-0b1c-41d9-abd2-a673c2f758ea

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "account_bank_fix",
  "source_extraction_id": "4f84ed465fbf45709ebc9281d8ed22a1",
  "version": 1,
  "memory_type": "entities"
}
-->