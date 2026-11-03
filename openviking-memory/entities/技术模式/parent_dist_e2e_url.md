# 构建产物落父仓库根 dist 与 E2E 静态站约定
本项目构建产物在父仓库根 dist/ 而非子模块，E2E 须显式设 E2E_BASE_URL 指向静态站否则 playwright 自动拉 dev server。

## 构建与部署
- 父仓为 npm workspaces 根（workspaces: ["zhi2-web-admin"]），但 vite.config.js 的 rootDir 指向上一级
- 因此 outDir/envDir 上移，构建产物在父仓库根 dist/ 而非 zhi2-web-admin/dist
- deploy/nginx.conf（监听 8098）的 root 同指父仓库根 dist/

## E2E 约定
- playwright.config.js 未设 E2E_BASE_URL 时会挂 webServer: npm run dev，与“不启 dev server 只走 nginx 静态站”硬约定冲突
- E2E 前显式设置 E2E_BASE_URL 指向静态站（如 http://127.0.0.1:8098）让 playwright 走静态站
- deploy/nginx.conf 注释禁令当硬约束读：把 E2E_BASE_URL 指到静态站是为让 e2e 跑真实产物
- 交付验证结论基于部署站点而非 dev server

## 验证与归属
- 来源会话 416a4ff8-360e-45ae-a95e-7e170ffdcd65；基线 a86bf95
- 涉及文件：zhi2-web-admin/vite.config.js、playwright.config.js、deploy/nginx.conf、package.json

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parent_dist_e2e_url",
  "source_extraction_id": "e30ec998055842cf9bca08f4e7758748",
  "version": 1,
  "memory_type": "entities"
}
-->