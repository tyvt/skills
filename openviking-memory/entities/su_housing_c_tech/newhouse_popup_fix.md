# 新房详情购房咨询弹窗被底部栏遮挡修复
苏住房C 小程序新房详情页「购房咨询」弹窗因 z-index 低于底部按钮被遮挡，已通过调整弹窗 z-index 修复。

## 问题原因
- 底部「购房咨询」按钮（bottomBtn.vue）z-index 为 9999
- 新房详情页弹窗（uni-popup）z-index 仅为 998
- 弹窗层级低于底部固定栏，导致被遮挡

## 修复要点
- 在 detail.vue 中将弹窗 z-index 调整为 10000
- 使用 `:deep(.uni-popup) { z-index: 10000 !important; }` 使其显示在底部按钮之上

## 涉及文件
- src/pages_transaction/newHouse/detail.vue
- src/pages/commonNew/bottomBtn.vue
- src/pages_transaction/stockHouse/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：a8678de5-9bd2-4b68-94a6-efa9178c65de
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_popup_fix",
  "source_extraction_id": "05299e8d90ea44e7b84c45eab8c8e81c",
  "version": 1,
  "memory_type": "entities"
}
-->