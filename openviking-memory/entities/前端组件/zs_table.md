# zs-table 表格组件
苏住房G项目后台列表使用的表格组件，支持自定义列插槽与 fixed 列。
## 多标签渲染范式
- 多 el-tag 列使用 LabelTags 公共组件，超限时只渲染前 N 个并追加 +N 计数项（表格场景 compact 模式上限2个）。
- el-tooltip 必须 append-to-body 且 z-index 提到 3000 以上，否则被 fixed="right" 操作列压住。
## 根因与避坑
- 根因含列 min-width 仅 200px、标签容器 overflow:hidden 截断单标签、标签列紧邻 fixed 右列被覆盖。
- 容器不要 overflow:hidden，compact 模式允许 flex-wrap 换行；列 min-width 给到 260px 并挂 class-name 锁溢出在单元格内。

<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "zs_table",
  "source_extraction_id": "9e18b30cf1944ddd803c60e3d00c1c14",
  "version": 1,
  "memory_type": "entities"
}
-->