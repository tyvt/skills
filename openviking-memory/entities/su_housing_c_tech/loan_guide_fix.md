# 房贷指南页点击跳转被埋点中断修复
苏住房C 小程序 `houseLoanGuide/index.vue` 因同时用 `link`+`:to` 与 `@click` 埋点，埋点报错时页面无法跳转，已修复。

## 问题原因
- `uni-list-item` 上同时使用 `link` + `:to`（内置跳转）与 `@click="addEvent"`（埋点）
- 自定义 `@click` 干扰默认跳转逻辑，埋点接口报错时点击处理中断，页面无法跳转

## 修改内容
- 去掉 `link`/`to`，改为手动控制跳转，与 `buyHousePolicy/index.vue` 一致
- `goToDetail` 中先 `eventDataAdd({ eventType: "27" })` 再 `goto` 详情页
- `eventDataAdd` 为静默请求（noReject + .catch），跳转由 `goto` 独立执行，埋点失败不再影响跳转

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/pages_transaction/houseLoanGuide/index.vue`、`src/pages_transaction/buyHousePolicy/index.vue`、`src/api/appAnalytics.js`
- 来源会话ID：4cc1a55a-ca40-4bc8-a6d2-4081c8a09783

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "loan_guide_fix",
  "source_extraction_id": "53b1b22b039b46d69c1ec62dee8a5258",
  "version": 1,
  "memory_type": "entities"
}
-->