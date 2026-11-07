
# 银行回单核销子表字典加载修复
无锡市区G（zhi2-web-admin）benefit/pubVerificationReceipts 模块的核销回单详情子表，曾因字典未加载导致业务类型显示原始码值 1、2 而非转译文本。

## 根因
- 子表在 created 里拉字典时，父页尚未算出 isIncome（依赖异步 loanDirction）
- 原代码写 `if (!this.isIncome) return`，导致字典一直未加载
- dictFormatter 找不到 relBusinessTypeOptions，将原始码值 1、2 原样显示

## 修复方案
- 进入页面即加载合同类型字典（资产 + 资源 + PUB_LEASE_CONTRACT_TYPE 合并）
- isIncome 变为 true 时再补拉一次（已加载则跳过）
- 字典到位后刷新 detailList，触发表格重新渲染

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区G
- 验证：Ctrl+F5 强刷后打开回单详情；若仍显示数字，在 DevTools→Network 看 benefit_contract_resource_type 是否 200 并确认是否有 dictValue 为 1、2 的项；没有则需后端补字典或核对字段含义
- 涉及文件：src/views/benefit/pubVerificationReceipts/components/VerificationReceiptDetailTable.vue、src/views/benefit/pubVerificationReceipts、src/mixins/subTableMixins.js
- 来源会话：08b73ebd-1692-46da-8e18-00b4de13e612；所属项目：无锡市区G；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_receipt_dict_load",
  "source_extraction_id": "00f35b17a60448048352f53a0dbe42f3",
  "version": 1,
  "memory_type": "entities"
}
-->