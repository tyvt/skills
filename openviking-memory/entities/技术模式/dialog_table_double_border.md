# 弹窗内表格底部双重边框去重
园区物管2.0 中弹窗（非 list-card 容器）内 zs-table 底部出现加粗/重合下边框的根因与修复。

## 问题根因
- 弹窗内表格未包在 list-card 容器，不走列表页边框去重逻辑。
- Element UI 表格底部同时渲染两层：最后一行单元格 border-bottom 与 .el-table::before 伪元素底边叠加成粗线。
- 列表页正常因 list-card 全局样式已去重。

## 解决方案
- 在全局 index.scss 为弹窗表格容器（如 .dialog-box .dialog-right）补去重：隐藏 el-table 的 ::before/::after 伪元素。
- 由表格外层统一画一条底边，去掉末行单元格 border-bottom。
- 排查「线变粗」先确认表格容器是否走 list-card 边框体系。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/styles/index.scss、zhi2-web-admin/src/views/maintenance/accountQuery/type.vue、zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue。
- 所属项目：园区物管2.0；来源会话：1eca0e2f-d760-4bdb-bbc2-11cb409dd899；代码基线：d48841f13。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_table_double_border",
  "source_extraction_id": "6748b718b2a9471ca4346d124cc1977d",
  "version": 1,
  "memory_type": "entities"
}
-->