# Suzhufang Flood C-End
uni-app Vue3 H5 frontend for flood system, dir D:\repository\苏住房防汛C端. Backend branch develop/v2.6.2-suzhufang-dev alters common-flowable/service-expand/zhi2-property (docs backend-integration.md/.mjs). Local master no remote, initial commit 8311331, untracked, solo master no worktree.

## Backend & Services
- Services zhi2-property(9604)/common-framework(9211 auth)/service-expand(9610, 60 Flood interfaces/7 controllers); responses JsonResult={code,msg,data}, PageResult={total,rows,code,msg,summary}
- Login POST /api-auth/v2.0/security/auth/login body {username,password(AES-256 base64)} header zhi-project-id: suzhufang; token in localStorage flood-token-v1; account zsbase / Zs@2026Aa！ AES ciphertext H03W0LoMA6EFQZIW46BnNA== (KEY=A-16-Byte-keyVal IV=A-16-Byte-String AES/CBC/PKCS5Padding); Feign needs zhi-project-id
- Inspection submit flowable SubmitInfoDto={id required,busCode?,deptId?,submitTittle?,procDefId?,variables?}; missing config errors "提交流程失败，请检查审批流配置"
- Inspection save pre bizState=FINISHED+stage match, post PENDING_SUBMIT; stage bizState=2 history, 汛中(3)/汛后(4) filling, phases 讯前(pre)/汛中(mid)/汛后(post); fill-to-submit needs FINISHED events per stage+busCode flowable; permission flood:inspection:add/submit, dept property (subject=property); search "小" e.g. 天地华城小区 code 667577485357516
- /v2.0/property/patrol/item/page total=0 (multi-datasource suspect 2026-11-03); DM DB ZHISHU_PROPERTY and SERVICE_EXPAND both have different T_PATROL_ITEM

## Frontend & Store
- .env VITE_DATA_MODE=remote connects real backend (task-2 E2E green 2026-11-03); VITE_LOGIN_USER/PWD obsolete
- FloodItem={templateItemId,label,fillType,fillOptions?,unit?,value,sortNo?}; FloodRecord={inspectionNo,complexName,checkDate,subject,bizState,items?,rescue?,values?}
- Store API fetchTemplate(kind)->{kind,eventId,stage,items}; searchComplex(keyword)->{code,name}[]; submitInspection/submitRescue/saveDraft/loadDraft/fetchHistoryPage/countHistory/getRecord/getRecordAsync
- Render fillType '1'/numeric->non-neg number input; fillOptions->select; else text; value FloodItem.value(string); draft remote only local uni storage; snowflake 19-digit ID must String() (Number() loses precision "预警不存在"); store.submitInspectionRemote fixed String(values.eventId) 2026-11-03
- task-1 2026-11-03: inspection/detail/history/rescue index.vue + types/inspection.ts; onLoad reads kind->fetchTemplate; detail prioritizes record.items; commit d3c7440 fix label wrap; bug history->detail missing `kind` called inspection API

## Frontend Pages
- task-2 2026-11-03: tests/e2e/remote.spec.ts + playwright.config.ts, 5 green scenarios (see "苏住房防汛C端E2E测试")
- 2026-11-03 login page src/pages/login/index.vue; App.vue token->workbench else login; store.logout() + tab "我的"; .env auto-login off
- 2026-11-04 new pages systems/index.vue (ref "苏州市服务监管平台"), home/index.vue, housing/index.vue, data/index.vue; BottomNav.vue 5 tabs; useMainNav.ts; App.vue->subsystem selection; 15 SVG/PNG; worktree commit 1a5b51e fast-forward dev no push

## Deploy & CI/CD
- nginx D:\nginx\conf\conf.d\flood-c-h5.conf root D:/repository/苏住房防汛C端/dist/ (migrated 2026-11-03), listen 8095; returns "苏住房防台防汛"; proxy /api-flood/->9610/, /api-auth/->9211/; conflict 8103 with Kunshan migrated 8095
- package.json build/build:h5=`uni build --outDir ./dist` (flat root); build:mp-weixin dist-mp-weixin/ gitignored
- CI failed 2026-11-03: gitlab-runner 16.9.0 no Bun; compat commit 04b0c7b scripts/install-deps.mjs: with Bun `bun install --frozen-lockfile`, no Bun `npm install --legacy-peer-deps` (ERESOLVE DCloud), tools/testing `npm install --workspaces=false` isolates vite@8+vitest@5
- package.json install-dependencies->`node scripts/install-deps.mjs`; test->`npm --prefix tools/testing run test && uni build -m test --outDir ./dist`; clean CI install exit 0, test 20/20, build dist/, Bun `bun install` no changes
- Commit 2e42478 used `bun install --frozen-lockfile` flat build; second CI fail (04b0c7b..5115cb6 push origin/dev) pipeline only `npm run test` no build tar Cannot stat; fixed test injects uni build, 20 tests, dist/index.html +43 artifacts

<!-- MEMORY_FIELDS
{
  "category": "Projeto",
  "name": "苏住房防汛C端",
  "source_extraction_id": "fde7337c82a744feaa7727661809c575",
  "version": 21,
  "memory_type": "entities"
}
-->