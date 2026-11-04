# 多交易页样式偏离设计稿需统一圆角与跳转
苏住房C 移动端 `fundPolicy/index.vue` 等交易页样式偏离设计稿、详情页误用 webView。

## 问题根因
- 交易页样式偏离设计稿
- 详情页误用 webView 而非原生跳转

## 修复要点
- 设 `border-radius: 0` 及背景 `#f4f5f7`
- 详情页改原生跳转并加 `border-radius: 6px`
- 银行网点页用 `flex` 纵向 `min-height: 100vh` 铺满

## 涉及文件
- src/pages.json
- src/pages_transaction/fundPolicy/index.vue
- src/pages_transaction/unionBank/index.vue
- src/pages_transaction/service/bankDetail.vue
- src/pages_transaction/buyHousePolicy/index.vue
- src/pages_transaction/houseLoanGuide/index.vue
- src/pages_transaction/components/ZsPaging/ZsPaging.vue
- src/pages_transaction/taxGuide/index.vue

## 验证与归属
- 验证证据：extracted source=cursor session=7689f561-c6a2-4b09-96f2-8fe21315757f
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：7689f561-c6a2-4b09-96f2-8fe21315757f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "txn_style_bug",
  "source_extraction_id": "c9e7566efee64f47b3959dda50f459d4",
  "version": 1,
  "memory_type": "entities"
}
-->