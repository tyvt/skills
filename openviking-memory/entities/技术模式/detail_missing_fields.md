# Campos ausentes em detail.vue causam aviso Vue e erro de requisição
No projeto 苏州市房地产监测V3, `guarantee/detail.vue` tem `data()` sem campos, causando aviso Vue e concatenação errada de requisição de detalhe.

## 问题根因
- `data()` de `guarantee/detail.vue` ausenta `primaryKey`, `moduleName`, `businessName`
- Causa aviso Vue e erro de concatenação em `getDetail()`

## 解决方案
- Completar `data()` com `primaryKey: 'useMoneyApplyId'`, `moduleName: 'prefund'`, `businessName: 'useMoneyApply'` iguais a `guarantee/index.vue`
- Elimina aviso e permite requisição normal `/prefund/useMoneyApply/detail`

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-leftover/004.md
- 涉及文件: guarantee/detail.vue, mixins/detailMixins.js, guarantee/index.vue, usemoney/detail.vue, guarantee/changedetail.vue, usemoneyRevoke/detail.vue, mixins/form.js, notice/detail.vue
- 所属项目: 苏州市房地产监测V3; Sessão: e533c035-bd03-4c12-aa72-72937c898843; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_missing_fields",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 2,
  "memory_type": "entities"
}
-->