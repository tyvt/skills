# 机构附件中 busCode jgcyrybg 错误

在项目 苏州市房地产监测V3 中，当请求代理机构人员登记附件（经纪机构备案）时，菜单错误地使用了变更代码 `jgcyrybg`，导致 `listAppendixPackage` 发送了错误的 busCode；正确的值是 `jgcyryba`。

## 问题根因
- 请求附件的菜单使用了变更代码 `jgcyrybg` 而不是 `jgcyryba`
- `listAppendixPackage` 接收到了错误的 busCode

## 解决方案
- 在 `src/api/company/personnelRecord.js` 中添加常量 `AGENCY_PERSONNEL_APPENDIX_BUS_CODE` 和 `normalizeAgencyPersonnelAppendixBusCode`
- 在 `resolvePersonnelAppendixBusCode` 中，统一修正路径 `institution/agencyPersonnel*` 并在无配置时进行回退

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/091.md
- 涉及文件: AgencyPersonnelAddAppendix.vue, AgencyPersonnelDetail.vue, personnelRecord.js, personnelRecordMenuConstants.js, agencyPersonnelApply/detail.vue, AppendixPackageSection/index.vue, institution-agency-personnel-menu.js, fix-appendix.cjs
- 所属项目: 苏州市房地产监测V3; 会话: 01a162ef-99c3-70c5-a400-7629c04d71f7; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_appendix_buscode",
  "source_extraction_id": "804f3591fe264d2e93c18d6c856df3ec",
  "version": 1,
  "memory_type": "entities"
}
-->