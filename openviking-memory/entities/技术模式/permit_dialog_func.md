# permit_dialog_func
权限选择对话框的内联组件导致表格溢出；在苏州市房地产监测V3项目中被功能性Dialog取代。
## 问题
- `<permit-select-dialog>` 内联导致表格溢出和配置分散
## 解决方案
- 添加 `permitSelectConstants.js` 以统一列和 `buildPermitSelectDialogOptions()`
- `permitExtend/detail.vue` 和 `permitCancel/detail.vue` 移除组件并使用 `SelectDialog.open()` 读取选项 `EXTEND_/CANCEL_PERMIT_SELECT_DIALOG_OPTIONS`
## 文件
- permitExtend/detail.vue, PermitSelectDialog.vue, permitCancel/detail.vue, permitExtendConstants.js, MEMORY.md, 2026-09-13.md, presale/permit/components/detail.vue
## 验证
- 来源: 苏州市房地产监测V3/053.md; 会话: ab72e6c1-ca61-4d4b-a2cd-bdb43518c52a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_dialog_func",
  "source_extraction_id": "ecf2b490657f45b9bed88b23d9e2450a",
  "version": 1,
  "memory_type": "entities"
}
-->