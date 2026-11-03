# 弹窗两列布局中文本域经样式覆盖保持整行
苏州市房地产监测V3弹窗两列布局通过样式覆盖确保文本域不被压缩宽度，始终占满整行。

## 修复方案
- 弹窗两列布局不压缩文本域宽度
- `detail-form.scss` 通过 `detail-dialog-grid-col-sizes` 与 `:has(.el-textarea)` 强制含文本域列 `width:100%` 覆盖
- `section-form` 文本域列使用 `grid-column: 1 / -1` 占满整行

## 涉及文件
- src/components/zs-dialog/zs-dialog.vue
- src/styles/detail-form.scss、src/styles/index.scss
- src/styles/mixin.scss、src/styles/variables.css

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/115.md（原 079.md 同会话再确认）
- 来源会话：8397c8af-8a67-463f-95c0-7ea80f1cd3d4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_textarea_full_row",
  "source_extraction_id": "b79ed4e1f3b24aa293ba672b370861aa",
  "version": 2,
  "memory_type": "entities"
}
-->