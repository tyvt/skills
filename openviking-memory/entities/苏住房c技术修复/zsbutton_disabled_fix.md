# stockHouseSign倒计时按钮可点击修复
苏住房C小程序 pages_transaction/stockHouseSign 中 ZsButton 未传递 disabled 导致倒计时期间按钮仍可点击，已修复。

## 问题根因
- needToKnow.vue 通过 AgreementPage 开启 5 秒倒计时，倒计时期间设 :disabled="isCounting"。
- ZsButton 之前没有 disabled 属性，也未绑定到原生 button，导致仅样式变化，按钮仍可点击。

## 修复内容
- ZsButton.vue 新增 disabled 属性，并绑定到原生 button（loading 时也会禁用）。
- AgreementPage.vue 复用该属性，确保倒计时期间按钮不可点击。

## 验证与归属
- 涉及文件：needToKnow.vue、ZsButton.vue、AgreementPage.vue。
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：c9900767-72b2-4323-9462-1cd68d147b99。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "zsbutton_disabled_fix",
  "source_extraction_id": "40d24fb84e4e48ed912d6d0221c023e2",
  "version": 1,
  "memory_type": "entities"
}
-->