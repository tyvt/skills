# zs-table 固定可视行高与内部滚动
zs-table 通过 `fixedViewportRows` + `tableTr` 固定表体可视高度，超出时在表体内滚动、表头固定。

## 实现规则
- 启用 `fixedViewportRows` 时 `displayRows` 应固定为 `this.tableTr`（如 5），使 `height` 恒定为 N 行高度
- 数据超过 `tableTr` 行时表体内部纵向滚动、表头固定；不足时保留 N 行高度留白
- `HomeTodoTable.vue` 已传 `:table-tr="visibleRows"`(=5)、`fixed-viewport-rows=true`、`row-height=48`、`header-height=48`
- 未启用 `fixedViewportRows` 的固定行数场景仍走 `Math.min(tableTr, renderedRows)`，行为不变

## 已知缺陷与修复
- 缺陷：`getBaseTableHeight` 中 `fixedViewportRows` 分支原用 `Math.max(renderedRows, 1)`，按实际行数撑高表格，导致数据多时表格变高、不滚动
- 修复：改为 `fixedViewportRows` 时 `displayRows = this.tableTr`（固定 5 行高度），`:height="effectiveTableHeight"` 绑定 el-table 的 height 产生内部滚动
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue；基线：develop/v2.6.2-portal

## 验证与归属
- 验证：2026-11-05 `npm run build` 通过（exit 0，仅有既有 Sass/SVG/chunk 警告），产物输出 `D:\repository\门户\dist`
- Git：子模块 zhi2-web-admin 提交 6de408a1e（推送 9e980b57b..6de408a1e），父仓库 门户 提交 8ba2986，分支 develop/v2.6.2-portal
- 未纳入 zhi2-web-admin-wt-payfund/（其他任务 worktree）


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_fixed_viewport_rows",
  "source_extraction_id": "dca305e411d6418ca595c5206749d40d",
  "version": 1,
  "memory_type": "entities"
}
-->