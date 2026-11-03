# 弹窗表单标签右对齐控制
苏州市房地产监测V3 中弹窗表单标签右对齐由 zs-form.vue 与 index.scss 共同控制。

## 实现要点
- zs-form.vue 将非 top 布局映射为 label-position="right"
- index.scss 将 label 右对齐规则扩展至 .el-dialog__body
- 以 :not(.el-form--label-top) 排除上下布局弹窗

## 涉及文件
- components/zs-form/zs-form.vue 与 styles/index.scss（核心实现）
- components/zs-dialog/zs-dialog.vue
- projectManagement/customerProject/components/ParcelDialog.vue 与 store/modules/app.js
- system/platformConfig/detail.vue 与 components/CompanyDialog/index.vue
- benefit/parkingManage/components/subDialog.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/177.md
- 来源会话：3d7db622-e5d6-4900-80d6-9428979eb12a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_label_right_align",
  "source_extraction_id": "557c86357e9b4baca04357cc63d73f27",
  "version": 1,
  "memory_type": "entities"
}
-->