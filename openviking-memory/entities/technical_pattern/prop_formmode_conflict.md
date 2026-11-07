# 组件prop不可与全局mixin的formMode同名
苏州市房地产监测V3 中 PermitInfoPanel.vue 的 formMode prop 与 main.js 全局 mixin 注入的 formMode computed 同名冲突。

## 问题根因
- main.js 全局 mixin 注入 formMode computed
- PermitInfoPanel.vue 定义同名 formMode prop，产生冲突

## 修复方案
- 删除 PermitInfoPanel.vue 的 formMode prop
- 在 detail.vue 移除 :form-mode 传参

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/099.md
- 涉及文件：presale/permit/components/PermitInfoPanel.vue、presale/permit/components/detail.vue、components/zs-form/zs-form.vue、mixins/detailMixins.js、mixins/form.js、mixins/formComponents.js、mixins/area.js、presale/permit/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：c8141e9b-07dc-46ab-b4d6-78d2e9881aa2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "prop_formmode_conflict",
  "source_extraction_id": "66c8ef19744b4793b444164467b0f98d",
  "version": 1,
  "memory_type": "entities"
}
-->