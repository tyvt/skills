# 经纪机构基本信息页created无条件调loadDetail
苏州市房地产监测V3 中经纪机构 `AgencyBasicInfoDetail` 在 `created` 无条件调用 `loadDetail()`，修正开发企业页初始化未加载问题。

## 问题根因
- 开发企业 `DeveloperBasicInfoDetail` 依赖 `detailMixins` 的 `formMode === 'view'` 条件，导致接口未调用
- 经纪机构 `AgencyBasicInfoDetail` 不依赖该条件，但需明确无条件加载

## 解决方案
- 经纪机构 `AgencyBasicInfoDetail`（入口 `toB/agencyRecord/detail.vue`）在 `created` 中无条件调用 `loadDetail()`（B端走 `getOwnCompany`）
- 页面初始化应无条件触发数据加载，不依赖 `formMode === 'view'`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/050.md
- 涉及文件：companyManagement/components/DeveloperBasicInfoDetail.vue、companyManagement/companyBasicInfo/detail.vue、mixins/detailMixins.js、mixins/form.js、companyManagement/components/AgencyBasicInfoDetail.vue、api/company/companyRecord.js、companyManagement/components/AgencyEntryNetworkDetail.vue、zljg/companyRecord/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：e15a1da6-99f2-4436-b12d-c0e94bfb9658；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_created_load_detail",
  "source_extraction_id": "546275cea60345d0accb2c916598cd00",
  "version": 1,
  "memory_type": "entities"
}
-->