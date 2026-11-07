# detail.vue 中缺失字段导致 Vue 警告和请求错误
在项目 苏州市房地产监测V3 中，`guarantee/detail.vue` 的 `data()` 缺少字段，导致 Vue 警告和详情请求拼接错误。

## 问题根因
- `guarantee/detail.vue` 的 `data()` 缺少 `primaryKey`, `moduleName`, `businessName`
- 导致 Vue 警告和 `getDetail()` 中的拼接错误

## 解决方案
- 补充 `data()` 中的 `primaryKey: 'useMoneyApplyId'`, `moduleName: 'prefund'`, `businessName: 'useMoneyApply'`，与 `guarantee/index.vue` 保持一致
- 消除警告并允许正常请求 `/prefund/useMoneyApply/detail`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：e533c035-bd03-4c12-aa72-72937c898843
- 验证证据: src=苏州市房地产监测V3-leftover/004.md
- 涉及文件: guarantee/detail.vue, mixins/detailMixins.js, guarantee/index.vue, usemoney/detail.vue, guarantee/changedetail.vue, usemoneyRevoke/detail.vue, mixins/form.js, notice/detail.vue
- 所属项目: 苏州市房地产监测V3; 会话: e533c035-bd03-4c12-aa72-72937c898843; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_missing_fields",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 2,
  "memory_type": "entities"
}
-->