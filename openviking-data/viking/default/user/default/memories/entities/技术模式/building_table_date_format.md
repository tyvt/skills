# 楼盘表查询项目信息日期格式修复
苏州市房地产监测V3 楼盘表查询「项目信息」的日期字段展示格式已修复为纯日期。

## 改动说明
- 「计划开工日期」「计划竣工日期」原在 `projectForm.vue` 的 `DetailTemplate` 使用 `type: 'datetime'`，整段显示 `2028-09-11 00:00:00`
- 修改为 `type: 'text'` 并配合 `formatDateOnly` 仅保留 `YYYY-MM-DD`（兼容接口返回的 `日期 + 00:00:00`）
- 刷新后显示如 `2025-12-18`、`2028-09-11` 等纯日期
- 同模块「开盘日期」「交付日期」等若需去掉时间可一并修改

## 涉及文件
- `zhi2-web-admin/src/views/projectManagement/buildingTable/components/projectForm.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：56bc4b9b-a344-4579-ae4d-bc5fa4db51d7
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_table_date_format",
  "source_extraction_id": "b73fb50eba434aa79e3d0fcfb2358295",
  "version": 1,
  "memory_type": "entities"
}
-->