# 租赁机构变更须本菜单页内切换查看编辑
苏州市房地产监测V3 中租赁端变更逻辑由硬编码跳转改为本菜单页内切换查看/编辑态，避免离开当前菜单。

## 变更要点
- 原变更逻辑硬编码跳转 toB/agencyRecord/detail 经纪菜单，导致租赁端离开当前菜单
- 新增 zljg/companyRecord/detail.vue 与 zljg/agencyRecord/detail.vue 壳页面
- AgencyBasicInfoDetail 对白名单路由仅修改 query(formMode=edit) 保持路径
- toB/agencyRecord/detail 提交后返回当前 path 查看态

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/047.md
- 涉及文件：LeaseEntryNetworkSections.vue、agencyBasicInfoContent.js、AgencyBasicInfoDetail.vue、register-helpers.js、leaseInstitutionRegister/index.vue、InstitutionRegisterSingleForm.vue、AgencyEntryNetworkAdminDetail.vue、AgencyBasicInfoForm.vue
- 所属项目：苏州市房地产监测V3；来源会话：015a09b1-527e-4f9f-b78f-3ba02a284fe9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_change_view",
  "source_extraction_id": "193aaf4ba64b42d4a62ba98bf6ee8d2d",
  "version": 1,
  "memory_type": "entities"
}
-->