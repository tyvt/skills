# 代理机构核心字段审计与 USCI 锁定
代理机构变更逻辑不完整，导致了授权错误；已添加核心字段校验和 USCI 代码锁定。

## 描述
- 苏州房地产监测 V3 项目，前端 zhi2-web-admin。
- 缺少代理机构变更逻辑导致了授权错误。

## 解决方案
- 新建文件 `agencyChangeCoreFields.js`，包含核心字段判断和 USCI（信用代码）锁定。
- `AgencyBasicInfoForm.vue` 在变更模式下禁用字段，并在 `getForm()` 中重写原始值。
- 核心字段的变更遵循审计 `jjjgbgxq`；非核心字段保存后立即生效。

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/011.md
- 涉及文件: AgencyBasicInfoDetail.vue; companyRecordAgency/detail.vue; utils/ruoyi.js; e2e/fixtures/company-menu-config.js; companyRecordAgency/change/detail.vue; toB/agencyChange/detail.vue; toB/agencyRecord/detail.vue; toB/change/detail.vue
- 会话: 6c91b23f-bba3-49fb-bd85-76e4879db720; 代码库: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：6c91b23f-bba3-49fb-bd85-76e4879db720


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_core_field_audit",
  "source_extraction_id": "187c2553208941ddaccffd0b0decd66f",
  "version": 1,
  "memory_type": "entities"
}
-->
