# 移除选项卡边框并对齐工具栏
在苏州市房地产监测V3中，全局样式移除选项卡边框并将标题与工具栏对齐。

## 解决方案
- 在 `index.scss` 中，`.tabs-content .collapse-container` 使用 `border: none !important` 来覆盖 `Headline` 的 scoped 边框（除了 `border-only`、`appendix-section`）。
- `.collapse-header` 使用 `flex` + `nowrap`；将 `.operation-button-container` 的 `margin/padding` 清零以将标题与工具栏 `#right` 对齐（兼容 `zs-tabs.vue` 的 DOM）。

## 验证
- 验证证据: src=苏州市房地产监测V3/093.md
- 涉及文件: supervision/progress/change/detail.vue, BuildingChangeTable.vue, Headline/index.vue, styles/index.scss, supervision/progress/node/detail.vue, AgreementDetailsTable.vue, ShareholderTable.vue, supervision/unblock/usemoney/detail.vue
- 源会话: 347d795c-a17e-454d-9b6d-e10334fa6635; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tab_border_style_fix",
  "source_extraction_id": "001ba47e03e9421b8f9ada51bc0b7ab9",
  "version": 1,
  "memory_type": "entities"
}
-->