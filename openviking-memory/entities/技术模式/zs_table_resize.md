# zs-table 侧栏收展容器级 resize 重算布局
门户首页待办等 zs-table 在侧边栏折叠变宽后列间出现空隙，需监听表格容器并走完整布局重算分支。

## Description
- 现象：侧边栏折叠使内容区变宽后，zs-table 列间出现空隙。
- 根因：内容区宽度变化不触发 window.resize，仅 syncFixedColumnOffset 不足以重算布局。
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue

## Solution
- 在 observeTableResize 中 observe 表格容器（$el），回调走与 handleWindowResize 相同的 handleTableResize 分支（syncFillHeight / calculateTableHeight / doLayout）。
- 优化方向：对 handleTableResize 做 rAF 合并；或宽度问题只 observe 容器，避免重复触发 doLayout。

## Risk
- 同一 RO 同时 observe container、bodyWrapper、bodyTable 会在一次尺寸变化里连触 2～3 次 doLayout。
- fill-height 模式下 observeFillHeight 与 observeTableResize 还可能重复 observe $el；未合并 RO 导致重复 doLayout 为 MEDIUM 风险。

## Verification
- 验证证据：会话审查结论认可容器级 RO + 完整布局修复思路正确，列出未合并 RO 重复 doLayout 的 MEDIUM 风险。
- 所属项目：门户；代码基线：ac6513b；来源会话ID：188f5624-936a-4a00-b89b-99684b5bec13

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_resize",
  "source_extraction_id": "ed1fac0b5fc74af090dd3e2c670437c9",
  "version": 1,
  "memory_type": "entities"
}
-->