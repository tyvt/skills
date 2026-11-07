# 经纪机构详情页缺失备案状态与条件
苏州市房地产监测V3 中经纪机构B端详情页未展示备案状态与条件，未对齐列表页 overview 规则，已修复。

## 问题根因
- 经纪机构B端详情页（`AgencyBasicInfoDetail`）未展示机构备案状态与条件
- 未对齐列表页 overview 规则

## 修复方案
- `AgencyBasicInfoDetail.vue` 增加状态栏与基本信息字段，数据来自 `getCompanyApplyOverview`
- `agencyApplyOverview.js` 新增 `shouldShowApplyConditionMet` 共用展示条件，限定 `detailScope === 'own'` 且经纪机构展示

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/216.md
- 涉及文件：institution/record/index.vue、router/index.js、institution/company/admin.vue、company/companyManagement/components/AgencyBasicInfoDetail.vue、company/companyManagement/components/agencyBasicInfoContent.js、toB/agencyRecord/detail.vue、utils/agencyApplyOverview.js、components/HeadTitle/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：31f62931-8476-44d0-9fee-9330529a9b8b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_filing_status",
  "source_extraction_id": "dd2d49bc6bd5474d9cb19e215fd2759b",
  "version": 1,
  "memory_type": "entities"
}
-->