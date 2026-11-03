# 详情模板列布局满行归零处理
苏州市房地产监测V3 的详情模板列布局原未处理 rowSpan+span>24 及 span=24 时的换行与槽位归零，后在 detail-grid.js 新增槽位计算函数并供 detail-template.vue 共用。

## 改动内容
- 原列计算未处理 rowSpan+span>24 及 span=24 时的换行与槽位归零
- 在 detail-grid.js 新增 getDetailSpanSlotUnits、assignDetailGridColumn 计算槽位
- detail-template.vue 共用该逻辑处理布局

## 涉及文件
- zhi2-web-admin/src/views/company/companyApplyAudit/detail.vue
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/components/detail-template/detail-template.vue
- zhi2-web-admin/src/views/projectManagement/certificate/consLic/changeDetail.vue
- zhi2-web-admin/src/components/detail-template/detail-grid.js
- zhi2-web-admin/src/components/detail-template/detail-grid.test.js
- zhi2-web-admin/package.json

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/141.md
- 来源会话ID：63e9efd7-32f6-48eb-a977-6f79ef7ad989
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_grid_slot",
  "source_extraction_id": "0925c1b461604fd789523e8d04997112",
  "version": 1,
  "memory_type": "entities"
}
-->