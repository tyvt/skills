# 收款点对话框集成 bankBranch 并验证
在 苏州市房地产监测V3 项目中，PaymentOutletDialog.vue 已集成到 bankBranch API，并调整为验证和填写银行网点地址。

## 解决方案
- PaymentOutletDialog.vue 调用 pageBankBranch（/prefund/bankBranch/page），buildQueryParams() 只传有值字段（默认 isStart: '1'，不再传空 isSupervisionBank/entrustSupervisionAgreeId），并增加 mounted() 兜底加载、loading、关键字搜索、重置与关闭时重置表单
- notice/detail.vue 移除无效 prop sfqy="1"；showVisionOfBank() 增加未选归集账户时提示「请先选择归集账户」校验
- notice/detail.vue 的 setPaymentOutlet() 同时回填 bankBranchAddress，切换项目时同步清空 bankBranchAddress
- other_record/detail.vue 的 showBranchName() 增加同样的 bankId 校验，setOpenBank() 回填 bankBranchAddress

## 验证与文件
- 验证: src=苏州市房地产监测V3/180.md
- 涉及文件: PaymentOutletDialog.vue, notice/detail.vue, other_record/detail.vue, SelectDialog.vue, RegulatoryAccountDialog.vue, supervision-bank-helpers.js, WdmcDialog.vue, BranchOneDialog.vue, xy/detail.vue, table.js
- 会话: c1d229b5-5e70-4279-8177-940f8e52a440
- 所属项目: 苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "payment_outlet_dialog",
  "source_extraction_id": "ef50d166515a4affbd40d092df51beed",
  "version": 2,
  "memory_type": "entities"
}
-->