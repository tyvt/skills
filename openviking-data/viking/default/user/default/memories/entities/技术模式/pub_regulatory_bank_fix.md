# 公示监管账户银行弹窗参数修复
苏住房G项目zhi2-web-admin的pubRegulatoryAccount模块修复showBankDialog中isPubRegulatoryAccount参数传递逻辑。

## 修改内容
- 在showBankDialog中，isPubRegulatoryAccount: '1' 只在非「已开户备案」时传入。
- 新增（add）：传 isPubRegulatoryAccount: '1'，按公示监管账户过滤承办银行。
- 已开户备案（openedAdd）：不传该参数，银行选择不受此限制。
- 代码：const pubRegulatoryAccountParams = this.formMode !== 'openedAdd' ? { isPubRegulatoryAccount: '1' } : {}；SelectDialog.open 的 treeParams 用 buildQueryStartBankParams(this.form, WORK_BANK_SOURCE_MODEL.BENEFIT, { isStart: '1', ...pubRegulatoryAccountParams })。

## 验证与归属
- 涉及文件：src/views/benefit/pubRegulatoryAccount/detail.vue（第1064-1091行）、src/views/system/regionBankAuth/detail.vue
- 所属项目：苏住房G；来源会话：d88a1f97-8d9a-4d6d-a7cd-02ddf13b5a0d
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pub_regulatory_bank_fix",
  "source_extraction_id": "c9abe6077036411c8acf95c2da863d62",
  "version": 1,
  "memory_type": "entities"
}
-->