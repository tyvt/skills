
# 操作列表头背景色缺失修复
淮安物管 zhi2-web-admin 中 `zs-operate-column` 组件因非 scoped 样式将强制白底作用于表头，导致「操作」列背景色缺失的修复约定。

## 问题背景
- `zs-operate-column` 内原有一段非 scoped 样式：`.el-table .zs-operate-column-cell { background-color: #ffffff !important; }`。
- 表头 `th` 与表体 `td` 都带 `zs-operate-column-cell`（分别来自 `label-class-name` / `class-name`）。
- `!important` 压过 `ZsTable` 通过 `header-cell-style` 给表头写的 `#fafafa`，使「操作」列表头变纯白或与灰底表头不一致，固定右列叠层时像背景缺失。

## 修复方案
- 把「强制白底」只作用在表体（主表 + 右侧固定列的 body），不再作用于表头。
- 代码位置：zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue 约 127:134 行，注释说明：操作列 td 由表格渲染在组件外，需非 scoped 才能命中固定列单元格；勿作用于 th，否则会覆盖 ZsTable 表头 #fafafa。

## 涉及文件
- zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue
- zhi2-web-admin/public/assets/css/element-ui.css
- zhi2-web-admin/src/styles
- zhi2-web-admin/src/styles/element-ui.scss

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管
- 验证证据：src=淮安物管 cursor 提取
- 所属项目：淮安物管；来源会话：90849550-cbec-4e10-ad4a-35a4b2cf03ba；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operate_column_bg",
  "source_extraction_id": "829524b31da8427facda7c3ea75fe26b",
  "version": 1,
  "memory_type": "entities"
}
-->