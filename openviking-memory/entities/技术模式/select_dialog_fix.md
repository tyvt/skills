# select-dialog 关闭拖拽并统一留白防冲突
在苏州市房地产监测V3中，select-dialog 与 drag.js 绝对定位冲突，已通过关闭拖拽并统一留白解决。

## 问题根因
- zs-dialog.vue 中 select-dialog 默认可拖拽，与 drag.js 绝对定位冲突
- Element 默认 margin-top 干扰 flex 居中

## 修复方案
- dialogDragEnabled 在 select-dialog 时关闭 v-dialogDrag
- 默认 top: '0'
- 以 --zs-dialog-select-wrapper-padding 统一留白与 max-height 计算

## 涉及文件
- zhi2-web-admin/src/views/supervision/agreement/xy/components/AgreementDetailsTable.vue
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
- zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue
- zhi2-web-admin/src/styles/index.scss

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/084.md
- 来源会话：bbc55614-1928-472e-9700-f59ccfc62415
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_dialog_fix",
  "source_extraction_id": "9a7a6e30e88942b69bcab76fafb42454",
  "version": 1,
  "memory_type": "entities"
}
-->