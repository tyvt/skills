# Summary
2026-11-09，苏住房防汛C端将 .env.test 由 VITE_DATA_MODE=demo 且 VITE_FLOOD_MOCK/VITE_EVALUATION_MOCK=true 且 VITE_API_BASE_URL 为空，改为 VITE_DATA_MODE=remote 且两个 mock 开关显式 false 且 VITE_API_BASE_URL=/api（保留 VITE_UI_REF8443，其为 UI 像素对齐开关而非 mock）。提交 fd05a55 并推送 origin/dev；npm run test 21/21 通过且构建完成，nginx UI 站点 8095 确认 VITE_FLOOD_MOCK:"false"、VITE_DATA_MODE:"remote"、无 demo 种子。
# 2026-11-09 (Monday) ChatLog:
**user**: 关闭测试环境打包的mock数据（苏住房防汛C端）
**assistant**: 苏住房防汛C端修复：.env.test 由 VITE_DATA_MODE=demo + VITE_FLOOD_MOCK/VITE_EVALUATION_MOCK=true + 空 VITE_API_BASE_URL，改为 remote + 两个 mock 开关显式 false + VITE_API_BASE_URL=/api（保留 VITE_UI_REF8443，它是 UI 像素对齐开关不是 mock）。两条可复用根因：1) 关闭 Vite env 开关不能只删掉变量，必须显式写 false；删掉时 import.meta.env.VITE_* 不是编译期常量，esbuild 无法常量折叠，演示种子数据（floodSeed/evaluationSeed）仍会被打进 dist，显式 false 后构建产物里 demo 内容全部消失。2) 单测 harness（tools/testing/vitest.config.ts 的 test.env）需固定 VITE_DATA_MODE=demo，否则单测隐式继承 .env.test 的数据模式，改成 remote 后 flood.test.ts 的 searchComplex 会走真实接口调 uni.request 报 ReferenceError: uni is not defined，导致 npm run test 的 && 链中断、打包不产出。验证：npm run test 21/21 通过并 DONE Build complete；产物与 nginx UI 站点 8095 均确认 VITE_FLOOD_MOCK:"false"、VITE_DATA_MODE:"remote"、无 demo 种子。已提交 fd05a55 并推送 origin/dev。

<!-- MEMORY_FIELDS
{
  "event_name": "测试环境关闭mock数据",
  "goal": "关闭测试环境mock打包",
  "summary": "2026-11-09，苏住房防汛C端将 .env.test 由 VITE_DATA_MODE=demo 且 VITE_FLOOD_MOCK/VITE_EVALUATION_MOCK=true 且 VITE_API_BASE_URL 为空，改为 VITE_DATA_MODE=remote 且两个 mock 开关显式 false 且 VITE_API_BASE_URL=/api（保留 VITE_UI_REF8443，其为 UI 像素对齐开关而非 mock）。提交 fd05a55 并推送 origin/dev；npm run test 21/21 通过且构建完成，nginx UI 站点 8095 确认 VITE_FLOOD_MOCK:\"false\"、VITE_DATA_MODE:\"remote\"、无 demo 种子。",
  "ranges": "0-5",
  "source_extraction_id": "659a0be9c6254efa99a91a2fad14a5ad",
  "version": 1,
  "memory_type": "events"
}
-->