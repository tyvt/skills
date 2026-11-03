# 全局 formMode 混入与组件 prop 冲突警告
苏州市房地产监测V3 中 main.js 全局 mixin 注入 formMode computed，与 PermitInfoPanel.vue 同名 prop 冲突引发 Vue 警告。

## 问题根因
- main.js 全局 mixin 注入 `formMode` computed
- PermitInfoPanel.vue 声明同名 prop 导致 Vue 警告

## 修复方案
- 删除 PermitInfoPanel.vue 中的 `formMode` prop
- 删除 detail.vue 中的 `:form-mode` 传参
- 子组件沿用全局 mixin 提供的 formMode

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/153.md
- 涉及文件：zhi2-web-admin/src/views/presale/permit/components/PermitInfoPanel.vue、presale/permit/components/detail.vue、components/zs-form/zs-form.vue、mixins/detailMixins.js、mixins/form.js、mixins/formComponents.js、mixins/area.js、presale/permit/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：c8141e9b-07dc-46ab-b4d6-78d2e9881aa2；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_formmode_mixin_prop_conflict",
  "source_extraction_id": "44e59d3d914d48ed86daf5e20ef46d69",
  "version": 1,
  "memory_type": "entities"
}
-->