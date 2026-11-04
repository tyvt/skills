# 在预认证时补全银行代码
在 `pageIsAgreement` 的返回中缺失 `regulatoryBankCode`/`bankCode` 会在认证前导致虚假的未选择区域警告；解决方案通过带回退的链式查询来补全。

## 问题
- `pageIsAgreement` 通常返回时不带 `regulatoryBankCode`/`bankCode`
- 认证前的空值检查会显示虚假错误“请先选择物业管理区域”
- 受影响的文件包括 benefit/pubExpenditureContract, property/expenditureContract, benefit/pubUseMoneyApply, benefit/pubBankReceiptApply, benefit/pubRevenueContract, benefit/pubRegulatoryAccount

## 解决方案
- 选择区域后，链式补全代码：`pageIsAgreement`→开户列表→开户详情→监管银行列表
- 当代码缺失时，使用回退值 `payeeAccountBankCode`
- 将提示信息改为“未能获取银行编码…”

## 验证与归属
- 证据提取自 cursor 会话 e95efacc-3c6a-4c04-84ea-35202f15a58e
- 所属项目: 无锡锡山V2 (Wuxi Xishan V2); 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_code_completion",
  "source_extraction_id": "611c800fb6ff447c8169b3716d89ec7d",
  "version": 1,
  "memory_type": "entities"
}
-->