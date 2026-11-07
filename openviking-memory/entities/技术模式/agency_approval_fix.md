# 经纪从业人员变更审批接口修复
苏州市房地产监测V3 项目修复经纪机构/租赁机构从业人员变更审批接口路径错误。

## 问题根因
- 经纪机构从业人员**变更**详情里 `operation-btn-group` 的 `businessName` 写死为 `agencyPersonnel`
- 审批会拼成 `/company/agencyPersonnel/approval`，接口用错
- 变更单应和开发企业 `staffManagement` 一样走 `/company/personnelRecordChange/approval`

## 修复方案
- 在 `AgencyPersonnelDetail.vue` 将 `businessName` 改为计算属性
- 变更上下文（`changeActive` / 路由带 `personnelRecordChangeId`）→ `personnelRecordChange`；备案详情 → 仍为 `agencyPersonnel`
- `busCode` 为 `jgcyrybg`（`auditBusCode` 在 `changeActive` 时已正确）
- `LeasePersonnelDetail.vue` 做同样调整（`zlcyrybg` 变更场景）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 管理端从「变更管理」进入经纪从业人员变更单（`bizState=1`）再点审批，应走 `/company/personnelRecordChange/approval`
- 涉及文件：AgencyPersonnelDetail.vue、LeasePersonnelDetail.vue、api/company/personnelRecord.js
- 所属项目：苏州市房地产监测V3；来源会话：6023b157-4f28-471e-8f2b-868c05df16b7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_approval_fix",
  "source_extraction_id": "f8016802bbdc45ea86428e1387fbac2b",
  "version": 1,
  "memory_type": "entities"
}
-->