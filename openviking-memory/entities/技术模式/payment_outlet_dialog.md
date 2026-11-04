# 收款点对话框集成 bankBranch 并验证
在 苏州市房地产监测V3 项目中，PaymentOutletDialog.vue 已集成到 bankBranch API，并调整为验证和填写银行网点地址。

## 解决方案
- PaymentOutletDialog.vue 通过 buildQueryParams() 调用 /prefund/bankBranch/page，仅传入有值的字段（默认 isStart: '1'），且 mounted() 加载 fallback
- notice/detail.vue 的 showVisionOfBank() 和 other_record/detail.vue 的 showBranchName() 校验集中账户/bankId，并在切换时清理后填写 bankBranchAddress

## 验证与文件
- 验证: src=苏州市房地产监测V3/180.md
- 涉及文件: PaymentOutletDialog.vue, notice/detail.vue, SelectDialog.vue, RegulatoryAccountDialog.vue, supervision-bank-helpers.js, WdmcDialog.vue, BranchOneDialog.vue, xy/detail.vue, table.js
- 会话: c1d229b5-5e70-4279-8177-940f8e52a440

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "payment_outlet_dialog",
  "source_extraction_id": "658e5df35c0a45f2b7e6422f9dd57d90",
  "version": 1,
  "memory_type": "entities"
}
-->