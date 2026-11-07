# 嵌套 zs-dialog 内层控件点不动修复
嵌套 zs-dialog 时内层控件点不动的根因是父级全屏 v-modal 盖住内层 wrapper，需抬升内层 wrapper/遮罩 z-index。

## 问题根因
- 内层 zs-dialog 嵌在父 zs-dialog 时，父级全屏 v-modal 仍盖住内层 .el-dialog__wrapper（Element PopupManager 分配不足）
- 仅给 el-select 的 popper-class 提高 z-index 无法抬高内层弹窗本身，事件被父遮罩吃掉

## 修复方案
- 内层 zs-dialog 设 ref，在 @opened 回调里用 !important 将内层 .el-dialog__wrapper 设为约 5000、相邻 .v-modal 设为 4999
- 在 $nextTick 与 setTimeout(0) 各执行一次以防 Element 回写 inline 样式
- 下拉面板 popper-class 再设更高（如 5100）保证展开层在内层弹窗之上

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证：会话 f7fa3bf8 中 solicitation/maintenanceFeeDtlDialog 嵌套编辑弹窗内 el-select 无法点击，结论为层级在 wrapper/遮罩而非 dropdown
- 涉及文件：zhi2-web-admin/src/views/solicitation/components/maintenanceFeeDtlDialog.vue；所属项目：2-0
- 来源会话ID：f7fa3bf8-e11d-41c2-ab82-7f380cbd83c7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "nested_dialog_zindex",
  "source_extraction_id": "7e05f1205910435fbbe5059959536467",
  "version": 1,
  "memory_type": "entities"
}
-->