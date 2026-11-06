# zs-dialog关闭按钮垂直居中修复
苏州市房地产监测V3 全局修复 `zs-dialog` / `el-dialog` 标题栏关闭按钮（×）未垂直居中的问题。

## 问题根因
- `zs-dialog` 标题栏使用较大的 `--zs-dialog-padding-y`（32px），关闭按钮用 `top: var(--zs-dialog-padding-y)` 对齐上内边距，而非相对整条标题栏居中
- 无标题时（如机构注册弹窗 `header=""`）灰色标题区更高，偏移更明显
- 关闭图标设置 `line-height: 1.5`，进一步拉偏视觉中心

## 修改内容
- `src/styles/element-ui.scss`（全局覆盖所有 `el-dialog` / `zs-dialog`）：标题栏 `position: relative`；关闭按钮 `top: 50%` + `translateY(-50%)` 并用 `inline-flex` 居中图标；关闭图标 `line-height: 1`
- 例外：`.approval-dialog` 使用 flex 标题栏 + `position: static` 关闭按钮，重置 `top` / `transform` 避免二次位移
- `src/components/zs-dialog/zs-dialog.vue`：去掉错误的 `top: var(--zs-dialog-padding-y)`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`src/styles/element-ui.scss`、`src/components/zs-dialog/zs-dialog.vue`、`PrintDialog.vue`、`ChangeLogDialog.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：186a234b-b8c5-43be-8142-a0b0c30a7e10；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_close_fix",
  "source_extraction_id": "6677b5f047cc425687d16521ea64a021",
  "version": 1,
  "memory_type": "entities"
}
-->