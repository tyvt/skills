# 列表页表格空白区域修复（苏州市房地产监测V3）
苏州市房地产监测V3 修复列表页表格下方空白区域，表格数据少于 10 行时自动按内容收缩。

## 修改内容
- zs-table.vue 新增 inListCard，在任意 .list-card 内为 true
- shouldSparseAutoHeight 改为基于 inListCard（不再仅限区域树布局）
- shouldAutoFillHeight 仍使用 inListCardLayout（区域树列表满页时继续撑满视口）
- 删除页面级 min-height：companyApplyAudit/index.vue、institution/record/index.vue、companyRecordAgency/index.vue、companyApply/index.vue

## 效果
- 所有 list-card 内表格在数据少于 10 行时自动按内容收缩
- 不再出现表体下方大块空白

## 验证与归属
- 涉及文件：zs-table.vue、company/companyApplyAudit/index.vue、institution/record/index.vue、company/companyRecordAgency/index.vue、company/companyApply/index.vue
- 所属项目：苏州市房地产监测V3
- 来源会话：deee3f49-3c02-4d81-a251-d57518e4e866
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_table_shrink",
  "source_extraction_id": "bf450a2d11c2459da691fafe70ea3219",
  "version": 1,
  "memory_type": "entities"
}
-->