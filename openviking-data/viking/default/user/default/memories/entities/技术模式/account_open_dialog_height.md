# 业主账户开户弹窗表格高度优化
产品2.0 项目优化维修资金账户管理业主账户开户弹窗，使表格可视区域占满弹窗可用高度。

## 问题根因
- 上次修复后虽能滚动，但 flex 父级无明确高度，flex:1 表格区域仅收缩到约 120px 最小高度，每页 10 条只能看到 2～3 行，弹窗下方大量空白未利用

## 解决方案
- dialog-box 高度设为 var(--zs-dialog-content-max-height)（约 88vh），内容区默认占满可用空间
- 打通 flex 高度链：el-dialog → el-dialog__body → dialog-box → 表格区域逐级传递高度
- 通过 ResizeObserver 将表格高度与容器实际高度对齐，避免被 zs-table 固定行高计算覆盖

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 刷新后重新打开弹窗列表区域应显示接近 10 条数据（视屏幕高度），超过可视区域仍可滚动
- 涉及文件：maintenance/components/OpeningBuildingDialog.vue、accountOpen/owner/components/ScopeSelectDialog.vue、maintenance/components/ScopeSelectDialog.vue；所属项目：产品2.0；来源会话：082a4d1c-6379-4946-a74a-7dab35a3ffd7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_open_dialog_height",
  "source_extraction_id": "b03b5caf46e0410f892f1f3a0dcce3da",
  "version": 1,
  "memory_type": "entities"
}
-->