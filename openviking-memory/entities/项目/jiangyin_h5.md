---
audit_status: valid
last_checked: 2026-11-27T12:30:46+08:00
verdict_note: 江阴H5 src/pages/login.vue-9,11 有 VITE_ENABLE_DEBUG_LOGIN==='true' 门控，pages/login 路由存在，描述属实。
---
# 江阴智慧物业 C 端 H5（江阴H5）
江阴公共收益项目的 C 端（客户端）H5 前端仓库，与当前 B 端 admin 工作区相互独立的兄弟仓库。

## 仓库与构建
- 本地路径 `D:\repository\江阴H5`，主分支 main；2026-11-26 处理时仓库 dirty=1，存在既有未提交改动（如 `src/pages.json`），操作需保留这些状态。
- 依赖层有 bun 配置；2026-11-26 实测构建走 npm 脚本 `npm run build` / `npm run test`（内部调用 uni）：`npx uni` 会从缓存取到不匹配版本、本地 `uni.exe` 是损坏的 bun shim，均不可直接用。
- Vite 配置 `envDir: './env'`，构建模式：dev=development、test=test、build=production。

## 登录与配置
- 登录中转页 `/pages/login`；账号密码登录页为 `/pages/login/index`。
- 写死调试账号现由 `VITE_ENABLE_DEBUG_LOGIN` 开关配合严格 `=== 'true'` 门控（`src/pages/login.vue:10`、`src/pages/login/index.vue:42`）：dev/test 设为 true，恢复 option/手机号/密码/token/key 五个测试凭据；production 设为 false、不含凭据，不跳转密码页、页内提示「缺少 option 参数，无法登录」。
- 环境变量文件 `env/.env.development`、`env/.env.test` 含 `VITE_ENABLE_DEBUG_LOGIN=true` 与测试凭据，`env/.env.production` 为 false。原手机号/密码曾放在所有模式都加载的 `.env` 导致生产泄漏，已挪到仅非生产加载的文件。
- vConsole 由 `vite.config.ts:64` 以 `VITE_DELETE_CONSOLE == 'false'` 启用；2026-11-26 将 `env/.env.production` 的 `VITE_DELETE_CONSOLE` 改为 true（未改 vite.config.ts），生产包 vConsole 0 匹配、页面无悬浮按钮；dev/test 保留 vConsole。
- 2026-11-26 commit `83d2f51` 已推送 origin/main（5 个目标文件，预存 `src/pages.json` 未纳入），为禅道任务 2961 之后的新策略。

## 本地部署
- 本地站点 `sites-enabled/江阴智慧物业H5.conf` 指向 `江阴H5/dist`；与 `fdc-v3-test.conf` 同占 8102 端口，存在冲突。
- 以 `Host: localhost` 访问 8102 实际命中刚构建的 H5 dist；验证码接口本地不可达会显示「系统异常」toast，与前端改动无关。
- nginx 对 JS 设 7d 缓存，浏览器验证需用新无缓存会话或 cache-busting 查询参数才能加载新 bundle。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "jiangyin_h5",
  "source_extraction_id": "0ebb0b0928084e26b95117d6d3519032",
  "version": 2,
  "memory_type": "entities"
}
-->