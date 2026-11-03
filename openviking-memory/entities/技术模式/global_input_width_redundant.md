# 全局样式已兜底input宽度冗余style可删
src/styles/element-ui.scss 已全局设置 input 宽度 100%，zs-input 及 amount-input 上的 width:100% 内联样式冗余可删。

## 问题现象
- `src/styles/element-ui.scss` 中 `.el-form` 与 `.el-form-item__content > *` 已全局设置 `width: 100%`
- `zs-input` 及 `amount-input` 上的 `width: 100%` 内联样式冗余

## 解决方案
- 已在 `zhi2-web-admin/src` 清理 140 个文件纯 100% 宽度写法，lint 无报错

## 验证与归属
- 验证证据：src=园区物管2.0/029.md
- 涉及文件：zhi2-web-admin/src/views/benefit/components/AutoReconciliationDialog.vue、zhi2-web-admin/src/components/zs-input/zs-input.vue、zhi2-web-admin/src/main.js、zhi2-web-admin/src/components/zs-input-number/zs-input-number.vue、zhi2-web-admin/src/components/zs-textarea/zs-textarea.vue、zhi2-web-admin/src/components/zs-select/zs-like-select.vue、zhi2-web-admin/src/components/Process/common/XForm.vue、zhi2-web-admin/src/components/AmountInput/index.vue
- 所属项目：园区物管2.0；代码基线 none；来源会话 06f932da-3393-48a6-bff2-4f09b55cb82b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_input_width_redundant",
  "source_extraction_id": "7573fea884d54cc7a5763884e2477eaa",
  "version": 1,
  "memory_type": "entities"
}
-->