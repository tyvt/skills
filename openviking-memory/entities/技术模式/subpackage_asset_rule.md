# 分包静态资源跨包访问限制
泰兴小程序分包间不可跨包访问静态资源，须将静态资源置于引用方分包或主包目录内，否则图标加载失败。
## 问题根因
- 分包调整后，业主端图片与 icon 通过跨分包路径引用，触发小程序静态资源跨包访问限制。
- `staff/pages` 分包引用 `pages_property` 分包路径，导致图标空白。
- 跨包引用导致图标加载失败。
## 解决方案
- 静态资源须置于引用方分包或主包目录内，禁止跨分包路径引用。
- 将 4 个支付图标（payment-security.png、payment-alipay.png、payment-wechat.png、payment-unionpay.png）复制到主包 `src/static/images/payment/`，并更新 `src/staff/pages/cashier/result.vue` 中 4 处引用路径为 `/static/images/payment/..`；构建产物 `dist/build/mp-weixin/static/images/payment/` 下已确认输出这 4 个文件。
## 验证与归属
- 验证证据：src=泰兴小程序/002.md；src=泰兴小程序/015.md
- 涉及文件：src/pages.json、_diag.js、vite.config.ts、scripts/findUnUseImages.mjs、_scan_refs.js、src/components/ZsImage/ZsImage.vue、src/env/mp.js、src/pages/staff/home/index.vue、src/staff/pages/cashier/result.vue、src/pages_property/payment/components/PaymentChannelPopup.vue、src/staff/components/ZsUploader/ZsUploader.vue
- 来源会话ID：9e999a07-f853-49b6-96db-57e8f64f3141；063926e1-81eb-4ec1-8c58-48628b674723
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subpackage_asset_rule",
  "source_extraction_id": "f14ea4addc6543e1b47221f41498e9f0",
  "version": 3,
  "memory_type": "entities"
}
-->