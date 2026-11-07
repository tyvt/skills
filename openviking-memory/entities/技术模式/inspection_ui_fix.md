# 巡检程序选中 UI 修复
泰兴小程序员工端「添加巡检记录」中巡检程序选中 UI 与确定按钮颜色修复完成。

## 问题根因
- ZsDialog 使用 root-portal 后，弹层 DOM 脱离 .add-record-page，无法继承 --primary-color，导致选中边框、角标和确认按钮样式失效

## 修复内容
- add.vue：在 .procedure-popup、.step-form-popup 上添加 @include staff-page-theme
- addScrap.vue：在 .procedure-popup 上添加（两个选择弹窗共用该样式）
- detail.vue：在 .step-form-popup 上添加（关闭按钮同色问题一并修复）
- 做法与 MoreDialog、RejectDialog 等已有弹窗一致：在弹窗根节点单独注入主题变量（#1677ff）

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/staff/pages_facility/record/add.vue、src/staff/pages_facility/record/addScrap.vue、src/staff/pages_facility/record/detail.vue、src/staff/pages/complex-select/index.vue、src/components/ZsDialog/ZsDialog.vue、src/staff/styles/theme.scss
- 所属项目：泰兴小程序；来源会话ID：3d76cb6a-e2bc-44af-a9ab-3973a218005a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_ui_fix",
  "source_extraction_id": "6f0c4d0ce25a43908258dc2fb65fa244",
  "version": 1,
  "memory_type": "entities"
}
-->