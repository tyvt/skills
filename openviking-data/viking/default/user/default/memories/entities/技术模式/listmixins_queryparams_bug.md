# listMixins queryParams 未定义致 TypeError 修复
惠山G 项目 zhi1-web-admin 中 listMixins.js 的 created 钩子因 refundDetailTable.vue 未定义 queryParams 触发 `Cannot convert undefined` 报错，需补充定义。

## 问题根因
- listMixins.js 的 `created` 钩子读取 `$store.state.common.cachedSearchParams` 并对 `query` 赋值
- `query` 的 setter 执行 `Object.assign(this.queryParams, val)`
- refundDetailTable.vue 引入 listMixins 但未定义 `queryParams`，导致 `this.queryParams` 为 undefined 触发报错

## 解决方案
- refundDetailTable.vue 需定义 `queryParams` 字段，或调整 listMixins 对 queryParams 的引用以兼容未定义场景

## 验证与归属
- 验证证据：extracted source=cursor project=惠山G
- 涉及文件：src/mixins/listMixins.js、refundDetailTable.vue、refundDetailDialog.vue
- 所属项目：惠山G；来源会话：0a343062-5aa6-4690-ac12-8d034bff8777；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listmixins_queryparams_bug",
  "source_extraction_id": "620ae39c66f049e4bb469a7490ac0c83",
  "version": 1,
  "memory_type": "entities"
}
-->