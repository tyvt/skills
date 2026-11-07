# zs-input-number 无按钮时保留 padding 并截断文本
`zs-input-number.vue` 的样式规则在 `:controls=false` (类 `is-without-controls`) 时仍然适用，占据 112px padding 并截断文本。

## 问题根因
- `is-without-controls` 类的样式仍然接收为按钮保留的 112px padding。
- 文本因空间不足被截断。

## 已应用的解决方案
- 向选择器添加 `:not(.is-without-controls)` 以恢复默认的 15px padding。
- 在 `VotingItemsDialog.vue` 中，将 `md/lg/xl` 网格从 6 增加到 8 以加宽。

## 涉及的文件
- `src/components/zs-input-number/zs-input-number.vue`
- `src/views/autonomy/multiply/components/VotingItemsDialog.vue`
- `src/views/autonomy/multiply/components/VotingItemsTable.vue`
- `src/components/zs-form/zs-form.vue`
- 项目的 `package.json`

## 验证与归属
- 所属项目: 惠山二期G
- 验证证据: `src=惠山二期G/011.md`
- 来源会话: `2381e8b3-483f-4cd3-afac-2e88786cc72a`
- 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_input_number_padding",
  "source_extraction_id": "fdaa115ec96f49938b5955e11ae03585",
  "version": 1,
  "memory_type": "entities"
}
-->