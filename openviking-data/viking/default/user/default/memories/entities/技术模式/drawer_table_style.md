# el-drawer内表格全局样式模式
在全局 element-ui.scss 中处理抽屉内 el-table 的滚动与单元格留白问题，使所有 drawer 内表格一致生效。

## 问题描述
- 抽屉里嵌 el-table 时表体出现独立滚动条、单元格过挤，与设计稿不一致

## 解决方案
- 对 `.el-drawer__body .el-table` 设 `.el-table__body-wrapper { overflow: visible !important; }`，纵向滚动交给 drawer 容器
- 提高 drawer 内 `.el-table td` 的 padding 与行高（如 padding 12px 16px、line-height 22px）
- 修改全局样式，所有 drawer 内表格一致生效

## 验证与归属
- 验证：打开含抽屉表格的业务页，表体不再出现内层滚动条，单元格留白与设计一致
- 涉及文件：zhi2-web-admin/src/styles/element-ui.scss
- 所属项目：2-0；来源会话：7f3a94cb-8b2a-4c1e-9d3e-4f8a1b2c3d4e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "drawer_table_style",
  "source_extraction_id": "359c236a1969416fa338e5f5e1bf3a00",
  "version": 1,
  "memory_type": "entities"
}
-->