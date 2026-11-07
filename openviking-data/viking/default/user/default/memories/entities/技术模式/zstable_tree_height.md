# zs-table树形展开高度固定不增加
园区物管2.0 的 zs-table 在固定行高场景下，树形（懒加载）展开后高度仍按根级 data 长度计算，导致展开多少行都只显示两行。

## 问题根因
- 固定行高（`tableTr`）时，`getBaseTableHeight()` 用 `Math.min(tableTr, tableData.length)` 乘行高算高度。
- 部门管理页为懒加载树，根级 `tableData` 仅「苏州市」1 条，子行存于 `lazyTreeNodeMap` 不进根级 `data`，高度被算成 1-2 行。
- 树形展开子行由 `lazyTreeNodeMap` 提供未进根级 `data`，且 `expand-change` 事件不触发高度重算，展开后高度被固定。

## 解决方案
- 新增 `countRenderedTreeRows()`：按 `treeData`、`lazyTreeNodeMap[key] || row.children` 递归统计实际渲染行数，对齐 el-table `wrappedRowRender`，仅统计 `expanded` 父节点下子行。
- 固定行高时 `getBaseTableHeight` 改用 `Math.min(tableTr, renderedRows)`：超出 `tableTr` 出滚动条，行数少则表格收缩。
- 监听 el-table `@expand-change` → 写 `treeRowsVersion` → 经 `renderedTreeRows` 计算属性触发 `handleLayoutChange()` 重算高度，解决懒加载引用不变致 watcher 不触发。

## 验证与归属
- 验证：eslint 0 错误；`npm run build` 通过；4 场景单元模拟（折叠1行/展开3行/二级4行/收起1行，高度97/193/241px）符合；nginx `http://127.0.0.1:8099` 返回 200，新逻辑位于 `zs-table-pAlQJV2H.js` 被入口引用。
- Git：子模块 `zhi2-web-admin` 提交 `ca7d0ab1d`、主仓库 `3df4369`，分支 `develop/v2.6.2-portal`，未推送远程。
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue；所属项目：园区物管2.0；来源会话：2026-11-02 修复会话。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_tree_height",
  "source_extraction_id": "40eb268b09a440e4ae6c753c98285735",
  "version": 1,
  "memory_type": "entities"
}
-->