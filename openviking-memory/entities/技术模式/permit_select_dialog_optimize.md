# 选证弹窗表格溢出 UI 优化
苏州市房地产监测V3 的选证弹窗已改为函数式 SelectDialog.open() 并统一共享配置。

## 改动摘要
- 新增共享配置 permitSelectConstants.js：统一列配置、buildPermitSelectDialogOptions()
- 延期/注销在各自 *Constants.js 中导出 EXTEND_PERMIT_SELECT_DIALOG_OPTIONS / CANCEL_PERMIT_SELECT_DIALOG_OPTIONS

## 详情页改造
- permitExtend/detail.vue、permitCancel/detail.vue 删除 <permit-select-dialog> 与 permitSelectVisible
- openPermitSelect() 改为 SelectDialog.open(...)

## 涉及文件与归属
- 涉及文件：permitSelectConstants.js、permitExtend/detail.vue、permitCancel/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：ab72e6c1-ca61-4d4b-a2cd-bdb43518c52a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_select_dialog_optimize",
  "source_extraction_id": "fb319a3c5f334f2eb408bff74ee001b7",
  "version": 1,
  "memory_type": "entities"
}
-->