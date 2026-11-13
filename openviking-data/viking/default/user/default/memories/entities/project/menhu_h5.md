# 门户H5
uni-app Vue3 移动端门户前端项目，当前工作项目（分支 master）。
## Description
- 本地目录 D:/repository/门户H5，git 分支 main（2026-11-12 由 master 重命名）。
- 构建命令 `uni build`，产物落在 门户H5/dist（含 index.html、assets/、static/）。
- 与旧 checkout `门户`（分支 develop/v2.6.2-portal-mobile，目录 D:/repository/门户）是不同目录；旧目录 dist 由端口 8092 站点服务（还原后），门户H5 由独立端口 8091 站点服务。
## Relations
- 本地通过 nginx 独立站点「门户H5」部署，端口 8091，root 指向 D:/repository/门户H5/dist（详见 menhu_h5_site 实体）。
- 后端接口由 `门户后端` 项目（端口 8086）提供。

## GitLab CI & Package Scripts
- GitLab CI 项目路径：gitlab.zhi.com/zhi/suzhou/shiqu/fangdichan/fe/zhi2-mobile-admin-h5-b-unlimited；package 名 menhu-h5@0.1.0；默认分支 main（本地 checkout 曾用 master）。
- 2026-11-12 CI `npm run test` 失败：根 package.json 引用了从未提交的 `tools/testing`（workspaces、test 脚本、`tsconfig.tests.json`），连带 test:watch、test:e2e（无 playwright.config）为死引用。
- install-deps.mjs 对 tools/testing 安装有 existsSync 守卫，故 install 步骤可静默跳过；.gitignore 未忽略 tools/，该目录从未创建/提交。
- 修复提交 a1a046a「fix: drop dead references to never-committed tools/testing」（1 file +2 -5）：test → `uni build -m test --outDir ./dist`，删 test:watch/test:e2e/workspaces，typecheck → `vue-tsc --noEmit`；保留 devDependencies 与 install-deps.mjs。已推送 origin/main。
- 裸 `npm install --dry-run` 的 ERESOLVE 为既有问题（DCloud peer 偏差，install-deps.mjs 注释注明 CI 用 --legacy-peer-deps），与本次改动无关。
- 遗留跟进：需补齐 tools/testing 最小 vitest 脚手架，消除 test job「假绿」；install-deps.mjs 的 vite@8+vitest@5 隔离安装逻辑可复用。具体计划见 .plan/20261112-ci-test-tools-testing.md（审核 approve、人工确认）。

## 功能与最新提交
- 2026-11-12 提交 b117ec4「feat: portal H5 login and subsystem picker with token-based app jumping」并推送 origin/main；改动 9 文件 +9565/-88。
- 新增 src/utils/portalAuth.ts、scripts/redis-cli.mjs、package-lock.json；删除 src/pages/home/index.vue；修改 src/pages.json、src/pages/login-design/index.vue、src/pages/systems/index.vue、src/stores/auth.ts、src/styles/theme.css。
- env/.env 由 .gitignore 忽略，未纳入提交。

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "menhu_h5",
  "source_extraction_id": "41f0f885eba441a5ba300fec25fabef5",
  "version": 4,
  "memory_type": "entities"
}
-->