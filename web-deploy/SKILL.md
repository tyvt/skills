---
name: web-deploy
description: 前端本地交付。禁止启动开发服务器，改完构建并用本地 nginx UI 部署 dist。部署或跑前端 E2E 前加载。
---

# 前端部署

1. 不在本地启动前端开发服务器，包括 `npm run dev`、Vite、webpack serve、`next dev`。
2. 改完先构建，产出 `dist`。
3. 用本地 nginx UI 部署：已有站点就更新 root 到本项目 `dist`，没有就新增站点。
4. E2E 和联调访问 nginx 部署后的站点，不连 dev server。
5. 不用 `serve`、`live-server`、`http-server` 或 `python -m http.server` 替代 nginx UI。
