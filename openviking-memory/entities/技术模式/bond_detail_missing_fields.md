# bond/detail 中缺失的字段导致 Vue 警告和接口失败
在项目 苏州市房地产监测V3 中，`bond/detail.vue` 的 `data()` 未定义 `primaryKey`、`moduleName`、`businessName`，导致 Vue 警告且无法连接接口。

## 问题根因
- `bond/detail.vue` 的 `data()` 未定义 `primaryKey`、`moduleName`、`businessName`
- 这导致 `operation-btn-group` 绑定未定义的属性，产生 Vue 警告且连接接口失败

## 主要修复
- 在 `data()` 中添加了 `primaryKey: 'bondId'`、`moduleName: 'prefund'`、`businessName: 'paymentBond'` 以进行响应式定义

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：5f16b44a-79c3-4ac0-ae5b-ae8d696e71f0
- 验证证据: src=苏州市房地产监测V3/219.md
- 涉及文件: supervision/unblock/bond/detail.vue, supervision/unblock/bond/index.vue, supervision/unblock/peasantAccount/detail.vue, mixins/detailMixins.js, supervision/unblock/guarantee/detail.vue, supervision/unblock/plan/detail.vue, mixins/form.js, mixins/formComponents.js
- 所属项目: 苏州市房地产监测V3; 会话: 5f16b44a-79c3-4ac0-ae5b-ae8d696e71f0; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bond_detail_missing_fields",
  "source_extraction_id": "5b55fde1cd1b4f419a674259657b5c37",
  "version": 1,
  "memory_type": "entities"
}
-->