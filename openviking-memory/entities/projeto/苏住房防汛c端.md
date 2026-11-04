# Projeto Suzhufang Flood C-End
Frontend H5 uni-app Vue3 para sistema flood, diretório D:\repository\苏住房防汛C端.

## Backend e Branches
- master sem remote, commit inicial 8311331, untracked, solo master sem worktree.
- Backend branch develop/v2.6.2-suzhufang-dev altera common-flowable/service-expand/zhi2-property; docs backend-integration.md/.mjs.
- Serviços: zhi2-property(9604), common-framework(9211 auth), service-expand(9610, 60 interfaces Flood/7 controllers); resposta JsonResult={code,msg,data}, PageResult={total,rows,code,msg,summary}.
- Login POST /api-auth/v2.0/security/auth/login body {username,password(AES-256 base64)} header zhi-project-id: suzhufang; token em localStorage flood-token-v1.
- Conta zsbase / Zs@2026Aa！; AES ciphertext H03W0LoMA6EFQZIW46BnNA== (KEY=A-16-Byte-keyVal, IV=A-16-Byte-String, AES/CBC/PKCS5Padding); Feign interno exige zhi-project-id.
- Inspeção submit flowable: SubmitInfoDto={id obrigatório,busCode?,deptId?,submitTittle?,procDefId?,variables?}; sem config erro "提交流程失败，请检查审批流配置".
- Inspeção save: pré bizState=FINISHED + stage match, pós PENDING_SUBMIT; stage bizState=2 histórico, 汛中(3)/汛后(4) preenchimento, fases 讯前(pre)/汛中(mid)/汛后(post).
- Preenchimento→submissão exige eventos FINISHED por stage + busCode flowable; permissão flood:inspection:add/submit e dept property (subject=property); busca "小" ex. 天地华城小区 code 667577485357516.
- `/v2.0/property/patrol/item/page` total=0 (suspeita multi-datasource 2026-11-03); DM DB ZHISHU_PROPERTY e SERVICE_EXPAND ambas T_PATROL_ITEM diferentes.

## Frontend e Store
- .env VITE_DATA_MODE=remote conecta backend real (task-2 E2E verde 2026-11-03); VITE_LOGIN_USER/PWD obsoletos.
- FloodItem={templateItemId,label,fillType,fillOptions?,unit?,value,sortNo?}; FloodRecord={inspectionNo,complexName,checkDate,subject,bizState,items?,rescue?,values?}.
- Store API: fetchTemplate(kind)→{kind,eventId,stage,items}; searchComplex(keyword)→{code,name}[]; submitInspection/submitRescue/saveDraft/loadDraft/fetchHistoryPage/countHistory/getRecord/getRecordAsync.
- Render: fillType '1' ou numérico→input número não-negativo; fillOptions→select; senão texto; valor em FloodItem.value(string); draft remote só local uni storage.
- ID snowflake 19 dígitos deve String() (Number() perde precisão "预警不存在"); store.submitInspectionRemote corrigido String(values.eventId) etc 2026-11-03.
- task-1 2026-11-03: inspection/index.vue, detail/index.vue, history/index.vue, rescue/index.vue, types/inspection.ts; onLoad lê kind→fetchTemplate; detail prioriza record.items; commit d3c7440 fix label wrap.
- Fix bug history→detail 2026-11-03: ausência `kind` fazia rescue detail chamar API inspeção.
- task-2 2026-11-03: tests/e2e/remote.spec.ts + playwright.config.ts, 5 cenários verdes (ver entidade "苏住房防汛C端E2E测试").
- 2026-11-03 login page src/pages/login/index.vue; App.vue token→workbench senão login; store.logout() e tab "我的"; .env auto-login off.
- 2026-11-04 novas páginas systems/index.vue (ref "苏州市服务监管平台"), home/index.vue, housing/index.vue, data/index.vue; BottomNav.vue 5 tabs; useMainNav.ts; App.vue→seleção subsistema; 15 SVG/PNG; worktree commit 1a5b51e fast-forward dev não push.

## Deploy e CI/CD
- nginx D:\nginx\conf\conf.d\flood-c-h5.conf root D:/repository/苏住房防汛C端/dist/ (migrado 2026-11-03), listen 8095; http://127.0.0.1:8095/ retorna "苏住房防台防汛"; proxy /api-flood/→9610/, /api-auth/→9211/; conflito 8103 com Kunshan migrou 8095.
- package.json: build/build:h5=`uni build --outDir ./dist` (raiz plana); build:mp-weixin dist-mp-weixin/ gitignored.
- CI falha 2026-11-03: gitlab-runner 16.9.0 sem Bun, `bun install --frozen-lockfile`→not found.
- Compat commit 04b0c7b (dev 83ce98e..04b0c7b): scripts/install-deps.mjs; com Bun `bun install --frozen-lockfile`, sem Bun `npm install --legacy-peer-deps` (ERESOLVE DCloud), tools/testing `npm install --workspaces=false` isola vite@8+vitest@5 vs raiz vite@5.
- package.json: `install-dependencies`→`node scripts/install-deps.mjs`; `test`→`npm --prefix tools/testing run test && uni build -m test --outDir ./dist`; README sync.
- Verificação CI limpo: install exit 0, test 20/20, build dist/; com Bun `bun install` no changes.
- Commit 2e42478 usava `bun install --frozen-lockfile` e build plano; nginx root sync.
- Segunda falha CI (04b0c7b..5115cb6 push origin/dev): pipeline só `npm run test` sem build, tar dist/* deu Cannot stat; corrigido test injeta uni build, verificado 20 testes, dist/index.html +43 artefatos.


<!-- MEMORY_FIELDS
{
  "category": "Projeto",
  "name": "苏住房防汛C端",
  "source_extraction_id": "e241c05fac3842f3aa947be4d03aabe9",
  "version": 20,
  "memory_type": "entities"
}
-->