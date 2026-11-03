# 空表格底边框叠加收敛
园区物管2.0 中 el-table 空数据时底边框缺失/偏粗/操作列下多线的根因与收敛方案。

## 问题根因
- 空表底边由最多 5 处来源叠加：通用 `.el-table { border-bottom }`、空表修复 `.el-table::before`、固定列 `::before`、合计行 footer 及 `zs-table.vue` 重复样式，致 2~3px 偏粗。
- 页面级/外层容器样式覆盖无效，因改不动这些内部来源。

## 解决方案
- 空表底边只保留 `.el-table::before` 这一条 1px，其余关掉：去空表 border-bottom、隐藏固定列 ::before、去合计行单元格底边、删 zs-table.vue 内重复样式。
- 修改须落在组件/全局样式层（element-ui.scss、index.scss、zs-table.vue），逐页写样式无效。

## 排查套路
- 用户怀疑「边框重合」时，先穷举同一视觉位置所有 border/伪元素来源再逐条裁剪，而非继续加样式覆盖。
- 涉及文件：pubUseMoneyApply/index.vue、zs-table.vue、element-ui.scss、index.scss、zs-operate-column.vue、pubBankDetailDay/index.vue、resourcesLeaseContractFiling/index.vue、ZsSummaryText/index.vue；所属项目：园区物管2.0；验证：src=园区物管2.0/020.md；来源会话：2352374e-e4c1-4b7f-8295-5892e58f8155。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_border_stack",
  "source_extraction_id": "e34e584f43f440f99c29591c85ce8126",
  "version": 2,
  "memory_type": "entities"
}
-->