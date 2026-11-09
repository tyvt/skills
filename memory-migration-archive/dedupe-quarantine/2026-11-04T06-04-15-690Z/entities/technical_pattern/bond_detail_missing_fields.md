# 详情页data缺字段致按钮组未定义警告
苏州市房地产监测V3 中 `bond/detail.vue` 的 `data()` 未声明关键字段，致 operation-btn-group 绑定属性无响应式定义并报 Vue 警告。

## 问题根因
- `bond/detail.vue` 的 `data()` 未声明 `primaryKey`、`moduleName`、`businessName`
- 致 `operation-btn-group` 绑定属性无响应式定义并报 Vue 警告

## 解决方案
- 于 `data()` 补充 `primaryKey: 'bondId'`、`moduleName: 'prefund'`、`businessName: 'paymentBond'`
- 以对接 `/prefund/paymentBond/*` 接口

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/019.md
- 涉及文件：supervision/unblock/bond/detail.vue、bond/index.vue、peasantAccount/detail.vue、mixins/detailMixins.js、guarantee/detail.vue、plan/detail.vue、mixins/form.js、mixins/formComponents.js
- 所属项目：苏州市房地产监测V3；来源会话：5f16b44a-79c3-4ac0-ae5b-ae8d696e71f0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "bond_detail_missing_fields",
  "source_extraction_id": "708b39ed40c847009c995dd6200f64ae",
  "version": 2,
  "memory_type": "entities"
}
-->