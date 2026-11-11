# 苏住房防汛C端
Suzhou Housing flood-control C-end H5 project (uni-app Vue3), covering backend services, frontend state, deployment, and ongoing fixes.

## 后端与服务
- Backend: zhi2-property(9604)/common-framework(9211 auth)/service-expand(9610, 60 flood interfaces/7 controllers), responses JsonResult/PageResult.
- Login POST /api/v2.0/security/auth/login (VITE_AUTH_BASE_URL=/api, changed from /api-auth on 2026-11-04).
- Inspection submit uses SubmitInfoDto; missing config error "提交流程失败，请检查审批流配置"; bizState 2 history/3 flood/4 post-flood; perms flood:inspection:add/submit; sample search 天地华城小区 code 667577485357516; /v2.0/property/patrol/item/page total=0 (multi-datasource suspect 2026-11-03).

## 前端状态与构建
- .env: VITE_API_BASE_URL=/api, VITE_AUTH_BASE_URL=/api (2026-11-04 unified from /api-flood,/api-auth), VITE_DATA_MODE=remote; VITE_LOGIN_USER/PWD deprecated; local gitignore.
- task-1 2026-11-03 inspection/detail/history/rescue+types (commit d3c7440); task-2 e2e 5 green; task-6 2026-11-04 global error banner→toastError (13 files, not to Lead).
- 2026-11-04 new pages systems/index.vue, home/housing/data/index.vue, BottomNav 5 tab, mine/data index.vue per design (e2e 4/4 green, commit 1a5b51e pushed dev); App.vue onLaunch: flood-token-v1→reLaunch systems, else login page.
- 2026-11-06 style commits: .stepper 40→56px (theme.css#L122), project-check/form 48→56px (83bddfa dev), ref8443 image→PhotoPicker (fb0e9d9 dev), font 14px (4088d72 dev) & 16px (89f8c85 dev), emergency phone tap (feat/emergency-phone-tap), action btn 56px (wt-action-btn-56 5a2105d), ref8443 UI tweaks (b595f75,c164dfe,f7beb30,226268d,b8b49c4,ad033a8,b931c16,f3b4d3d merged dev), mocks 47af55e/ae35a7d.
- 2026-11-10 unsubmitted fix: handheld pre-flood warning missing root cause fetchTemplate(src/stores/flood.ts) @DataScope; added fetchFillableEvent with /v2.0/safety/flood/event/options?inspectionStage=<stage> (pre=2/mid=3/post=4); fixed Ref8443Inspection.vue import from stores/flood; vue-tsc+uni build passed, not committed/ZenTao.
- 2026-11-11 修复手持端防汛检查表单（Ref8443Inspection.vue + index.vue）：填报日期默认今天、移除选择项预选值；uni build 通过，用户选择 commit & push 并回写禅道 6452 为已解决，助手暂存两改动文件准备提交。

## 部署与CI
- nginx D:\nginx\conf\sites-available\防汛C端 listen 8095, /api/ proxy→http://unlimited.c.h5.query.mobile.v2.suzhufang.shiqu.suzhou.dev.zhi.com (changed 2026-11-04 test→dev), root main dist.
- CI: gitlab-runner no Bun; commit 04b0c7b install-deps.mjs; test→npm test && uni build; secondary CI 20 tests green.
- 2026-11-04 merged origin/dev (filter style, task1395) no conflict, vue-tsc+20 tests+build green, pushed 8b5d971..fecf00a; .env/nginx local not in repo.
- Playwright/Chromium path C:\Users\Administrator\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe; intercept figma.com/font.

## 工作树历史
- Original worktree D:\repository\苏住房防汛C端-wt-login-align (fix/login-design-align) removed 2026-11-04.

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "47c8bd36d8d04379bdc0577c526a67b1",
  "version": 43,
  "memory_type": "entities"
}
-->