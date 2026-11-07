# 银行账户状态字典统一到ACCOUNT_STATUS
多个页面「银行账户状态」字段因绑定不同字典导致销户编码6无法回显，需统一到银行侧ACCOUNT_STATUS。

## 问题根因
- 同一业务字段在不同页面绑了两套字典：开户申请详情用平台侧benefit_account_status，银行账户查询子表用银行侧ACCOUNT_STATUS
- benefit_account_status无「销户」项，银行回传accountStatus=6时dict-tag静默降级成原始码

## 解决方案
- 所有「银行账户状态」相关页面统一切到ACCOUNT_STATUS，与BankAccountTable一致
- 标准编码：1正常/2冻结/3查封/4限制/5账号不存在/6销户
- 排查「显示原始码」分两步：先确认前端引用字典类型正确，再确认环境字典管理配全（如补6-销户）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话011d6472用户报开户申请字典缺少销户编码，结论列两套字典对比与6个待改文件
- 涉及文件：pubRegulatoryAccount/detail.vue、BankAccountTable.vue、pubRegAccountChange/detail.vue、pubRegAccPropMgmt/detail.vue、propertyAccount/detail.vue、account/detail.vue、pubBankAccountBalance/index.vue等
- 所属项目：苏住房G；来源会话：011d6472-82b1-4b34-b862-5f88d5e951ce；代码基线：315702f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_status_dict",
  "source_extraction_id": "e32fbf3f2ec94e2394584ddc813a6f8f",
  "version": 1,
  "memory_type": "entities"
}
-->