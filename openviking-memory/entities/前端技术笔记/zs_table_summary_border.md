# zs-table 合计行下边框缺失修复
带小计（show-summary）的 zs-table 因容器 overflow hidden 裁切 footer-wrapper，需在组件层加 with-summary 类统一补下边框。

## 现象与问题
- 列表页带小计的表格，小计行下方缺一条下边框线
- .list-card 表格只设上/左/右边框没有下边框；有分页时不加 zs-table-container--bottom-spacing，不会自动补下边框
- 小计行在 el-table__footer-wrapper 内，底部边框易被表格容器 overflow: hidden 裁切

## 解决方案
- 在 zs-table 组件层统一收敛：启用合计行时给容器加 zs-table-container--with-summary 类名
- 全局 index.scss 对该类补 border-bottom: 1px solid #f0f0f0
- 页面侧绑定 :border="border" 并设置 bottom-summary-variant="table"，让下方「合计」区域与表格边框衔接
- 该修复对所有带小计的列表页一次性生效，不要逐页改样式

## 关联信息
- 涉及文件：zhi2-web-admin/src/components/zs-table/zs-table.vue、zhi2-web-admin/src/styles/index.scss；所属项目：园区物管2.0；来源会话：9a3daf50-8a49-4516-af4c-070c6201cf9b；代码基线：fc994977f

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zs_table_summary_border",
  "source_extraction_id": "02ecf26ada894602a6a08e759af6c433",
  "version": 1,
  "memory_type": "entities"
}
-->