# :deep权重打平致默认样式覆盖popup
泰兴小程序 `staff/pages/cashier/result` 中 `:deep(.payment-popup){width:100%}` 编译后权重 0-2-0，因样式权重打平、组件自身 wxss 后生效，被 `ZsPopup` 默认样式覆盖。注意根因并非 `min()`（该问题已在更早会话修复，见 wxss_deep_discard）。

## 问题根因
- `staff/pages/cashier/result` 中 `:deep(.payment-popup){width:100%}` 编译后为 `.data-v-页 .payment-popup`，权重 0-2-0。
- `ZsPopup` 自身 scoped 规则 `.popup-container.data-v-组件{width:560rpx;padding:40rpx;border-radius:40rpx}` 权重同为 0-2-0。
- 小程序中组件自身 wxss 晚于「注入进来的页面样式」生效，打平时 560rpx / 40rpx 内边距 / 40rpx 圆角胜出，弹窗变成窄卡片。
- 此前 `min()` 不被 WXSS 支持导致声明被丢弃的问题已更早修复，本次根因仅为样式权重打平。

## 解决方案
- 在 `src/staff/pages/cashier/result.vue` 中，给「收款明细」和「支付方式」两个弹窗的 `width / padding / border-radius` 三条声明加 `!important`，确保压过 `ZsPopup` 的 `.popup-container` 默认值。
- 在注释里写清原因，防止以后又被「顺手清理」掉。

## 验证与归属
- 验证证据：src=workbuddy project=泰兴小程序
- 涉及文件：D:/repository/泰兴小程序/src/staff/pages/cashier/result.vue、D:/repository/泰兴小程序/src/components/ZsPopup/ZsPopup.vue、dist/build/mp-weixin/staff/pages/cashier/result.wxss
- 构建验证：`npm run build:mp-weixin` 成功，产物 `dist/build/mp-weixin/staff/pages/cashier/result.wxss`
- 来源会话ID：d5c9892f-5a5c-4a55-a2f9-0838c7afac00
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deep_weight_popup",
  "source_extraction_id": "75cbded1023743f7a49461ee41ccd8f1",
  "version": 2,
  "memory_type": "entities"
}
-->