# e2e选楼幢须跳过在途及不可用标记
e2e 辅助函数 `selectBuildingInDialog` 取 bizState 0/1 楼幢与弹窗列表求交集，排除在途及不可用标记，无可用行则跳过测试。

## 问题背景
- e2e 选楼幢需避开在途（`selectable`）及不可用（`hasActiveSurveyChange`）标记
- 原逻辑可能选到不可用的楼幢导致测试失败

## 修复方案
- `e2e/fixtures/presale-survey-change-helpers.js` 的 `selectBuildingInDialog` 调 `/presale/surveyChange/page`（最多500条）取 `bizState` 0/1 的 `buildingId` 与弹窗列表求交集
- 排除 `selectable`/`hasActiveSurveyChange` 标记
- 无可用行则关弹窗返 `false` 触发 `test.skip`

## 涉及文件
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/presale-survey-change-helpers.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/styles/index.scss
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/building/buildingChange/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/buildinginfo/changeDetail.vue
- d:/repository/苏州市房地产监测V3/.workbuddy/memory/2026-09-11.md
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/surveyChange/detail.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/PermitAppendixPanel.vue
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/detail/headline-spacing.spec.js
- d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/detail.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/021.md
- 来源会话ID：917bcc72-bb40-4ee4-a078-26ffa623d83b
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_skip_building",
  "source_extraction_id": "2ff3eb53a9534d35a8a41e56fd95e4fb",
  "version": 1,
  "memory_type": "entities"
}
-->