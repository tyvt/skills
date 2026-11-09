# 禅道缺陷 #6373
苏州房地产客测环境开发企业基本信息预览附件关闭按钮无法关闭的缺陷。

## Description
- 标题：【苏州房地产客测环境】开发企业-企业基本信息，预览附件的时候点击 x 关不掉
- 环境：苏州房地产客测环境（新禅道库）
- 影响：所有 el-dialog/zs-dialog 调用方

## Root Cause
- 共享指令 v-dialogDrag 将 onmousedown 挂在 .el-dialog__header
- 关闭按钮 .el-dialog__headerbtn 位于 header 内，mousedown 冒泡到拖拽处理器导致弹窗重定位，浏览器取消后续 click，handleClose/closePreview 不触发

## Fix
- 改动 src/directives/dialog/drag.js，在 onmousedown 内对 .el-dialog__headerbtn 直接 return
- 保留关闭按钮 click，头部拖拽与 resize 手柄不受影响

## Resolution
- 状态：resolved/fixed，resolvedBy=tiany，resolvedDate=2026-11-09 19:46:55，resolvedBuild=trunk
- 指派回开单人 zhunan（assignedTo=zhunan）待验收
- 新增 zt_action id=89710（actor=tiany, action=resolved, extra=fixed, date=2026-11-09 19:47:07）
- 提交 zhi2-web-admin d71a36607、父仓库 05621b2/f254e07，分支 fix/bug-6373-preview-close 已推送

<!-- MEMORY_FIELDS
{
  "category": "禅道缺陷",
  "name": "zentao_bug_6373",
  "source_extraction_id": "e06e2c96f58b443a88b56bb0028b0228",
  "version": 1,
  "memory_type": "entities"
}
-->