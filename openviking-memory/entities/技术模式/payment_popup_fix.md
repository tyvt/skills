# 收银台支付方式弹窗修复
泰兴小程序员工端收银台支付方式弹窗修复完成，改动集中在 src/staff/pages/cashier/result.vue。

## 修复内容
- 支付方式弹窗布局：.payment-popup .popup-content 补充 flex-direction: column 和 width: 100%，.payment-popup-body 使用 flex: 1; min-height: 0，解决渠道列表与底栏横向并排、金额竖排问题
- 底栏重叠：打开支付方式弹窗时隐藏页面固定底栏（!paymentPopupVisible）
- 收款明细：新增 selectedAccountDeductionAmount（账单金额 - 优惠金额 - 应付合计），大于 0 时展示「账户抵扣」行
- 收款明细底栏：改为与主底栏一致的纵向布局（合计 + 「查看明细 >」 + 收款按钮）
- 资源与遮罩：支付图标和安全图标改为 /pages_property/static/ 路径；支付方式弹窗遮罩改为 rgba(0, 0, 0, 0.45)
- 细节优化：金额文字添加 white-space: nowrap

## 验证与归属
- 涉及文件：src/staff/pages/cashier/result.vue、src/pages_property/payment/components/PaymentChannelPopup.vue、src/components/ZsPopup/ZsPopup.vue、src/staff/api/cashier.js、src/pages_property/payment/bills.vue
- 所属项目：泰兴小程序；来源会话ID：22b6bc0a-f16b-4864-aa9f-f51528ea2774
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "payment_popup_fix",
  "source_extraction_id": "6f0c4d0ce25a43908258dc2fb65fa244",
  "version": 1,
  "memory_type": "entities"
}
-->