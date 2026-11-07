# 弹窗表单输入框间距修复
苏州市房地产监测V3 统一全局弹窗 `form-box` 表单项间距，新增 CSS 变量并调整多处弹窗结构。

## 全局规范
- `zs-dialog.vue` 的 `.dialog-box .form-box` 统一 `margin-bottom: var(--dialog-form-item-gap, 16px)`
- 最后一项 `margin-bottom: 0`（兼容 `zs-form > el-col` 与 `el-row > el-col`）
- 单选/多选 `width: auto` 去多余 `min-height`；文本域 `min-height: 0`；单行 `label-left` 标签 `line-height: 36px` 对齐

## CSS 变量
- `variables.css` 新增 `--dialog-form-item-gap: 16px`

## 涉及弹窗
- `YhwdDialog.vue`（新增网点）、`NodeDetailsDialog.vue` 等按规范调整结构

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`zs-dialog.vue`、`variables.css`、`YhwdDialog.vue`、`NodeDetailsDialog.vue`
- 所属项目：苏州市房地产监测V3；来源会话：a8a375c4-1710-4cbd-8b3e-450a43b85dde；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_form_spacing_fix",
  "source_extraction_id": "acdf608e6c0e448bb2d07a9151e852b1",
  "version": 1,
  "memory_type": "entities"
}
-->