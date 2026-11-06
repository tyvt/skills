
# 委托销售详情要件区按钮可点修复
苏州市房地产监测V3 中委托销售（entrustSale）详情页在查看状态下要件区按钮不可点击的问题已修复。

## 修复内容
- `presale/entrustSale/detail.vue`：移除 `zs-form` 的 `:disabled="isFormDisabled"`，避免 Element UI 级联禁用要件区域内的所有按钮
- `canOperateAppendix` 改为仅判断 `bizState === '0'`，与委托楼幢列表逻辑一致
- `AnnexUpload/components/FileList.vue`：「备注 / 保存」按钮增加 `$attrs.operable` 条件，非草稿状态不可编辑备注

## 验证与归属
- 新增 `assertEntrustSaleAppendixButtons` E2E helper，并在 `entrust-sale-real-api-flow.spec.js` 中增强验证
- 涉及文件：`presale/entrustSale/detail.vue`、`AnnexUpload/components/FileList.vue`、`e2e/presale/entrust-sale-real-api-flow.spec.js`
- 所属项目：苏州市房地产监测V3；来源会话：80d2603f-f2d9-4f58-9273-3841d86f0ce0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrustsale_appendix_btn",
  "source_extraction_id": "96ca86b0c3a64f9d81fb857532a1c43b",
  "version": 1,
  "memory_type": "entities"
}
-->