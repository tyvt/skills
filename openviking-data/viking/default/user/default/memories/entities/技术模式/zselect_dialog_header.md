# zs-select-dialog 的 title 改为 header 对齐写法
在 depositNotice 的 PaymentRangeTable.vue 中，将 zs-select-dialog 的 title 属性改为 header，以与 company 组件一致。
## 背景
- depositNotice/components/PaymentRangeTable.vue 的新增选择弹窗原使用 title="初交明细选择"。
- company/components/PaymentRangeTable.vue 使用 header 属性，需保持一致。
## 修改
- 将 isProjectDialogVisible 与 isBuildDialogVisible 对应弹窗的 title= 改为 header=。
- 文件内既有 TS 报错非本次引入，仅做弹窗属性对齐。
## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：src/views/maintenance/depositNotice/components/PaymentRangeTable.vue、company/components/PaymentRangeTable.vue。
- 所属项目：2-0；来源会话：64df7727-22c7-4f7d-ab8e-726440dc4ed9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zselect_dialog_header",
  "source_extraction_id": "a2bc8961895245fc8e999b0fee80988e",
  "version": 1,
  "memory_type": "entities"
}
-->