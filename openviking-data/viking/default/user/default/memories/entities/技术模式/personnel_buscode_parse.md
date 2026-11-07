# 按路由和类型解析人员变更的 busCode
在苏州市房地产监测V3项目中，原始逻辑将登记代码（cyryba/zlcyryba）与变更代码混淆。

## 在 personnelRecord.js 中的修正
- `resolvePersonnelChangeBusCode` 重写：如果路由的 meta 命中变更 busCode，则直接信任；否则按机构类型映射（经纪机构 agencyPersonnel→jgcyrybg）。

## 在 companyChangeManage/index.vue 中的修正
- `CHANGE_DETAIL_TARGET_BY_BUS_CODE` 添加 jgcyrybg→institution/agencyPersonnel/detail。

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/129.md
- 涉及文件: personnelRecord.js, personnelRecordMenuConstants.js, staffManagement/components/index.vue, agencyBranchChange.js, companyChangeManage/index.vue, staffManagement/components/detail.vue, AgencyPersonnelDetail.vue, LeasePersonnelDetail.vue
- 会话: 01a16232-5377-7628-b520-45bedf400542; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_buscode_parse",
  "source_extraction_id": "9a72ed1246ed49b9a2c86e9dac3adbdd",
  "version": 1,
  "memory_type": "entities"
}
-->