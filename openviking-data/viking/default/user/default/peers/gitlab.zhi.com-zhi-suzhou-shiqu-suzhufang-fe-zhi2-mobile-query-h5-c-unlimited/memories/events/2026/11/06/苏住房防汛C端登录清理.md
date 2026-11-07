# Summary
苏住房防汛C端 dev 分支删除 login-design、systems 页面及路由，主登录页去掉「验证码登录」入口，登录成功/有 token 启动直接进入 home，首页横幅不再跳转子系统选择，构建通过，已推送 origin/dev 提交 3d7d8a3（2026-11-06）。
# 2026-11-06 (Friday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: 将身份证号验证的登录页面和二级菜单选择页面迁移到D:\repository\门户H5目录，当前仓库清理。当前登录后直接进入首页。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: ## 已完成

### 1. 新建 [`D:\repository\门户H5`](../门户H5/README.md)（独立 uni-app H5）
- **登录（身份证验证）**：[`src/pages/login-design/index.vue`](../门户H5/src/pages/login-design/index.vue) — 手机号 + 身份证号后四位 + 短信验证码（设计图版）
- **二级子系统选择**：[`src/pages/systems/index.vue`](../门户H5/src/pages/systems/index.vue)
- 登录成功 → 子系统选择；已有 token 启动 → 子系统选择（[`src/App.vue`](../门户H5/src/App.vue)）
- 子系统卡片跳转占位页：home / workbench / housing
- 独立鉴权：[`src/stores/auth.ts`](../门户H5/src/stores/auth.ts)，token 键 `portal-token-v1`
- **`npm run build` 已通过**，产物在 `门户H5/dist/`

### 2. 清理 [`苏住房防汛C端`](<src/pages.json>)（dev）
- 已删除 `login-design`、`systems` 页面及路由
- 主登录页去掉「验证码登录」入口（[`src/pages/login/index.vue`](<src/pages/login/index.vue>)）
- **登录成功 / 有 token 启动** → 直接进入 [`home`](<src/pages/home/index.vue>)（[`src/App.vue`](<src/App.vue)）
- 首页横幅不再跳转子系统选择
- E2E 去掉设计图登录页用例（[`tests/e2e/visual.spec.ts`](<tests/e2e/visual.spec.ts>)）
- **构建已通过**；**已推送** `origin/dev`：`3d7d8a3`

### 3. Git
| 仓库 | 状态 |
|------|------|
| 苏住房防汛C端 | `dev` 已推送 `3d7d8a3` |
| 门户H5 | 本地 `master` 首次提交 `5e707a5`（**未配置 remote**，需你指定 GitLab 地址后再 push） |

---

**部署**：按规范用本地 nginx UI 分别指向 `苏住房防汛C端/dist` 与 `门户H5/dist`（勿起 dev server）。

**后续可选**：给 `门户H5` 配远程仓库并 push；子系统占位页改成真实外链或各业务 H5 地址。

<!-- MEMORY_FIELDS
{
  "event_name": "苏住房防汛C端登录清理",
  "goal": "清理旧登录与菜单页",
  "summary": "苏住房防汛C端 dev 分支删除 login-design、systems 页面及路由，主登录页去掉「验证码登录」入口，登录成功/有 token 启动直接进入 home，首页横幅不再跳转子系统选择，构建通过，已推送 origin/dev 提交 3d7d8a3（2026-11-06）。",
  "ranges": "0,119-128",
  "source_extraction_id": "62d9e6cf58ec4b48aa80cb20ee2f93df",
  "version": 1,
  "memory_type": "events"
}
-->