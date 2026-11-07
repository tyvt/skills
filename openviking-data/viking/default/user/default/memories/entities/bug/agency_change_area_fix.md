# 机构变更行政区域字段保留修复
苏州市房地产监测V3 项目修复机构变更保存时未保留原 `provinceCityArea`（行政区域）字段值的问题。

## 问题根因
- 机构变更保存时未回传 `provinceCityArea`，页面上行政区域字段值丢失

## 修改要点
- `companyBasicInfoContent.js`：`normalizeCompanyBasicForm` 合并 `administrativeArea` 展示值同时保留 `provinceCityArea` 原值；`createCompanyBasicFormDefaults` 补充 `provinceCityArea: undefined`
- `companyRecordAgency/change/detail.vue`：`getDetail` 加载 `beforeForm` 后若变更单缺 `provinceCityArea`，从原备案数据回填
- `toB/companyRecord/detail.vue` 同步相关逻辑

## 验证与归属
- 涉及文件：`companyBasicInfoContent.js`、`companyRecordAgency/change/detail.vue`、`toB/companyRecord/detail.vue`
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor
- 来源会话ID：b9e75113-bcab-4880-a9ad-aff2106e5082

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "agency_change_area_fix",
  "source_extraction_id": "e5756bdd8c034e2494a05870d03ebaea",
  "version": 1,
  "memory_type": "entities"
}
-->