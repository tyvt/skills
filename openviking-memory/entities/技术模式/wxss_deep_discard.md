# WXSS静默丢弃:deep致弹层变窄卡片
`src/staff/pages/cashier/result.vue` 使用 `:deep(.payment-popup){ width: min(100vw, 750rpx) }`，该写法被 WXSS 静默丢弃，导致弹层宽度失效变为窄卡片悬浮。
## 问题根因
- `result.vue` 使用 `:deep(.payment-popup){ width: min(100vw, 750rpx) }` 写法。
- WXSS 静默丢弃该选择器，导致弹层宽度失效变为窄卡片悬浮。
## 解决方案
- 需改用小程序支持的样式方案（如直接写类名或内联样式）。
## 验证与归属
- 验证证据：src=泰兴小程序/004.md
- 涉及文件：src/staff/pages/cashier/index.vue、src/staff/pages/cashier/result.vue、src/pages_property/payment/components/PaymentChannelPopup.vue、src/staff/api/cashier.js、src/components/ZsPopup/ZsPopup.vue、src/staff/pages/cashier/payment.vue、src/components/ZsBottomPopup/ZsBottomPopup.vue、plans/radiant-forging-einstein-6FZZmxPl.md
- 来源会话ID：54c23926-7b8a-40d1-a6aa-2e3dcc903484
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "wxss_deep_discard",
  "source_extraction_id": "fc9f554b0d494f35b937bf826962d11b",
  "version": 1,
  "memory_type": "entities"
}
-->