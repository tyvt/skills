---
audit_status: valid
last_checked: 2026-11-27T23:18:00+08:00
verdict_note: 苏住房防汛C端 request.ts/home/index.vue 命中；flood-token-v1/flood-login-user-v1/scroll-tabs/BottomNav 均命中，且记忆内 2026-11-27 审计记录与本轮结论一致。
---
# zhi2-mobile-query-h5-c
Suzhou housing flood-control C-end mobile query H5 using uni-app + Vue3, GitLab `suzhufang-fe/zhi2-mobile-query-h5-c`, branch `dev`, local path `D:\repository\苏住房防汛C端`.

## Identity And Build
- `home/index.vue` uses `.scroll-tabs` + `BottomNav`: the 2026-11-04 C-end information feed had a carousel, todos, learning corner, and news list; the 2026-11-14 skeleton mapped banners to API title/image with brand-text fallback when empty, todos to home task summary preserving source/date/category, and list to C-end API; commit `fix/home-visual-20261114` (`a8f6c97652f4ae242135198bc2e3e335f73b527d`) was pushed, and bottom five items only map "我的" to "个人中心".
- Each task uses one git worktree (no node_modules, junction to main repo); verify, merge `dev`, clean; `worktree-snapshot` isolates before commit and `submodule-commit` commits/pushes; background build exit 0 produces `dist`.
- Default `bun run build demo` uses seed data when `usePortalApi()` is false; remote `uni build -m test` uses `.env.test`; project uses bun, has no ESLint CLI, Vitest covers `tests/**/*.test.ts`, and remote mock requests lock `bizState→status` mapping.
- On 2026-11-25 build and unit tests passed, deployment panel and dual-account verification ran, and the fixed `dist` was deployed to the test site.
- The 2026-11-27T07:44:25+08:00 audit marked memory valid: `request.ts` lines 175/187 hit `flood-token-v1`/`flood-login-user-v1`, and `scroll-tabs` plus `BottomNav` were found in source.

## Pages And Features
- `mine/index.vue`: `.user-card` blue gradient, `.menu-card` white, `.mine-body` skeleton; data assembled by `portalData.ts fetchMine`.
- `data/index.vue`: static `ref-assets.ts` design DOM `REF_SEC0~REF_SEC5` is auto-generated and must not be hand-edited; area labels/metrics were previously hardcoded, now only unique title text is bound (area/area size/enterprise count), while detail subgrid and property assessment remain design drafts because APIs are missing.
- `project-check/form/index.vue`: ZenTao 6931 evaluation level selector was uncommented and passes level; 3 frontend files were uncommitted, local draft level-switch reload issue remained, `startCheck` passes level, and backend root cause/commit/dual acceptance are in "ZenTao bug 6931 evaluation level transmission".
- 2026-11-25 ZenTao 6955 removed MOCK, distinguished B-end display, and connected real data; 2026-11-25 ZenTao 6968 showed the G-end rescue detail operation bar (immediate accept/report/progress feedback/completion) when roles exclude `wyqy`/`wyqygly`; concurrent session 43f282f fixed `detail.vue` and real screenshot passed, but accept POST was not persisted and ticket stayed `status=1`.
- 2026-11-27 ZenTao 7034: rescue workorder list refresh fixed by moving list loading from `onLoad` to `onShow` in `src/pages/rescue-workorder/index.vue`; commit `fca4df7e` pushed `dev`; resolved/fixed with image fileID 24710; see "ZenTao bug 7034".

## Login And Requirements
- Login: `useFloodStore().login` calls `/v2.0/security/auth/login` returning `nickName/userName/userId/phone/roles`; captcha placeholder is "请输入图形验证码"; token key `flood-token-v1` is set in `request.ts`; user key `flood-login-user-v1` stores roles/roleKeys/deptId; injecting both keys simulates login.
- 登录页品牌名 2026-11-27 由「苏州市服务监管平台」改为「苏小服」，提交 be74c68 推送 origin/dev（详见改名事件）。
- 2026-11-16 requirement: pre/during/post-flood popups select "property management area" and "warning item"; list header shows selected values; popup style follows provided HTML.
- Pitfalls: import `onShow` from `@dcloudio/uni-app` (from `vue` gives TS2305); browser needs a hash query to bypass old lazy chunks (`pages-home-index.*.js`); hash changes do not trigger `onShow`; role switch needs full reload.
- `store/user.ts`, `utils/index.ts`, and `responseDecrypt.ts` type errors are pre-existing.
- 2026-11-24 rescue detail issue involved `raw:true` not unwrapped plus logs/region field-name mismatch; fix plan approved (see "Rescue work order detail"), local preview `localhost:8162` read `dist` directly, and 2026-11-25 pointed to freshly built `dist`.

## Api And Deployment
- `usePortalApi()` requests lists only when API base is non-empty and token exists; preview build sets `VITE_API_BASE_URL=/api` and intercepts responses; deployment must set `VITE_API_BASE_URL` or `VITE_AUTH_BASE_URL`.
- `request(..., {raw:true})` returns `{code,msg,data}` for caller unwrap, while default unwraps data; `portal.ts detail()` unwraps.
- `GET /v2.0/system/region/list(parentCode=320500)` is login-free and returns `JsonResult<List<SysRegionVo>>` with `{regionName,regionCode,level,parentCode}`.
- 2026-11-11 added `getKeyData/getBenefitData/getRepairData/getSunshineOverview/getRegionList` in the same pattern.
- 2026-11-27 核实：nginx 8095（upstream `192.168.1.31`）实际提供另一套应用（物业首页 + 手机号/短信登录，无品牌名），非本仓 dist；本仓 dist 由 8161/8162 提供（`防汛C端.conf` 监听 8161，site root 直接指向 `D:/repository/苏住房防汛C端/dist`，重建即更新线上站点）；本地后端改动通常不影响实机验证；本地后端 `mvn compile` 需要兄弟 API jar `zhi2-property-api` 与 `common-framework-api` 已装入本地 Maven 仓库。
- 2026-11-27 视觉 E2E 用专用 `playwright.visual.config.ts`（默认配置只匹配 remote/portal-richtext，不含 visual.spec.ts），支持 `PLAYWRIGHT_CHROMIUM_EXECUTABLE` 指定本机 Chromium；全套 5 个失败为预存问题（缺协议勾选文案等），与改名无关。

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_query_h5",
  "source_extraction_id": "3e0b9f076e284ca098f556ec1e667cf2",
  "version": 56,
  "memory_type": "entities"
}
-->