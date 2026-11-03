# 楼盘表日期误用datetime致显示时分秒
`projectForm.vue` 中 `DetailTemplate` 对计划开工/竣工日期使用 `type: 'datetime'` 致显示 `2028-09-11 00:00:00`。

## 问题根因
- `projectForm.vue` 中 `DetailTemplate` 对计划开工/竣工日期使用 `type: 'datetime'`
- 导致显示带时分秒，如 `2028-09-11 00:00:00`

## 修复方案
- 改为 `type: 'text'` 并调用 `formatDateOnly` 仅保留 `YYYY-MM-DD`
- 兼容接口返回格式

## 验证与归属
- 验证证据：extracted source=cursor session=56bc4b9b-a344-4579-ae4d-bc5fa4db51d7
- 涉及文件：src/views/projectManagement/buildingTable/components/projectForm.vue、src/components/detail-template/detail-template.vue、e2e/full-audit/date-type-audit.spec.js
- 所属项目：苏州市房地产监测V3 zhi2-web-admin；来源会话ID：56bc4b9b-a344-4579-ae4d-bc5fa4db51d7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_date_type",
  "source_extraction_id": "a62e595feba04ff1a28335d435f6b094",
  "version": 1,
  "memory_type": "entities"
}
-->