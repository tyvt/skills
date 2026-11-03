# 苏住房防汛C端
uni-app Vue3 H5 防汛前端项目，前端目录 D:\repository\苏住房防汛C端，对接后端 Flood 服务。

## 代码分支与后端
- master 无远程，首提交 8311331，未跟踪，solo master 直开不建 worktree
- 后端分支 develop/v2.6.2-suzhufang-dev，改 common-flowable/service-expand/zhi2-property；联调文档 docs/backend-integration.md/.mjs
- 后端服务：zhi2-property(9604)、common-framework(9211 鉴权)、service-expand(9610, 60 Flood 接口/7 Controller)；响应 JsonResult={code,msg,data}, PageResult={total,rows,code,msg,summary}
- 巡检 submit 走 flowable：SubmitInfoDto={id必填,busCode?,deptId?,submitTittle?,procDefId?,variables?}；无配置报「提交流程失败，请检查审批流配置」
- 巡检 save 前置 bizState=FINISHED 预警事件且阶段匹配，后置 PENDING_SUBMIT；阶段 bizState=2 历史，汛中(3)/汛后(4)可填报，讯前(pre)/汛中(mid)/汛后(post)
- 填报→提交前提：dev 各阶段 FINISHED 事件 + busCode flowable 配置；用户须 flood:inspection:add/submit 权限且绑定小区物业部门(subject=property)；物业区域可搜"小"(例天地华城小区 code 667577485357516)
- `/v2.0/property/patrol/item/page` 联调 total=0（疑多数据源，2026-11-03 未定位）；达梦库 ZHISHU_PROPERTY 与 SERVICE_EXPAND 均有 T_PATROL_ITEM 表结构不同
- 登录 POST /api-auth/v2.0/security/auth/login，body {username,password(AES-256加密后base64)} 头带 zhi-project-id: suzhufang；返回 accessToken 存 localStorage 键 flood-token-v1
- 账号 zsbase / Zs@2026Aa！；AES 密文 H03W0LoMA6EFQZIW46BnNA==（KEY=A-16-Byte-keyVal，IV=A-16-Byte-String，AES/CBC/PKCS5Padding）；内部 Feign 须带 zhi-project-id

## 本地部署与前端架构
- nginx D:\nginx\conf\conf.d\flood-c-h5.conf，root D:/repository/苏住房防汛C端/dist/（原 dist/build/h5 已迁，2026-11-03），监听 8095；访问 http://127.0.0.1:8095/ 返200「苏住房防台防汛」；反代 /api-flood/→9610/，/api-auth/→9211/；曾因共用 8103 与昆山物管冲突迁 8095
- .env 配 VITE_DATA_MODE=remote 连真实后端（2026-11-03 task-2 E2E 全绿）；VITE_LOGIN_USER/PWD 废弃强制手动登录
- import.meta.env.VITE_DATA_MODE('demo'|'remote')；FloodItem={templateItemId,label,fillType,fillOptions?,unit?,value,sortNo?}；FloodRecord={inspectionNo,complexName,checkDate,subject,bizState,items?,rescue?,values?}
- store API：fetchTemplate(kind)→{kind,eventId,stage,items}；searchComplex(keyword)→{code,name}[]；submitInspection/submitRescue/saveDraft/loadDraft/fetchHistoryPage/countHistory/getRecord/getRecordAsync
- 渲染 fillType==='1'或数值→数字输入(非负整数)；fillOptions→选择；否则文本；值绑 FloodItem.value(字符串)；草稿 remote 仅存本地 uni storage
- 19位雪花ID须 String() 传参（Number()精度丢失致「预警不存在」），store.submitInspectionRemote 已改 String(values.eventId) 等（2026-11-03 修复）

## 页面改造与E2E
- task-1（2026-11-03）改 inspection/index.vue、detail/index.vue、history/index.vue、rescue/index.vue、types/inspection.ts；onLoad 读 kind→fetchTemplate 动态渲染；detail 优先 record.items；提交 d3c7440 修复详情页标签折行
- 修复历史→详情跳转 bug（2026-11-03）：原未传 `kind` 致 rescue 详情误调巡检接口
- task-2（2026-11-03）新增 tests/e2e/remote.spec.ts + playwright.config.ts，5 场景全绿（见实体「苏住房防汛C端E2E测试」）
- 2026-11-03 新增登录页 src/pages/login/index.vue，App.vue 有 token 进工作台否则登录页；store.logout() 与「我的」tab 退出；关闭 .env 自动登录

## CI/CD命令与构建输出
- package.json：build/build:h5=`uni build --outDir ./dist`（H5 平铺根 dist/）；build:mp-weixin 输出独立 dist-mp-weixin/（已 gitignore）
- CI 失败根因（2026-11-03）：gitlab-runner 16.9.0 无 Bun，原硬编码 `bun install --frozen-lockfile`→`bun: not found`
- 兼容模式（commit 04b0c7b，dev 83ce98e..04b0c7b）：新增 scripts/install-deps.mjs，有 Bun 走 `bun install --frozen-lockfile`，无 Bun 走 npm 回退——根 `npm install --legacy-peer-deps`（DCloud peer 偏差 ERESOLVE），tools/testing 用 `npm install --workspaces=false` 隔离 vite@8+vitest@5 与根 vite@5
- package.json：`install-dependencies`→`node scripts/install-deps.mjs`；`test`→`npm --prefix tools/testing run test && uni build -m test --outDir ./dist`；README 同步
- 验证（干净目录隐藏 Bun 模拟 CI）：install exit 0、test 20/20、build 产出 dist/；有 Bun 时 `bun install` no changes
- 此前提交 2e42478 曾设 install-dependencies 为 `bun install --frozen-lockfile`、build 平铺 dist/，nginx root 须同步改 dist/
- 二次 CI 失败与修复（2026-11-03，commit 04b0c7b..5115cb6 推 origin/dev）：流水线 nodejs-build.sh 跑 install-dependencies 后只 `npm run test`（vitest 20/20 通过）即 `tar dist/*`，因 test 未含构建步骤报 Cannot stat；改 test 注入 uni build 后本地验证 20 单测通过、根目录生成 dist/index.html 及 43 产物，重跑流水线可命中


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房防汛C端",
  "source_extraction_id": "f53177084e504b838182c24425977ff7",
  "version": 18,
  "memory_type": "entities"
}
-->