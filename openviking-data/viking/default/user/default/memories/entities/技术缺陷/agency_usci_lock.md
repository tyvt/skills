# 代理机构变更时的USCI锁定与核心字段审核
苏州V3房地产监测系统（苏州市房地产监测V3）在变更代理机构时，既不锁定USCI，也不要求核心字段审核。

## 问题
- 核心字段（代理机构名称及其他6个）应提交 jjjgbgxq 以供审核，并保留在查看页面
- 非核心字段在保存时生效
- agencyChangeCoreFields.js 识别核心字段，且 getForm() 强制重写原始 USCI 以防止篡改

## 验证
- 验证证据: src=苏州市房地产监测V3/060.md
- 涉及文件: AgencyBasicInfoDetail.vue; companyRecordAgency/detail.vue; ruoyi.js; company-menu-config.js; companyRecordAgency/change/detail.vue; toB/agencyChange/detail.vue; toB/agencyRecord/detail.vue; toB/change/detail.vue
- 会话: 6c91b23f-bba3-49fb-bd85-76e4879db720; 代码库: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：6c91b23f-bba3-49fb-bd85-76e4879db720


<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "agency_usci_lock",
  "source_extraction_id": "4874608f104944719aa2f486c341f696",
  "version": 1,
  "memory_type": "entities"
}
-->
