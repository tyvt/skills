# Vite构建关闭mock开关模式
苏住房防汛C端在 2026-11-09 关闭测试环境打包的 mock 数据时沉淀出的两条可复用根因。

## 环境变量显式false
- 关闭 Vite env 开关不能只删掉变量，必须显式写 `false`
- 删掉变量时 `import.meta.env.VITE_*` 不是编译期常量，esbuild 无法常量折叠
- 演示种子数据（floodSeed/evaluationSeed）仍会被打进 dist
- 显式写 `false` 后，构建产物里 demo 内容全部消失

## 单测harness固定数据模式
- 单测 harness（`tools/testing/vitest.config.ts` 的 `test.env`）需固定 `VITE_DATA_MODE=demo`
- 否则单测隐式继承 `.env.test` 的数据模式
- 改成 `remote` 后 `flood.test.ts` 的 `searchComplex` 走真实接口调 `uni.request`
- 报 `ReferenceError: uni is not defined`，导致 `npm run test` 的 `&&` 链中断、打包不产出

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_mock_off",
  "source_extraction_id": "659a0be9c6254efa99a91a2fad14a5ad",
  "version": 1,
  "memory_type": "entities"
}
-->