# 账户明细弹窗三区块错绑form致数据重复
园区公共收益(zhi2-web-admin)监管账户明细弹窗因三区块误引用同一 form 导致数据重复。

## 问题根因
- 原 `contentInfo` 误引用 `this.form` 且重复拼接字段，三区块数据互相污染

## 解决方案
- `pubRegulatoryAccount/components/InfoDialog.vue` 中 `contentInfo1/2/3` 分别绑定 `form1/2/3`
- 三区块统一 `DetailTemplate` 并抽取 `buildAccountContentInfo` 精简代码

## 验证与归属
- 涉及文件：src/views/benefit/pubRegulatoryAccount/components/InfoDialog.vue、src/views/benefit/pubRegulatoryAccount/detail.vue、src/components/detail-template/detail-template.vue、src/views/benefit/components/BankReceiptDetailDialog.vue、src/mixins/dialogMixins.js、src/views/maintenance/accountOpen/owner/components/OpenDetailDialog.vue
- 来源会话ID：b7d835d3-09e8-402c-8ec6-a570d7456e30；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "infodialog_form_split",
  "source_extraction_id": "ff320310ed4d44fca7c9fe7878836a34",
  "version": 1,
  "memory_type": "entities"
}
-->