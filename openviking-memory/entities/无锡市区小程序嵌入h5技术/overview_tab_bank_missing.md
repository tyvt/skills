# OverviewTab未展示监管银行与开户支行名称
共享资金OverviewTab未绑定监管银行与开户支行字段致监管信息缺失，已通过cherry-pick提交补全展示。

## 问题根因
- OverviewTab未绑定regulatoryBankName与openbankName字段
- 导致监管银行与开户支行名称不显示

## 解决方案
- cherry-pick commit 3208cd5至dev_wuxi-sfb分支新增展示（提交a6ce6ce）
- 本地超前远程1 commit待推送

## 验证与归属
- 验证证据：src=无锡市区小程序嵌入H5/011.md
- 涉及文件：src/pages_benefit/benefit/index.vue、src/pages_benefit/balancePublicity/index.vue、src/pages_benefit/elevatorPubEngCons/index.vue、src/pages_owner/sharedFunds/components/OverviewTab.vue、src/pages_benefit/sharedFunds/components/OverviewTab.vue
- 来源会话：2a3a71f6-93f5-424c-bbfe-dc2f0e4470fb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "overview_tab_bank_missing",
  "source_extraction_id": "e41348d9ae7f40a696931618195d7ebc",
  "version": 1,
  "memory_type": "entities"
}
-->