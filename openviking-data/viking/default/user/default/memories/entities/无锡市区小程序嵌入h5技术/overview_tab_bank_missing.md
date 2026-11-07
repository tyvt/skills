
# OverviewTab监管银行与开户支行展示修复
共享资金OverviewTab等页面监管银行与开户支行字段绑定错误已修复，监管银行使用regulatoryBankName，开户支行使用openbankName。

## 问题根因
- 监管银行曾错误绑定openbankName（开户支行字段），导致显示如「无锡滨湖支行」等错误值
- OverviewTab未绑定regulatoryBankName与openbankName字段，致监管信息缺失

## 解决方案
- 监管银行显示regulatoryBankName（如「中国建设银行」），原误用的开户支行字段openbankName（如「中国建设银行股份有限公司无锡华庄支行」）改为在监管银行下方单独展示
- 接口/benefit/app/accountStatistics/{projectId}经getBenefitList拉取存入benefitInfo，后端返回regulatoryBankName即可展示，前端无需改API定义
- cherry-pick commit 3208cd5至dev_wuxi-sfb分支新增展示（提交a6ce6ce），本地超前远程1 commit待推送

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：src/pages_benefit/sharedFunds/components/OverviewTab.vue、src/pages_benefit/benefit/index.vue(DetailsTab.vue)、src/pages_benefit/balancePublicity/index.vue、src/pages_benefit/elevatorPubEngCons/index.vue、src/pages_owner/sharedFunds/components/OverviewTab.vue
- 来源会话：2a3a71f6-93f5-424c-bbfe-dc2f0e4470fb（cherry-pick）、8f524774-dcb8-476a-93c6-dcf4a5936cd2（OverviewTab修正）
- 所属项目：无锡市区小程序嵌入H5；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "overview_tab_bank_missing",
  "source_extraction_id": "63dce1141adb41349106ccb0a7746519",
  "version": 2,
  "memory_type": "entities"
}
-->