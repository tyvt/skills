# 退款利息计算弹窗标签布局修复
产品2.0 「退款利息计算」弹窗左侧标签竖排问题已修复，改为顶部对齐标签与左右分栏。

## 问题原因
- 窄列中使用默认左右标签布局，`label-width: auto` 宽度不足时中文逐字换行，导致「年利率」「退款计息时间」等标签竖排。

## 修改内容
- `AccountRefundTable.vue` 左右分栏：左侧 7 列放表单和「开始计算」，右侧 17 列放结果表格。
- 标签改为顶部对齐：`label-position="top"`，标签在输入框上方横向显示。
- 样式补充：`white-space: nowrap` 防换行，日期选择器 `width: 100%`，左右区域用分隔线区分。

## 涉及文件与来源
- 文件：`zhi2-web-admin/src/views/maintenance/accRefund/components/AccountRefundTable.vue`、`zs-form.vue` 等（前缀 `d:/repository/产品2.0`）。
- 所属项目：产品2.0；来源会话：eb221aa1-2087-4199-bdaa-bad2bfefb096。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_dialog_layout",
  "source_extraction_id": "d862fbde073b4aeb99df7780c2490c15",
  "version": 1,
  "memory_type": "entities"
}
-->