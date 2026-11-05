# 选择流程弹窗复选框误显圆形修复
产品2.0 SelectRecordProcedureDialog 因全局 single-choice 样式作用于所有复选框，导致左侧类别复选框被画成圆形，已修复。

## 问题根因
- SelectRecordProcedureDialog 的 custom-class 带 single-choice
- 全局样式 .single-choice .el-checkbox__inner{border-radius:50%} 作用于整个弹窗所有复选框
- 左侧「所属类别」的 Element 复选框也被画成圆形，看起来像单选

## 解决方案
- 在 element-ui.scss 把圆形样式限定在表格内部：.single-choice .el-table .el-checkbox__inner{border-radius:50%}
- 左侧恢复为方形多选复选框，右侧表格选择列保持圆形单选样式

## 验证与归属
- 涉及文件：zhi2-web-admin/src/styles/element-ui.scss、dataProperty/recordProcess/components/SelectRecordProcedureDialog.vue、dataProperty/procedure/detail.vue、dataProperty/procedure/index.vue
- 所属项目：产品2.0；来源会话：6b9584dd-8399-40b2-8b79-9baf367ed910；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "single_choice_checkbox_style",
  "source_extraction_id": "82270027bd254d6e9e2b58eca3f38ac5",
  "version": 1,
  "memory_type": "entities"
}
-->