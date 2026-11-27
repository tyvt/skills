---
audit_status: valid
last_checked: 2026-11-27T04:15:01+08:00
verdict_note: 苏州市房地产监测V3 contractTable命中，Headline子表约定与代码一致。
---
- 在 `specialcontract/detail.vue` 中移除嵌套 `contractTable` 的父级 `Headline`，以避免重复的标题和按钮。
- 将 `title-text` 和 `v-if` 移动到 `<contractTable>` 内部，并在 `specialcontract/components/contractTable.vue` 中将默认标题改为 '合同信息'。
- 子表格组件应唯一负责 `Headline`，遵循 `businessItemTable`/`assetTable` 的约定。
- 涉及文件: e2e/fixtures/menu-config.js, 路由信息.json, commercialHousingSales/presale/specialcontract/detail.vue, components/contractTable.vue, src/styles/index.scss, index.vue, e2e/tmp-specialcontract-layout.spec.js, index.html
- 验证证据: src=苏州市房地产监测V3-rest/064.md; 会话 ed41ad4f-538d-41dd-8437-aa4dccefa372

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->