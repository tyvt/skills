# 禁止编辑代理机构人员详情
Suzhou Real Estate Monitoring V3系统：AgencyPersonnelDetail.vue 移除了 G-terminal 的编辑逻辑，限制录入仅限企业终端和待处理状态。

## 实施要点
- 移除了 `:allow-edit-when-recorded='isGTerminal'`；`canEditInHeader` 现在仅为终端 B 且 `bizState==='0'`
- 在 AgencyPersonnelBasicInfoFormFields.vue 中移除了 G-terminal 的白名单和特殊逻辑，统一了登记状态提示
- 涉及 AgencyPersonnelList.vue 和 e2e 流程测试

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/037.md
- 涉及文件: AgencyPersonnelDetail.vue, AgencyPersonnelBasicInfoFormFields.vue, AgencyPersonnelList.vue, e2e/institution/agency-personnel-real-api-flow.spec.js
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 01a1631d-9a15-70c5-a400-7668d0d29bb4; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_edit",
  "source_extraction_id": "a7d4b155515447d4b59be6579654e5d2",
  "version": 1,
  "memory_type": "entities"
}
-->