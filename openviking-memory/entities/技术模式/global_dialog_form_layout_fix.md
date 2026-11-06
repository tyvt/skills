# 全局弹窗表单布局与组件替换修复
苏州市房地产监测V3 项目调整全局弹窗表单布局并替换公共组件，未改 main.js。

## 修改文件
- zhi2-web-admin/src/styles/element-ui.scss
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/src/views/components/SelectDialog.vue

## 布局改动
- element-ui.scss 取消对 .el-form-item__content > * 一律 width:100%
- 仅对块级控件（.el-input、.el-select、.el-date-editor 等）设满宽，span 保持 width:auto
- 含 span 的组合字段使用 flex + wrap + 小间距
- zs-dialog.vue 在 .form-box .zs-form > .el-col 上增加 float:none、clear:both，避免裸 el-col 叠层

## 组件替换
- 存量房依赖的公共弹窗 SelectDialog.vue 使用 zs-input / zs-button 替换原组件
- 直接替换成现有公共组件，未使用别名注册

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：8f811d4e-b703-418d-9f1c-8f677af83306
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_dialog_form_layout_fix",
  "source_extraction_id": "a8b1c9ca411446d791592c528e1649bf",
  "version": 2,
  "memory_type": "entities"
}
-->