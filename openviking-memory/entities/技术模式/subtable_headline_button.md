# 子表组件独占Headline承载按钮
苏州市房地产监测V3 的 specialcontract/detail.vue 移除父层 Headline 包裹，改由子表组件 contractTable.vue 独占 Headline 以挂载操作按钮，遵循 businessItemTable/assetTable 约定。

## 实现要点
- `specialcontract/detail.vue` 移除父层 `Headline` 包裹
- `contractTable.vue` 新增 `title-text` 并以 `v-if` 控制，默认标题改为「合同信息」
- 由子表组件独占 `Headline` 承载按钮，遵循 `businessItemTable`/`assetTable` 既有约定

## 涉及文件
- zhi2-web-admin/e2e/fixtures/menu-config.js、路由信息.json
- zhi2-web-admin/src/views/commercialHousingSales/presale/specialcontract/detail.vue
- zhi2-web-admin/src/views/commercialHousingSales/presale/specialcontract/components/contractTable.vue
- zhi2-web-admin/src/styles/index.scss、specialcontract/index.vue
- zhi2-web-admin/e2e/tmp-specialcontract-layout.spec.js、index.html

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/115.md
- 来源会话：ed41ad4f-538d-41dd-8437-aa4dccefa372；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtable_headline_button",
  "source_extraction_id": "b79ed4e1f3b24aa293ba672b370861aa",
  "version": 1,
  "memory_type": "entities"
}
-->