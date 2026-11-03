# 系统显示缩放导致弹窗内容截断统一加滚动
Windows 显示缩放/低分辨率下，登录页、选择弹窗、业务子表弹窗等内容区被裁切且无法滚动，逐页改 height 不可靠。

## 问题背景
- 缩放/低分辨率下弹窗内容区被裁切，底部按钮点不到。
- 与「125% 浏览器缩放 + tableTrCount」类表格行高问题互补：本轮重点是弹窗壳层高度链而非单表分页条数。

## 解决方案
- 在 `zs-dialog`、`zs-select-dialog` 及高频业务弹窗统一约束：弹窗主体 `max-height` + 内容区 `overflow-y: auto`。
- 必要时配合 `drag.js` 不再锁死可视高度，让缩放后仍能滚动触达 Footer。
- 涉及登录、注册、统计弹窗等应一并回归。

## 验证与归属
- 验证证据：会话 911619fe 提交说明「修复弹窗及表单在缩放分辨率下内容被截断无法滚动的问题」，变更含 zs-dialog、zs-select-dialog、login 等 11 个文件。
- 涉及文件：zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue、zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue、zhi2-web-admin/src/directives/dialog/drag.js、zhi2-web-admin/src/views/login.vue
- 所属项目：园区公共收益；来源会话ID：911619fe-fba8-46b0-96ee-51b12ea1fa17；代码基线：8215c1a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_scroll",
  "source_extraction_id": "a0dff37d982d44f1904b307947a717bd",
  "version": 1,
  "memory_type": "entities"
}
-->