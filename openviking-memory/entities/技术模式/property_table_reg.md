# companyRecord detail.vue 补注册 propertyContractTable 组件
在 `/toB/companyInfo` 对应的 `src/views/toB/companyRecord/detail.vue` 中使用了 `<propertyContractTable>` 但未 import 与注册，导致运行时 `Failed to resolve component` 告警，已修复。

## 问题根因
- `detail.vue` 模板中使用 `<propertyContractTable>` 组件，但未从 `@/views/company/companyManagement/components/propertyContractTable.vue` 引入。
- 未在 `components` 选项中注册，Vue 无法解析该组件。

## 修复方案
- 添加 `import propertyContractTable from '@/views/company/companyManagement/components/propertyContractTable.vue'`。
- 在 `components` 中注册 `propertyContractTable`。
- Vite HMR 已更新 `detail.vue`，刷新后警告消失。

## 涉及文件与归属
- 涉及文件：`src/views/toB/companyRecord/detail.vue`、`@/views/company/companyManagement/components/propertyContractTable.vue`。
- 所属项目：2-0；来源会话ID：1dad72c5-73f0-43c2-8c13-cda8490370ba；验证证据：extracted source=cursor project=2-0。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_table_reg",
  "source_extraction_id": "b22c5c3f66104829a41402eaeb1ba6a1",
  "version": 1,
  "memory_type": "entities"
}
-->