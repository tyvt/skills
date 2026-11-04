# 详情表单垂直间距统一为 24px
原始的 `.el-form-item` 的 `padding-bottom` 加上 `section-form` 的 `row-gap` 导致了异常的间距；将 `--detail-block-gap` 统一为 24px 并清零该项的 padding。

## 约定点
- `.el-form-item` 的 `padding-bottom` 加上 `section-form` 的 `row-gap` 导致了异常的间距
- `variables.css` 中的 `--detail-block-gap` 改为 `24px`
- 在 `detail-form.scss` 中，表单项的 `padding-bottom:0`，除非 `.el-dialog__body` 没有 `el-row` 且直接堆叠 `el-col` 时，此时使用该变量以避免重叠

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/109.md
- 涉及文件: styles/detail-form.scss, vite.config.js, styles/index.scss, styles/variables.css, styles/element-ui.scss, presale/entrustSale/detail.vue, zs-dialog/zs-dialog.vue
- 所属项目: 苏州市房地产监测V3; 会话: 14ac23b1-f562-46c6-80d9-d8e3b7a96870; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_form_gap",
  "source_extraction_id": "ffbc88f6ff83419787a66226a5f2572d",
  "version": 1,
  "memory_type": "entities"
}
-->