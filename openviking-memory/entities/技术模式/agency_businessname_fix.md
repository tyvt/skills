# 经纪从业人员变更businessName写死致接口错
苏州市房地产监测V3 中 AgencyPersonnelDetail.vue 的 businessName 写死导致审批接口路径误拼，须改为计算属性并映射正确上下文。

## 问题根因
- AgencyPersonnelDetail.vue 的 businessName 写死为 agencyPersonnel
- 导致审批接口误拼为 /company/agencyPersonnel/approval

## 解决方案
- 改为计算属性，变更上下文映射 personnelRecordChange
- 调用 /company/personnelRecordChange/approval 与 busCode jgcyrybg
- LeasePersonnelDetail.vue 同步调整

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/031.md
- 涉及文件：api/company/personnelRecord.js、company/staffManagement/components/detail.vue、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、components/OperationBtnGroup/index.vue、utils/flowApi.js、institution/leasePersonnel/components/LeasePersonnelDetail.vue、company/companyChangeManage/index.vue、components/ZsApproval/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：6023b157-4f28-471e-8f2b-868c05df16b7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_businessname_fix",
  "source_extraction_id": "1dd7ee5fdfbc4d55b597a754b7eaeeee",
  "version": 1,
  "memory_type": "entities"
}
-->