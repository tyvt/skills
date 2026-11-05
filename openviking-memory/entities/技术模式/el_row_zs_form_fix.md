# 弹窗表单栅格宽度修复
产品2.0（zhi2-web-admin）中 `el-row` 误置于 `zs-form` 内导致栅格宽度计算错误、输入框被压窄，已修复。

## 问题根因
- `el-row` 放在 `zs-form` 里面，与本项目其他页面（如 `addpopupDialog`）结构不一致
- 栅格宽度计算错误，输入框被压得很窄，placeholder 无法完整显示

## 正确结构
- `form-box` 下直接放 `el-row.detail-from-container`，再放 `zs-form.form`
- `zs-form` 内用两个 `el-col`（各 50%）并排，再放「开始计算」按钮与结果表格

## 修复结果
- 两个字段各占一半宽度，placeholder 完整显示

## 涉及文件
- maintenance/accRefund/components/AccountRefundTable.vue
- api/index.js
- 所属项目：产品2.0；来源会话：d5ae2f3e-c3d7-4c77-8ef2-048ffc7b39f4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_row_zs_form_fix",
  "source_extraction_id": "cfc319a7d4474bb0b0c37ae22cfe0157",
  "version": 1,
  "memory_type": "entities"
}
-->