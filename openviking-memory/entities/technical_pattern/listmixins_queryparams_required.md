
# listMixins queryParams 未定义触发 TypeError
`listMixins.js` 的 created 钩子与 query setter 会执行 `Object.assign(this.queryParams, val)`，组件未声明 queryParams 时抛出 Cannot convert undefined or null to object。
## 问题根因
- `listMixins.js` created 钩子通过 query setter 执行 `Object.assign(this.queryParams, val)`
- 组件仅混入 listMixins 未在 data() 定义 queryParams（如纯展示弹窗）时 this.queryParams 为 undefined 抛 TypeError
## 约定与修复
- 约定：任何混入 listMixins 的组件应定义 queryParams 数据属性
- 修复：在 mixin 的 computed query get/set 与 created 中对 `this.queryParams == null` 做防护（return 或 `{}`），避免纯展示弹窗崩溃
## 验证与归属
- 所属项目：惠山G
- 验证证据：extracted source=cursor project=惠山G
- 惠山G 项目（zhi1-web-admin）：src=001.md，文件 refundDetailTable.vue、listMixins.js、refundDetailDialog.vue、DrawDetailTable.vue、DepositDetailsTable.vue，来源会话 0a343062-5aa6-4690-ac12-8d034bff8777
- 010.md 会话 e7f13f04：VenueAssetDialog 报 TypeError，根因 listMixins queryParams 未定义，加防护，文件 src/mixins/listMixins.js，来源会话 e7f13f04-7af6-4354-8122-d5aee1779dac


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "listmixins_queryparams_required",
  "source_extraction_id": "7cb162820bf54c0cb79063c7eae44880",
  "version": 2,
  "memory_type": "entities"
}
-->