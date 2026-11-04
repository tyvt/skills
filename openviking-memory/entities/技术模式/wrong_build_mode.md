# 测试环境产物误用生产构建模式
在 Vite 多环境构建中，部署到测试环境的产物却内嵌生产域名与配置，可通过搜值取证定性为打包命令用错模式。

## 问题根因
- Vite 的 `vite build -m test` 仅加载 `.env` + `.env.test`，永远不加载 `.env.production`
- 常误以为「部署在测试环境」=「用 test 模式构建」，差一个 `-m test` 就差出整个生产域名
- 本例内联生产配置位于 `src/utils/index.js:84-87` 的 `buildH5AbsoluteMediaUrl` 内联 `VITE_APP_API_PROXY`

## 取证与验证
- 取证顺序：查产物构建时间与构建提交 → 在产物搜 `.env.test` 的值（正确 test 模式构建期望命中）→ 再搜生产域名（正确 test 模式构建期望 0 命中）→ 命中位置回溯源码
- 定性规则：产物搜 `.env.test` 的值 0 命中、搜生产域名 `szzfcjj.cn` 1 命中，即打包误用 `npm run build`（production）而非 `npm run test`
- 在产物搜生产域名 `szzfcjj.cn` 应为 1 命中，定位到 `utils/index.js:84-87`
- 实测表：产物内嵌 `VITE_APP_API_PROXY=https://szfweb.szzfcjj.cn:8887`，搜 `test.zhi.com` 0 次命中

## 修复与防复发
- 改用 `npm run test`（即 `uni build -m test`）重新打包部署
- 重打后再次搜值验证：`test.zhi.com` 出现、`szzfcjj` 消失才算闭环
- 在发布脚本/CI 加闸：目标环境为测试时扫描产物，含 `szzfcjj.cn` 直接 fail
- 结论须落在「产物实测」而非「我觉得」，否则是甩锅

## 验证与归属
- 涉及文件：`zhi2-mobile-shimin/src/utils/index.js`、`.env.test`、`.env.production`
- 来源会话：1fa1dab6-7740-4a7a-825d-1d4173dd3bcc；代码基线：9e0fdde
- 项目：业主端 H5（zhi2-mobile-shimin）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "wrong_build_mode",
  "source_extraction_id": "7407ddbc537649f0898d7193933967e1",
  "version": 2,
  "memory_type": "entities"
}
-->