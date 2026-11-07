# 弹窗表格下边框去重
园区物管2.0 的「选择物业管理区域」弹窗表格因未包在 list-card，出现多重下边框，已修复。

## 问题根因
- 弹窗表格未使用列表页边框去重逻辑
- Element UI 表格底部同时出现末行单元格 border-bottom 与 .el-table::before 伪元素底边，视觉上加粗

## 修复方案
- 在 index.scss 为 .dialog-box .dialog-right 内表格补上列表页一致处理
- 隐藏 el-table 的 ::before / ::after 伪元素
- 由表格外层统一画一条底边，去掉末行单元格底边避免重复

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：index.scss、maintenance/accountQuery/type.vue、components/zs-select-dialog/zs-select-dialog.vue、components/zs-table/zs-table.vue
- 所属项目：园区物管2.0；来源会话：1eca0e2f-d760-4bdb-bbc2-11cb409dd899；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_table_border",
  "source_extraction_id": "007d9a4c5d48457c8a0e1e4cd477c61c",
  "version": 1,
  "memory_type": "entities"
}
-->