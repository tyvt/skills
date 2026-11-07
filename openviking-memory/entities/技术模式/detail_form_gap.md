
# 详情表单垂直间距统一为 24px
原始的 `.el-form-item` 的 `padding-bottom` 加上 `section-form` 的 `row-gap` 导致了异常的间距；将 `--detail-block-gap` 统一为 24px 并清零该项的 padding。

## 约定点
- `.el-form-item` 的 `padding-bottom` 加上 `section-form` 的 `row-gap` 导致了异常的间距
- `variables.css` 中的 `--detail-block-gap` 由 `12px` 改为 `24px`（`section-form` 的 `row-gap` 会同步）
- 在 `detail-form.scss` 中：Headline 折叠区 `.el-form-item` 增加 `padding-bottom: 0`，行距只由 `el-row` / `section-form` 的 `gap` 承担；详情页/弹窗栅格内表单项 `padding-bottom: 0`；筛选条保持 `padding-bottom: 0`
- 仅 `.el-dialog__body` 内「无 `el-row`、直接 `el-col` 堆叠」用 `padding-bottom: var(--detail-block-gap)`，避免与 `detail-from-container > .zs-form` 的 `row-gap: 16px` 叠加

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：14ac23b1-f562-46c6-80d9-d8e3b7a96870
- 验证证据: src=苏州市房地产监测V3/109.md
- 涉及文件: styles/detail-form.scss, vite.config.js, styles/index.scss, styles/variables.css, styles/element-ui.scss, presale/entrustSale/detail.vue, zs-dialog/zs-dialog.vue
- 所属项目: 苏州市房地产监测V3; 会话: 14ac23b1-f562-46c6-80d9-d8e3b7a96870; baseline: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_form_gap",
  "source_extraction_id": "96ca86b0c3a64f9d81fb857532a1c43b",
  "version": 2,
  "memory_type": "entities"
}
-->