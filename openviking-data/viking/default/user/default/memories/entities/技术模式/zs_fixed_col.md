# 固定宽度的自定义列不参与 zs-table 中的宽度分配
Suzhou Real Estate Monitoring V3 系统：zs-table 曾将固定列视为可拉伸的，导致空白；已修正为使用 slot-width。

## 问题根因
- `zs-table` 通过 `type="custom"` 和 `slot-width` 在剩余宽度分配中将固定列视为可拉伸的，导致右侧出现空白

## 修正
- `zs-table-column.vue` 不再将自定义固定列包含在宽度分配中
- `getBaseWidth` 直接使用 `slot-width` 以对齐实际宽度

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：00b4659f-08fb-4133-a80c-e461befbd2cf
- 验证证据: src=苏州市房地产监测V3-rest/039.md
- 涉及文件: zs-table-column.vue, zs-table.vue, FranchiseTable.vue, detail-template.vue, houseTable.vue, appendix.js, README.md, companyApplyAudit/detail.vue
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 00b4659f-08fb-4133-a80c-e461befbd2cf; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_fixed_col",
  "source_extraction_id": "a7d4b155515447d4b59be6579654e5d2",
  "version": 1,
  "memory_type": "entities"
}
-->