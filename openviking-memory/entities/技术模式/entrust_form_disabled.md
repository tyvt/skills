# 委托销售表单禁用阻塞附件按钮
在委托销售的 `detail.vue` 中，`zs-form` 的 `:disabled="isFormDisabled"` 会级联禁用附件区域的按钮；移除后，`canOperateAppendix` 仅验证 `bizState === '0'`。

## 契约点
- 在 `detail.vue` 中带有 `:disabled="isFormDisabled"` 的 `zs-form` 会级联禁用附件区域的按钮
- 移除后，`canOperateAppendix` 仅验证 `bizState === '0'`
- `FileList.vue` 在非草稿状态的备注/保存按钮上增加 `$attrs.operable` 限制
- `entrust-sale-real-api-flow.spec.js` 添加 helper `assertEntrustSaleAppendixButtons` 用于验证

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/108.md
- 涉及文件: presale/entrustSale/detail.vue, mixins/detailMixins.js, mixins/form.js, AnnexUpload/index.vue, AnnexUpload/components/FileList.vue, e2e/presale/entrust-sale-real-api-flow.spec.js, e2e/fixtures/entrust-sale-helpers.js, supervision/agreement/version/detail.vue
- 所属项目: 苏州市房地产监测V3; 会话: 80d2603f-f2d9-4f58-9273-3841d86f0ce0; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_form_disabled",
  "source_extraction_id": "ffbc88f6ff83419787a66226a5f2572d",
  "version": 1,
  "memory_type": "entities"
}
-->