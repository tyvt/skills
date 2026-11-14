# 苏住房防汛C端防台防汛mock配置
苏住房防汛C端H5(zhi2-mobile-query-h5-c-unlimited)按 Lead 要求先做防台防汛 mock；物业自查(evaluation)模块 mock 详见 zhi2_evaluation_mock。

## 环境变量
- `VITE_FLOOD_MOCK=true` 时注入完整演示数据并启动写演示 token；`isFloodMockEnabled()` 仅认此值
- test 构建(`uni build -m test`)读 `.env.test`：2026-11-09 起改为 `VITE_DATA_MODE=remote`、`VITE_FLOOD_MOCK=false`(显式)、`VITE_API_BASE_URL=/api`；保留 `VITE_UI_REF8443`(UI像素对齐开关非mock)。原配置为 `demo`+`true`+空 base
- 本地 dev 未设 `VITE_FLOOD_MOCK`：空数据 + 手动登录；demo 登录任意账号密码不调真实接口
- 关闭 mock 须将 flag 显式设 `false` 而非删除：删除后 `import.meta.env.VITE_FLOOD_MOCK` 非编译期常量，esbuild 无法消除分支，demo 种子仍打进 `dist`

## 演示数据
- 种子文件 `src/mock/floodSeed.ts`，首次进入带 mock 构建写入 `flood-demo-v1`(seedVersion 2)
- 汛前 11 条已提交+1 条草稿；汛中 3 条巡检+2 条求援；汛后 3 条已提交+1 条草稿
- 求援页 `src/stores/flood.ts` 本地搜「永林/苏锦…」；项目检查仍走 `src/stores/evaluation.ts` 真实接口

## 关键改动文件
- `src/utils/dataMode.ts`：`isFloodMockEnabled()` 仅认 `VITE_FLOOD_MOCK=true`
- `src/stores/flood.ts`：种子注入、demo 登录、小区搜索
- `src/App.vue`：mock 下自动 token 并进首页
- `tools/testing/vitest.config.ts`：单测固定 `VITE_DATA_MODE:'demo'`，解除对 `.env.test` 的隐式依赖（否则 remote 模式下 1 个用例因 `uni.request` 报 `ReferenceError` 中断打包）

## 验证与归属
- 2026-11-06 提交并推送到 origin/dev(commit 47af55e)；主仓库 `npm test` 通过(含 test 模式 dist 构建)
- 用 nginx UI 把站点 root 指到 `dist/`(test 构建产物)刷新打开；浏览器旧 remote 数据可清存储或删 `flood-demo-v1` 重注入
- 2026-11-09 按 Lead 要求关闭 test 环境 mock：`.env.test` 改 `remote`+显式 `false`，提交 fd05a55 推送 origin/dev(`8a2983c..fd05a55`)；`npm test` 21/21 通过，nginx 8095 验证 `VITE_FLOOD_MOCK:"false"` 且无 demo 种子
- 2026-11-14 运行时 mock 进一步清理：防汛/自查/门户运行时 mock 与 seed fallback 已移除，demo 自动登录与模式开关已移除（提交 e925eec6 本地未推送）；门户请求错误继续向上冒泡

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_flood_mock",
  "source_extraction_id": "5873dc1ad52440c6ab2ff23954a7e50c",
  "version": 5,
  "memory_type": "entities"
}
-->