# 机构详情页遗漏注册状态和条件

在苏州市房地产监测V3项目中，`AgencyBasicInfoDetail.vue` 未展示机构注册状态及已满足的条件，与列表规则不一致。

## 问题根因
- `AgencyBasicInfoDetail.vue` 未展示注册状态及已满足的条件
- 与列表页面规则不一致

## 解决方案
- 在 `AgencyBasicInfoDetail.vue` 的顶部状态栏和基本信息区块中添加展示，数据来自 `getCompanyApplyOverview`
- 在 `agencyApplyOverview.js` 中添加共享逻辑 `shouldShowApplyConditionMet`，限定于 `detailScope === 'own'` 及机构展示

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-leftover/016.md
- 涉及文件: institution/record/index.vue, router/index.js, institution/company/admin.vue, AgencyBasicInfoDetail.vue, agencyBasicInfoContent.js, toB/agencyRecord/detail.vue, utils/agencyApplyOverview.js, components/HeadTitle/index.vue
- 所属项目: 苏州市房地产监测V3; 会话: 31f62931-8476-44d0-9fee-9330529a9b8b; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_detail_missing_status",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 2,
  "memory_type": "entities"
}
-->