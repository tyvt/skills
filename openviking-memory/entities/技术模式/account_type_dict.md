# 业主开户账户类型显示数字修复（dictValue未对齐表单存值）
业主开户详情查看账户类型显示50等数字，因表单存acctypeVal而字典选项dictValue用acctypeId导致不匹配。

## 问题根因
- form.accountType存的是账户类型值acctypeVal（如50）
- initDict原从/maintenance/acctype/list拉选项且dictValue用acctypeId，与字段值域不一致
- DetailTemplate tag匹配失败后回退原始值

## 解决方案
- 查看/编辑弹窗统一getDicts('ACCOUNT_TYPE')，保证选项dictValue与form.accountType同一套编码
- 排查字典展示为码值时：先核对「表单字段实际存什么」再选字典或接口列表，不能假设列表主键就是下拉value

## 验证与归属
- 验证：会话3ef9c696中OpenDetailDialog initDict改为ACCOUNT_TYPE后查看与编辑弹窗均显示字典文案
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/OpenDetailDialog.vue
- 所属项目：园区公共收益；来源会话：3ef9c696-10c0-4826-b1f5-80042dfc681b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_type_dict",
  "source_extraction_id": "14ba31c6dc8f4d5282d0b9f4f6413e26",
  "version": 1,
  "memory_type": "entities"
}
-->