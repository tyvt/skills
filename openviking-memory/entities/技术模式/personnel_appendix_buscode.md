# 从业人员详情附件busCode修复
苏州市房地产监测V3 中三个从业人员详情页附件 busCode 误用备案编码，改为返回 auditBusCode 适配变更。

## 问题根因
- 三个从业人员详情页 `appendixBusCode` 固定调用 `resolvePersonnelAppendixBusCode` 返回备案编码，导致变更后附件接口仍带备案 busCode

## 修复方案
- 修改为返回 `this.auditBusCode` 以适配变更编码
- 涉及 AgencyPersonnelDetail.vue、LeasePersonnelDetail.vue、staffManagement/detail.vue 三文件

## 涉及文件
- `src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue`
- `src/views/institution/leasePersonnel/components/LeasePersonnelDetail.vue`
- `src/views/company/staffManagement/components/detail.vue`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/161.md
- 来源会话ID：01a1631f-8ce8-70c5-a400-766aeafe6174
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_appendix_buscode",
  "source_extraction_id": "35936e6489bd44a1be5cd1e65794bc05",
  "version": 1,
  "memory_type": "entities"
}
-->