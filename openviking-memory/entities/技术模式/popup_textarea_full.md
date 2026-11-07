# 弹窗两列布局中文本域整行规则
苏州市房地产监测V3 项目在弹窗内将表单全局改为两列，但文本域（备注等）仍保持整行一列，未被压成半宽。

## 规则依据
- 在 detail-form.scss 中，任意宽度下弹窗专用规则对带 .el-textarea / .zs-textarea 的列强制 width:100%（detail-collapse-col-full-row）
- 在 ≥768px 下，detail-dialog-grid-col-sizes 对 span=8/12 的两列规则之后，再次对 :has(.el-textarea) 做整行覆盖
- 弹窗内直接用 el-form / zs-form > el-col（无 el-row）时，同样在 ≥768px 应用上述 mixin，文本域列仍是整行

## 其他表单场景
- section-form / scheme-form-grid 全局已有：含文本域的 .section-field 使用 grid-column: 1 / -1 占满整行
- 弹窗仅把网格改成两列，文本域仍整行

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/styles/detail-form.scss、zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：8397c8af-8a67-463f-95c0-7ea80f1cd3d4

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "popup_textarea_full",
  "source_extraction_id": "bbd4581dcffa4b8cbd0e54040f471573",
  "version": 1,
  "memory_type": "entities"
}
-->
