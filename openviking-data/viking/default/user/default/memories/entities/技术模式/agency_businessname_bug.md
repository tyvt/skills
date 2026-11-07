# 经纪变更审批接口因写死致路径错误
苏州市房地产监测V3 中经纪机构从业人员变更详情的 operation-btn-group 因 businessName 写死为 agencyPersonnel，导致审批拼接错误接口路径。

## 问题根因
- operation-btn-group 的 businessName 写死为 agencyPersonnel
- 导致审批拼接错误接口 /company/agencyPersonnel/approval

## 修复方案
- 在 AgencyPersonnelDetail.vue 与 LeasePersonnelDetail.vue 将 businessName 改为计算属性
- 变更上下文映射 personnelRecordChange（接口 /company/personnelRecordChange/approval，busCode jgcyrybg）
- 备案详情维持 agencyPersonnel

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/231.md
- 涉及文件：api/company/personnelRecord.js、company/staffManagement/components/detail.vue、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、components/OperationBtnGroup/index.vue、utils/flowApi.js、institution/leasePersonnel/components/LeasePersonnelDetail.vue、company/companyChangeManage/index.vue、components/ZsApproval/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：6023b157-4f28-471e-8f2b-868c05df16b7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_businessname_bug",
  "source_extraction_id": "eedd71c4edcc4cedbfdf3ec5cf02cc9a",
  "version": 1,
  "memory_type": "entities"
}
-->