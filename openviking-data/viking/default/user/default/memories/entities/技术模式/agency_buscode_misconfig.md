# 经纪机构备案附件中 busCode jgcyrybg 错误
在苏州市房地产监测V3 (zhi2-web-admin) 项目中，`resolvePersonnelAppendixBusCode` 由于菜单配置错误，拉取了带有错误 `busCode` `jgcyrybg` 的附件，而正确的应该是 `jgcyryba`。

## 问题根因
- 经纪机构申请菜单（经纪机构备案）错误配置了 `jgcyrybg`
- `listAppendixPackage` 通过 `resolvePersonnelAppendixBusCode` 接收了错误的 `busCode`
- 正确的值应该是 `jgcyryba`

## 解决方案
- `src/api/company/personnelRecord.js` 新增了常量 `AGENCY_PERSONNEL_APPENDIX_BUS_CODE = 'jgcyryba'`
- 函数 `normalizeAgencyPersonnelAppendixBusCode` 修正了编码
- `resolvePersonnelAppendixBusCode` 统一修正路径 `institution/agencyPersonnel*` 并在没有菜单配置时使用 `jgcyryba` 作为回退

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/291.md
- 涉及文件: AgencyPersonnelAddAppendix.vue, AgencyPersonnelDetail.vue, personnelRecord.js, personnelRecordMenuConstants.js, agencyPersonnelApply/detail.vue, AppendixPackageSection/index.vue, institution-agency-personnel-menu.js, fix-appendix.cjs
- 所属项目: 苏州市房地产监测V3; 会话: 01a162ef-99c3-70c5-a400-7629c04d71f7; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_buscode_misconfig",
  "source_extraction_id": "ea52cb840c62465ab3fb0dba5f6a6e78",
  "version": 1,
  "memory_type": "entities"
}
-->