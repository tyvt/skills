# 修复 busCode 解析为变更代码
`resolvePersonnelChangeBusCode` 最初将归档代码与变更代码混淆，已通过常量和按路由的逻辑进行修正。

## 问题根因
- 原函数将归档代码 `cyryba`/`zlcyryba` 视为变更代码

## 修复
- 在 `src/api/company/personnelRecord.js` 中添加了诸如 `AGENCY_PERSONNEL_CHANGE_BUS_CODE` 的常量，并根据路由 `meta` 或组织类型重写了函数
- `companyChangeManage/index.vue` 中的 `CHANGE_DETAIL_TARGET_BY_BUS_CODE` 补充了 `jgcyrybg` 的映射

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/089.md
- 涉及文件: personnelRecord.js, personnelRecordMenuConstants.js, staffManagement/components/index.vue, agencyBranchChange.js, companyChangeManage/index.vue, staffManagement/components/detail.vue, AgencyPersonnelDetail.vue, LeasePersonnelDetail.vue
- 会话: 01a16232-5377-7628-b520-45bedf400542; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "buscode_parse_fix",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 1,
  "memory_type": "entities"
}
-->