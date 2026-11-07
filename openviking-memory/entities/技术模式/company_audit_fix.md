# 企业基本信息审核流程未传变更ID致查单失败
在苏州市房地产监测V3中，企业基本信息审核流程未传变更单ID与busCode导致查不到变更单，已修复。

## 问题根因
- 企业基本信息页无URL主键
- 审核流程查看未传递变更单ID与busCode导致查不到变更单
- 编辑路由态误隐藏按钮

## 修复方案
- DeveloperBasicInfoDetail.vue 新增 auditFlowBusCode、auditFlowDataId、showAuditFlowBtn 并绑定 operation-btn-group（设 form-mode-override="view" 防隐藏）
- attachmentDraw.vue 的 ApprovalProcess 增加 :data-id 与 :key 按变更单ID拉取

## 涉及文件
- zhi2-web-admin/src/views/company/companyManagement/components/DeveloperBasicInfoDetail.vue
- zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- zhi2-web-admin/src/views/company/companyRecordAgency/change/detail.vue
- zhi2-web-admin/src/mixins/detailMixins.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/085.md
- 来源会话：f4b1901e-bda0-4bcf-8527-c06dcde62f23
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_audit_fix",
  "source_extraction_id": "9a7a6e30e88942b69bcab76fafb42454",
  "version": 1,
  "memory_type": "entities"
}
-->