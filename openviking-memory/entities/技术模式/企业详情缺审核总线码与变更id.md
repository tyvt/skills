# 企业详情未传审核总线码与变更ID致查看缺失
苏州市房地产监测V3 中企业基本信息详情页未向 operation-btn-group 传递审核总线码与变更单 ID，导致审核流程查看按钮缺失。

## 问题根因
- DeveloperBasicInfoDetail.vue 未向 operation-btn-group 传递 auditFlowBusCode、auditFlowDataId、showAuditFlowBtn
- 审核流程查看按钮缺失，或查不到对应变更单

## 修复方案
- DeveloperBasicInfoDetail.vue 新增 auditFlowBusCode/auditFlowDataId/showAuditFlowBtn 并绑定 :bus-code/:id/:show-audit
- 设置 form-mode-override='view' 防止按钮被隐藏
- attachmentDraw.vue 的 ApprovalProcess 增 :data-id 与 :key，按变更单 ID 加载

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/036.md
- 涉及文件：OperationBtnGroup/index.vue、DeveloperBasicInfoDetail.vue、attachmentDraw.vue、companyRecord.js、detailMixins.js 等
- 所属项目：苏州市房地产监测V3；来源会话：f4b1901e-bda0-4bcf-8527-c06dcde62f23；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "企业详情缺审核总线码与变更ID",
  "source_extraction_id": "d1fd2d535d084329aeea42aa9e091a66",
  "version": 1,
  "memory_type": "entities"
}
-->