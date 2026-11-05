# 苏住房防汛C端
；原 worktree D:epository\苏住房防汛C端-wt-login-align（分支 fix/login-design-align）已于2026-11-04移除。

## 后端与服务
- zhi2-property(9604)/common-framework(9211 auth)/service-expand(9610，60防汛接口/7控制器)；响应 JsonResult/PageResult
登录 POST /api/v2.0/security/auth/login（VITE_AUTH_BASE_URL=/api，2026-11-04由/api-auth统一改/api）
- 巡查提交 SubmitInfoDto；缺配置报错"提交流程失败，请检查审批流配置"；bizState 2历史/3汛中/4汛后；权限 flood:inspection:add/submit；搜索示例天地华城小区 code 667577485357516；/v2.0/property/patrol/item/page total=0（多数据源疑2026-11-03）

## 前端状态与页面
- .env VITE_API_BASE_URL=/api、VITE_AUTH_BASE_URL=/api（2026-11-04由/api-flood、/api-auth统一改/api，本地gitignore）；VITE_DATA_MODE=remote；VITE_LOGIN_USER/PWD废弃；
- 页面：task-1 2026-11-03 inspection/detail/history/rescue + types，commit d3c7440；task-2 e2e 5绿；task-6 2026-11-04 全局移除内联红错横幅改toastError（13文件，未交Lead）
2026-11-04 新页 systems/index.vue、home/housing/data/index.vue、BottomNav 5 tab、mine/data index.vue 按设计稿（e2e visual 4/4绿，commit 1a5b51e并已推送origin/dev fecf00a）
- App.vue onLaunch 登录分流：localStorage 有 flood-token-v1 → reLaunch 到 /pages/systems/index 子系统选择页；无 token → 停在 pages.json 首页登录页（2026-11-04 验证无token进登录页、有token进子系统选择页）

nginx D:
ginx\conf\sites-available\防汛C端（sites-enabled符号链接）8095监听，/api/ 代理→http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.dev.zhi.com（2026-11-04由test网关改dev网关，proxy_pass保留完整URI）；root 主区dist
- CI：gitlab-runner无Bun；commit 04b0c7b install-deps.mjs；test→npm test && uni build；二次CI修注入后20测绿
- 2026-11-04 合并 origin/dev（上游2提交：筛选框样式调整、task1395项目检查模块）无冲突，vue-tsc+20测+build全绿，推 origin/dev 8b5d971..fecf00a；.env与nginx为本地配置不入库
- Playwright/Chromium 路径 C:\Users\Administrator\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe；拦截figma.com/font

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "9f9a97dcf5b34ac28c1785f2bf22c9b3",
  "version": 28,
  "memory_type": "entities"
}
-->