# npm workspace vite 版本隔离
npm workspaces 会把子包 vitest 提升到根 node_modules，导致其 peer 的 vite 解析到根项目不兼容版本而崩溃。

## 问题根因
- 应用根用 vite@5（uni-app 要求），测试工具链需 vite@8 + vitest@5；npm workspaces 将 vitest 提升到根，vitest 解析根 vite@5 → ERR_PACKAGE_PATH_NOT_EXPORTED（vite/module-runner 缺失）
- bun 按 workspace 各自嵌套 vite@8 故正常；npm 严格 hoist 无法绕过

## 解决方案
- 工具链目录用 `npm install --workspaces=false` 独立安装，使其拥有自用 node_modules（vitest + vite@8），同时根项目提供 vue 等共享依赖（Node 向上解析）
- 根 `npm install --legacy-peer-deps`（DCloud 包 peer 版本偏差会触发 ERESOLVE）
- 不改 package.json 的 workspaces 字段，故 bun.lock 与 Bun 安装完全不受影响
- `test` 脚本改为 `npm --prefix tools/testing run test` 用工具链自带 vitest

## 验证与归属
- 验证：干净目录隐藏 Bun 模拟 CI，install exit 0、test 20/20、build 产出 dist/；有 Bun 时 bun install no changes
- 所属项目：苏住房防汛C端（zhi2-mobile-query-h5-c-unlimited）；来源会话：本次 CI 兼容模式改造；代码基线：dev 04b0c7b

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "npm_workspace_vite_isolation",
  "source_extraction_id": "02c9724b50ea4c97aee3b80473621fb0",
  "version": 1,
  "memory_type": "entities"
}
-->