# 苏住房防汛C端防台防汛mock配置
苏住房防汛C端H5(zhi2-mobile-query-h5-c-unlimited)按 Lead 要求先做防台防汛 mock；物业自查(evaluation)模块 mock 详见 zhi2_evaluation_mock。

## 环境变量
- `VITE_FLOOD_MOCK=true` 时注入完整演示数据并启动写演示 token；`isFloodMockEnabled()` 仅认此值
- test 构建(`uni build -m test`)读 `.env.test`：`VITE_DATA_MODE=demo`(防汛走本地 store)、`VITE_FLOOD_MOCK=true`、`VITE_API_BASE_URL` 为空
- 本地 dev 未设 `VITE_FLOOD_MOCK`：空数据 + 手动登录；demo 登录任意账号密码不调真实接口

## 演示数据
- 种子文件 `src/mock/floodSeed.ts`，首次进入带 mock 构建写入 `flood-demo-v1`(seedVersion 2)
- 汛前 11 条已提交+1 条草稿；汛中 3 条巡检+2 条求援；汛后 3 条已提交+1 条草稿
- 求援页 `src/stores/flood.ts` 本地搜「永林/苏锦…」；项目检查仍走 `src/stores/evaluation.ts` 真实接口

## 关键改动文件
- `src/utils/dataMode.ts`：`isFloodMockEnabled()` 仅认 `VITE_FLOOD_MOCK=true`
- `src/stores/flood.ts`：种子注入、demo 登录、小区搜索
- `src/App.vue`：mock 下自动 token 并进首页
- `tools/testing/vitest.config.ts`：单测清空 `VITE_FLOOD_MOCK`，避免误读 `.env.test` 污染普通 demo 单测

## 验证与归属
- 2026-11-06 提交并推送到 origin/dev(commit 47af55e)；主仓库 `npm test` 通过(含 test 模式 dist 构建)
- 用 nginx UI 把站点 root 指到 `dist/`(test 构建产物)刷新打开；浏览器旧 remote 数据可清存储或删 `flood-demo-v1` 重注入

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_flood_mock",
  "source_extraction_id": "9c1c5cf4058241ec99c5ece7d0fb19d0",
  "version": 2,
  "memory_type": "entities"
}
-->