# 弹窗表单标签右对齐且排除上下布局
苏州市房地产监测V3 中弹窗表单标签统一右对齐，上下布局弹窗除外。

## 规则
- zs-form.vue 中 formLayout === 'top' 保持上下布局，其余情况统一 label-position="right"
- index.scss 将详情页 label 右对齐规则扩展至 .el-dialog__body，通过 :not(.el-form--label-top) 排除上下布局弹窗

## 涉及文件
- components/zs-form/zs-form.vue
- styles/index.scss
- components/zs-dialog/zs-dialog.vue
- projectManagement/customerProject/components/ParcelDialog.vue
- store/modules/app.js
- system/platformConfig/detail.vue
- components/CompanyDialog/index.vue
- benefit/parkingManage/components/subDialog.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/134.md
- 来源会话：3d7db622-e5d6-4900-80d6-9428979eb12a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_label_align",
  "source_extraction_id": "2d636c74f56d4a018abe20d46118cc05",
  "version": 1,
  "memory_type": "entities"
}
-->