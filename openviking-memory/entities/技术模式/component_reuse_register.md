# 可复用组件必须被导入并注册
在 Vue2/Options API 模板中，使用 PascalCase/camelCase 的自定义标签而不在 `components` 中导入并注册，会导致 Vue 无法解析该组件（报错 "Failed to resolve component" 或未知的自定义元素）。

## 问题根因
- 复用其他目录中的组件（例如：company 中的 propertyContractTable.vue）需要在当前 SFC 中显式导入并注册。
- 如果不注册，Vue 无法解析该组件，无论其是否为原生自定义元素。
- 在预览模式下使用已存在的组件（例如：DetailTemplate）而不注册，也会产生未知的自定义元素。

## 解决方案
- 在当前 SFC 中显式导入组件路径，并在使用前将其注册到 `components` 选项中。
- 不要依赖全局注册，也不要假定其为原生自定义元素。

## 验证与来源
- 案例 1：会话 1dad72c5 — /toB/companyInfo 在 companyRecord/detail.vue 中使用了未注册的 propertyContractTable，解析失败。 涉及文件: zhi2-web-admin/src/views/toB/companyRecord/detail.vue; zhi2-web-admin/src/views/company/companyManagement/components/propertyContractTable.vue. 所属项目: 2-0; 会话: 1dad72c5-73f0-43c2-8c13-cda8490370ba.
- 案例 2：会话 cdb8c8d2 — bankTable.vue（预览模式）使用了未注册的 DetailTemplate；仅 mixin subTableMixins 不包含该组件。修正：显式导入并注册 DetailTemplate，同样在 companyManagement/components/bankTable.vue 中。 涉及文件: src/views/company/companyRegister/components/bankTable.vue; src/views/company/companyManagement/components/bankTable.vue; src/mixins/subTableMixins.js; src/views/company/companyManagement/components/qualificationDialog.vue; src/main.js; src/views/maintenance/components/AllocationDialog.vue; src/views/company/companyRegister/dialog.vue; src/mixins/dialogMixins.js. 会话: cdb8c8d2-612f-4ad7-a826-8e4470159f9f.

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 来源会话：1dad72c5-73f0-43c2-8c13-cda8490370ba


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "component_reuse_register",
  "source_extraction_id": "7493d2e07b614c8495b8ab8a2d8d67a3",
  "version": 2,
  "memory_type": "entities"
}
-->
