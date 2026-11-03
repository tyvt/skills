# 机构变更列表跳转未区分类型致400
苏州市房地产监测V3 中 `companyChangeManage/index.vue` 的 `navigateToChangeDetail` 未依类型区分路由，致从业人员信息带变更单ID调备案detail出400。

## 问题根因
- `companyChangeManage/index.vue` 的 `navigateToChangeDetail` 未依 `busCode`/变更类型区分路由，一律走基本信息变更页
- 从业人员信息带变更单ID调备案detail出400
- `AgencyPersonnelDetail` 的 `init()` 未受 `formMode` 监听致 `inPageChangeMode` 失效

## 修复方案
- 新增 `resolveChangeDetailTarget` 按 `busCode` 解析，仅特定类型走机构页
- 从业人员按 `organType` 落 `jgcyrybg` 路由

## 涉及文件
- `src/views/company/companyChangeManage/index.vue`
- `src/views/company/companyChangeManage/developer/index.vue`
- `src/views/company/companyChangeManage/agency/index.vue`
- `src/api/company/personnelRecord.js`
- `src/views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue`
- `src/views/company/staffManagement/components/detail.vue`
- `src/mixins/detailMixins.js`
- `src/views/institution/leasePersonnel/components/LeasePersonnelDetail.vue`

## 验证与归属
- 验证证据：source=cursor session=75a612f1-9c9e-4b32-8b51-9ebc77e6ee9f
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_nav_type",
  "source_extraction_id": "4e404e041210485eb1873d1dfa867a1d",
  "version": 1,
  "memory_type": "entities"
}
-->