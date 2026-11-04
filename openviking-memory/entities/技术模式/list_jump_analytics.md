# uni-list-item 跳转与埋点冲突
苏住房C 的 houseLoanGuide 页在 uni-list-item 上同时用内置跳转与自定义埋点 click，埋点报错会中断跳转。

## 问题根因
- pages_transaction/houseLoanGuide/index 点击列表项时埋点接口报错则页面不跳转，根因是 uni-list-item 同时配置 link+:to 与自定义 @click="addEvent"
- 自定义 click 接管组件内置跳转链路，handler 抛错导致跳转步骤不执行，跳转被埋点「绑架」

## 解决方案
- 去掉 link/:to，改由 goToDetail 先 eventDataAdd({eventType:'27'}) 再 goto(`/pages/policy/fddydetail?id=${item.bankLogo}`)
- 埋点必须静默请求（noReject + .catch() 永不抛出），跳转用 goto 独立执行，对齐 buyHousePolicy/index.vue
- 推广：既要埋点又要跳转的列表项不依赖组件内置跳转；埋点走 api/appAnalytics.js 的 eventDataAdd（内建 noReject+catch），跳转单独一行

## 验证与归属
- 验证：会话 4cc1a55a，基线 4630e8e；houseLoanGuide/index.vue 去 link/to，goToDetail 内先 eventDataAdd 再 goto
- 涉及文件：src/pages_transaction/houseLoanGuide/index.vue、src/pages_transaction/buyHousePolicy/index.vue、src/api/appAnalytics.js、src/pages_transaction/taxGuide/index.vue、src/pages_transaction/transactionFlowGuide/index.vue、src/pages_owner/ownerCard/index.vue、src/api/index.js、src/api/httpInstance.js、src/pages_owner/family/index.vue
- 所属项目：苏住房C；来源会话ID：4cc1a55a-ca40-4bc8-a6d2-4081c8a09783；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_jump_analytics",
  "source_extraction_id": "e6e8e38071404e3ba2e177022db337ec",
  "version": 2,
  "memory_type": "entities"
}
-->