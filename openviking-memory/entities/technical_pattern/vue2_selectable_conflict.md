# Vue2 data覆盖computed同名selectable属性
`table.js` mixin 在 data 声明 `selectable: true`，与组件同名 computed 冲突，Vue2 以 data 为准导致 `v-if="selectable"` 恒真。

## 问题根因
- `table.js` mixin 在 data 声明 `selectable: true`
- 组件同名 computed `selectable` 被 data 覆盖，Vue2 中 data 优先级更高
- 导致 `v-if="selectable"` 恒真，多选列始终渲染

## 解决方案
- 移除组件 computed 的 `selectable`
- 在组件 `data()` 声明 `selectable: !this.isChange` 控制多选列渲染

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/052.md
- 涉及文件：table.js、companyRecordAgency/change/index、companyManagement/components/index.vue、companyManagement/change/index.vue、ListTemplate.js、listMixins.js、companyManagement/develop/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：8530b5ce-8b7c-4942-9abf-bfbaed7a0d36；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "vue2_selectable_conflict",
  "source_extraction_id": "bcf0b003094a4a44a50061529cd3e1a2",
  "version": 1,
  "memory_type": "entities"
}
-->