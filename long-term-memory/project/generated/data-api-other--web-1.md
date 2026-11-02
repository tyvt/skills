# 项目专属 · 接口与数据归一化 · 其他（1/1）

共 20 条，引用前核对所属项目及代码。

### s0948 · 本地改 env/.env 的代理不生效：实际被 env/.env.development.local 覆盖，且 Vite 只在启动时读 env

🟡 踩坑 ｜ 验证于 苏房V3 ｜ 距代码最后改动 17 天，引用前请核对

情况：在 zhi2-web-admin 里改了仓库根 env/.env 的 VITE_APP_PROXY_ADDRESS（如改成 http://192.168.1.134:8080/v3.0），重启后接口仍打到旧地址，看起来「代理没生效」。

为什么：vite.config.js 用 loadEnv(mode, rootDir + "/env") 且 envDir 也指向仓库根的 env/，因此 Vite 的环境变量合并顺序是 env/.env → env/.env.local → env/.env.development → env/.env.development.local（后者覆盖前者）。本机若存在 env/.env.development.local（该文件是「不提交、仅本机」的覆盖配置，注释里写明与 unlimited dev 网关对齐），它的 VITE_APP_PROXY_ADDRESS 会盖掉 .env 里的值。用 loadEnv('development', ...) 实测最终值仍是 unlimited dev 网关。

怎么做：改本地代理一律改 env/.env.development.local（或先注释掉其中的 VITE_APP_PROXY_ADDRESS），改完必须完全重启 npm run dev，热更新不会重载代理；验证方式是在浏览器 DevTools 里看接口响应头 frontend-proxy（createProxyConfig 会写该头）。排查时别忽略两个旁证：VITE_APP_FILE_PROXY_ADDRESS 与 API 代理是两套（附件/图片 /zhi2、/zhi2-dev 仍走远程），跑 test 模式读的是 env/.env.test 而非 .env；目标为 192.168.* 局域网时代理会剥掉 /api/v3.0 前缀，target 带 /v3.0 需与后端挂载路径一致。

> 依据（摘）：会话 d5d06cba（cursor，基线 99bfdbd）用户问「@env/.env 我修改了代理为什么没有生效」；助手定位到 vite.config.js 的 loadEnv(mode, rootDir+"/env") + envDir…

文件：`env/.env`、`env/.env.development.local`、`env/.env.test`
---

### x0263 · v2 接口网关前缀统一用 /api/v2.0 并由 nginx 代理

⚪ 事实 ｜ 验证于 repository ｜ 无 git 基线，引用前请自行核对

项目 v2 接口统一走 /api/v2.0 网关前缀(nginx proxy)；合并修复分支时要同步 deploy/nginx.conf、env/.env 与 zhi2-web-admin 子模块指针，否则前缀不对或子模块不一致会导致接口 404/网关错误。

> 依据（摘）：005.md 会话 5cdf25d8：fix 合并到 develop/v2.6.2-portal，use /api/v2.0 gateway prefix for v2 APIs and nginx proxy

文件：`deploy/nginx.conf`、`env/.env`
---

### x1460 · 房屋变更页缺少项目信息致楼幢单元选择失败

⚪ 踩坑 ｜ 验证于 惠山二期G ｜ 无 git 基线，引用前请自行核对

根因：zhi2-web-admin/src/views/building/houseChange/detail.vue 从房屋数据跳转时接口返回缺 projectId，触发楼幢/单元对话框校验失败。修复：新增 backfillProjectInfo() 在新增/编辑模式加载后回填 projectId 等关联信息。

> 依据（摘）：src=惠山二期G/012.md

文件：`D:/repository/惠山二期G/zhi2-web-admin/src/views/building/houseChange/detail.vue`、`D:/repository/惠山二期G/zhi2-web-admin/src/views/building/house/detail.vue`、`D:/repository/惠山二期G/zhi2-web-admin/src/views/building/buildingTable/index.vue`
---

### x1683 · 嵌 web-view 的 H5 轮播/静态资源：接口相对路径须拼发布前缀绝对路径，禁止 ./ 相对当前路由

🔴 模式 ｜ 验证于 无锡市区小程序嵌入H5 ｜ 距代码最后改动 101 天，绑定具体实现，务必先核对代码

现象：banner 接口返回 pictureUrl 如 /zhi2/2026/.../xxx.jpg，前端拼成 ./sfb/zhi2/... 或裸相对路径后，在 /szh5/pages/webview/home 等页面会被解析为 /szh5/pages/webview/sfb/zhi2/...（路由污染），图片 404。根因：SPA 内相对 URL 相对的是当前 pathname，不是静态资源根。做法：用 VITE_APP_H5_PUBLIC_BASE（与 manifest h5.router.base 一致，如 /szh5）得到 getH5PublicBase()，媒体路径统一为绝对路径：raw 以 /sfb/ 开头则保留，否则 `/sfb${raw}`，再 `${getH5PublicBase()}${mediaPath}`，最终形如 https://host/szh5/sfb/zhi2/...。不要用「仅相对站点」的 ./sfb 指望在所有路由下正确。

> 依据（摘）：会话 47414239：用户反馈图片 URL 含 pages/webview 路由段；结论说明 ./sfb 相对当前页解析错误，改为 getH5PublicBase() + /sfb 前缀绝对路径。

文件：`zhi2-mobile-admin-h5-c-unlimited/src/utils/zhishuAsset.js`、`zhi2-mobile-admin-h5-c-unlimited/src/hooks/usePortal.js`、`zhi2-mobile-admin-h5-c-unlimited/.env.production`
---

### x1880 · 淮安物管本地联调 building 接口的 Vite 代理模板

🔴 模式 ｜ 验证于 淮安物管 ｜ 距代码最后改动 189 天，绑定具体实现，务必先核对代码

【场景】`zhi2-web-admin` 本地把 `/api/2.0/building` 指到联调机。【写法】对齐 maintenance 代理：`target` + `rewrite`（`/api/2.0/building` → `/2.0/building`）+ `changeOrigin: true` + `bypass` 里写 `req.headers['zhi-project-id']='homeland'` 并 `res.setHeader('full-url', target+rewrittenUrl)`。【注意】上游若要求保留 `/api` 前缀则不要 strip `/api`，按后端真实路径改 rewrite；target IP/端口随环境替换。

> 依据（摘）：会话 05e9d9be：用户要求 /api/2.0/building 代理 192.168.1.158:9603 并参考 maintenance 配置。

文件：`zhi2-web-admin/vite.config.js`、`env/.env`
---

### x2174 · 项目存在两套后端域名，API 前缀必须按域名分别配置：szfcweb.cn 用 /prod-api，主接口用 /api

🔴 模式 ｜ 验证于 苏住房C ｜ 距代码最后改动 66 天，绑定具体实现，务必先核对代码

本项目前端同时对接两套后端：主接口（szf.szzfcjj.cn，V2 + V1 业务）与苏州市区房产交易网上服务平台（http://szfang.szfcweb.cn）。两者的路径前缀约定不同——szfcweb.cn 必须是 /prod-api，主接口是 /api；写成 /api 会因为网关没配该前缀而 404/502。

怎么做：
- 小程序端（mp）：API 基地址集中在 src/env/mp.js，V1 实例在 src/api/v1Instance.js 里拼，BASE = `${BASE_URL_V1}/prod-api/v2.0`。改前缀只改这一处，不要散落到各个 api 文件。
- H5 端：走环境变量代理，VITE_APP_API_PROXY_V1 已经指向 http://szfang.szfcweb.cn/prod-api，无需改代码。
- 主接口（szf.szzfcjj.cn）仍保持 /api/v2.0，切换前缀时务必确认没有误伤它。

判定口径：需求说「xx 域名开头的接口」时，先按域名分组再动前缀，不要全局替换 /api → /prod-api。

> 依据（摘）：会话 bfce31c8：用户两次强调「http://szfang.szfcweb.cn 开头的接口，不要用/api，要用/prod-api」。最终只改 zhi2-mobile-shimin/src/api/v1Instance.js 的 B…

文件：`zhi2-mobile-shimin/src/api/v1Instance.js`、`zhi2-mobile-shimin/src/env/mp.js`、`zhi2-mobile-shimin/src/api/index.js`
---

### x2181 · 同一小程序内多套后端基础路径：szfang.szfcweb.cn 的 prod-api 不拼 /v2.0，主接口 szzfcjj.cn 才保留

🔵 事实 ｜ 验证于 苏住房C ｜ 约定/偏好类，通常长期有效（记录于 2026-08-21）

情况：苏住房C 小程序同时对接两套后端——主接口 http://szf.szzfcjj.cn/api/v2.0（带 /v2.0）与 v1 实例 http://szfang.szfcweb.cn/prod-api（不带 /v2.0）。用户明确指出后者「不需要加 /v2.0」。此前 v1Instance.js 的 base 写成 .../prod-api/v2.0，articleV1.js 里也把路径写成 /v2.0/article/richText/page 这类前缀，导致 404。
为什么：两套服务是不同网关命名习惯，/v2.0 是主接口的版本段而非全局约定；把 base 与具体路径都当成可统一处理的量，就会出现「base 已含 /v2.0、路径里又拼一次」或「本该没有却拼上」的双错。
怎么做：① 把 /v2.0 从 v1 实例的 base 与所有 api 模块路径里同时去掉，base 止于 /prod-api，路径从业务段起写（/article/richText/page、/transaction/house/favorite/page）；② 每个 api 文件只依赖自己实例的 base，不在路径里重复版本段；③ 三处环境变量/常量要成组更新——v1Instance.js（小程序端 base）、src/env/mp.js（develop/trial 的 BASE_URL_V1 / IMAGE_BASE_V1）、.env.* 的 VITE_APP_API_PROXY_V1 / VITE_APP_IMG_PROXY_V1；④ H5 走 /szf 前缀由 vite 代理转发，本身不加 /v2.0；⑤ 改 .env 后必须重启开发服务才生效。新增/迁移服务时先确认「该服务的 base 是否自带版本段」，再决定路径写法。

> 依据（摘）：会话 41cb8c35（2026-08-21，基线 9832ba3）用户指出「http://szfang.szfcweb.cn/prod-api 的接口不需要加/v2.0」；修改 v1Instance.js 的 base（szfang.sz…

文件：`d:\repository\苏住房C\zhi2-mobile-shimin\src\api\v1Instance.js`、`d:\repository\苏住房C\zhi2-mobile-shimin\src\api\articleV1.js`、`d:\repository\苏住房C\zhi2-mobile-shimin\src\env\mp.js`
---

### x2354 · 市民端账户注销分步调3接口验证码

⚪ 套路 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

账户注销主要在 `zhi2-mobile-shimin` 市民端完成，按步骤调用 3 个后端接口并发送验证码。`cancellationWarning.vue` 配置 `szf.user.cancellation` 不直接调接口，`cancellationForm.vue` 做手机验证，`cancellationReason.vue` 提交原因。

> 依据（摘）：src=苏住房C/082.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/api/security.js`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_my/setting/cancellationReason.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_my/setting/cancellationForm.vue`
---

### s1005 · 联行号接口统一迁移至unionBank模块

⚪ 踩坑 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

前端联行号接口统一使用 `/system/unionBank/page`（经 `VITE_APP_BASE_API=/api/v3.0` 拼接）。新增 `zhi2-web-admin/src/api/system/unionBank.js` 导出 `pageUnionBank()`；`yhlhhgl.js` 中 `listYhlhhgl` 改调 `pageUnionBank()`，CRUD 保留旧 `unionCodeManage/*`。

> 依据（摘）：src=苏州市房地产监测V3/029.md

文件：`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyApply/detail.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyManagement/components/bankTable.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyRegister/components/bankTable.vue`
---

### s1112 · 接口projectId为null致楼盘表点击无响应

⚪ 踩坑 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

zhi2-web-admin/src/views/projectManagement/customerProject/detail.vue中openBuildingTable()因form.projectId为null静默return致点击无响应；改为使用`this.form.projectId || this.id || this.$route.params.tableId || this.$route.query.id`回退链取projectId。

> 依据（摘）：src=苏州市房地产监测V3/082.md

文件：`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/customerProject/detail.vue`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/ruoyi.js`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/projectManagement/building-table-debug.spec.js`
---

### s1138 · PDF路径应优先取planDocSite避免跳页

⚪ 事实 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

根因：接口PDF路径位于data.plan.planDocSite，原代码读不存在的planUrl导致回退方案页。修复：permitConstants.js新增resolvePlanDocUrl()依次取planDocSite/planUrl；handleQueryPlan()与canQueryPlan改用该函数；vite.config.js需代理/zhi2-dev静态资源。

> 依据（摘）：src=苏州市房地产监测V3/092.md

文件：`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/detail.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/PermitPlanPanel.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/resolveServerAssetUrl.js`
---

### s1201 · 合同审批接口路径须为flowable/task

⚪ 模式 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

原 `zhi2-web-admin/src/views/contract/utils/contractRequest.js` 中 `getFlowViewer` 与 `isApprovalAuth` 接口路径误用 `/flowable/definition/*` 致审批异常，关键修复为改至 `/flowable/task/*`。

> 依据（摘）：src=苏州市房地产监测V3/124.md

文件：`d:/repository/苏州市房地产监测V3/路由信息.json`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/vite.config.js`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/flowable/definition.js`
---

### s1477 · 经纪机构入网企业端保存用saveAgency

⚪ 偏好 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

「经纪机构入网」前端分两条业务线，保存接口不同。企业端 `AgencyEntryNetworkDetail.vue` 保存走 `POST /company/companyRecord/entryNetwork/save`，由 `zhi2-web-admin/src/api/company/companyRecord.js` 中 `saveAgencyEntryNetwork` 封装（去 `qualificationList` 后调 `saveEntryNetwork`）。

> 依据（摘）：src=苏州市房地产监测V3/325.md

文件：`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/company/companyRecord.js`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/institution/institutionRegister.js`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/companyManagement/components/AgencyEntryNetworkDetail.vue`
---

### s1483 · 图片文件代理复用接口代理地址

⚪ 事实 ｜ 验证于 苏房V3 ｜ 无 git 基线，引用前请自行核对

vite.config.js 中 getFileProxyTarget 直接返回 VITE_APP_PROXY_ADDRESS，不再读取 VITE_APP_FILE_PROXY_ADDRESS 及剥离 /v3.0 后缀，使开发服务器 /zhi2* 文件代理与接口代理同目标。deploy/nginx.conf 原已指向 fdc_api_gateway 无需变动，env/.env 旧变量可清理。

> 依据（摘）：src=苏州市房地产监测V3/330.md

文件：`D:/repository/苏州市房地产监测V3/zhi2-web-admin/vite.config.js`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/resolveServerAssetUrl.js`、`vite.config.js`
---

### x2925 · 项目备案新增宗地信息地块编号改手输

⚪ 模式 ｜ 验证于 苏州市房地产监测V3-leftover ｜ 无 git 基线，引用前请自行核对

zhi2-web-admin/src/views/projectManagement/customerProject/components/ParcelDialog.vue 内地块编号由只读选择改为 zs-input 手输，registeredFlag == '1' 时仍不可改。移除 SelectDialog 及 openLandSelect/fillFromLand/clearLandFields 逻辑后地址面积等不再自动填充，保存校验须对齐后端 landPlot 接口。

> 依据（摘）：src=苏州市房地产监测V3-leftover/029.md

文件：`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/company/institutionRegister/detail.vue`、`d:/repository/苏州市房地产监测V3/路由信息.json`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/customerProject/components/ParcelDialog.vue`
---

### x3027 · getFileProxyTarget返回接口代理地址

⚪ 事实 ｜ 验证于 苏州市房地产监测V3-leftover ｜ 无 git 基线，引用前请自行核对

`vite.config.js` 的 `getFileProxyTarget` 直接返回 `VITE_APP_PROXY_ADDRESS`，替代原 `VITE_APP_FILE_PROXY_ADDRESS` 且不剥离 `/v3.0` 后缀，使开发服务器 `/zhi2`、`/zhi2-dev`、`/zhi2-test` 文件代理与接口代理同目标。`deploy/nginx.conf` 的 `/api/v3.0/` 与 `/zhi2*/` 均指向 `fdc_api_gateway` 故部署无改动，`env/.env` 中 `VITE_APP_FILE_PROXY_ADDRESS` 可清理。

> 依据（摘）：src=苏州市房地产监测V3-leftover/130.md

文件：`D:/repository/苏州市房地产监测V3/zhi2-web-admin/vite.config.js`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/resolveServerAssetUrl.js`、`vite.config.js`
---

### x3077 · 详情接口projectId空致楼盘表点击无响应

⚪ 踩坑 ｜ 验证于 苏州市房地产监测V3-rest ｜ 无 git 基线，引用前请自行核对

根因为 `/building/project/detail` 返回 `projectId` 为 `null`，旧代码 `openBuildingTable()` 中 `if(!this.form.projectId) return` 静默退出无报错。`zhi2-web-admin/src/views/projectManagement/customerProject/detail.vue` 的 `projectId` 改为回退链取值（`this.id`/`$route.params.tableId`/`$route.query.id`）。

> 依据（摘）：src=苏州市房地产监测V3-rest/025.md

文件：`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/customerProject/detail.vue`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/ruoyi.js`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/projectManagement/building-table-debug.spec.js`
---

### x3126 · 预售方案PDF须读planDocSite防回退

⚪ 事实 ｜ 验证于 苏州市房地产监测V3-rest ｜ 无 git 基线，引用前请自行核对

根因为接口 PDF 路径位于 `data.plan.planDocSite`，旧码误读 `planUrl` 导致回退跳转方案页。于 `permitConstants.js` 新增 `resolvePlanDocUrl()` 顺序读取 `planDocSite`/`planUrl`，并供 `handleQueryPlan()` 与 `canQueryPlan` 调用；本地 404 需配 `vite.config.js` 的 `/zhi2-dev` 代理。

> 依据（摘）：src=苏州市房地产监测V3-rest/050.md

文件：`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/detail.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/PermitPlanPanel.vue`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/resolveServerAssetUrl.js`
---

### x3195 · 合同审批接口路径须为 flowable/task

⚪ 模式 ｜ 验证于 苏州市房地产监测V3-rest ｜ 无 git 基线，引用前请自行核对

于 `zhi2-web-admin/src/views/contract/utils/contractRequest.js` 中，将 `getFlowViewer` 与 `isApprovalAuth` 接口路径由 `/flowable/definition/*` 改为 `/flowable/task/*` 以匹配合同预售审批页 `/flowable/task/flowViewer` 路由。

> 依据（摘）：src=苏州市房地产监测V3-rest/093.md

文件：`d:/repository/苏州市房地产监测V3/路由信息.json`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/vite.config.js`、`d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/flowable/definition.js`
---

### x3331 · 苏周到扫码登录：三接口均为 POST，login 只在授权回调页调用

🟢 套路 ｜ 验证于 门户 ｜ 距代码最后改动（2026-10-27）6 天，大概率仍有效

门户 UnifiedLogin 接入苏周到时，后端契约为三个 **POST** 接口：`/v2.0/security/ctAuth/suzhouDao/getQrLoginParam`（返回 `qrCodeId`、`qrUrl`，其中 `pageUrl` 指向前端授权成功链路）、`/v2.0/security/ctAuth/suzhouDao/scanLogin?qrCodeId=...`（PC 端轮询，未扫码时 `accessToken` 为 null）、`/v2.0/security/ctAuth/suzhouDao/login`（入参 `{ code, qrCodeId }` 换登录态）。

**职责拆分（易踩坑）**：苏周到 H5 打开的是 `pageUrl` 上的 **授权回调页**（如 `/suzhou-dao/auth-callback?...&code=...`），在回调页 `created` → `submitAuth()` 里调用 `login`；仅当 `code == 200` 才 `replace` 到 **成功页**（如 `SuzhouDaoAuthSuccess.vue`）。成功页只做展示与「完成」关窗，**不得**再调 `login`。PC 主流程仍靠登录页轮询 `scanLogin` 拿 `accessToken`，与成功页无关。

落地时扫码 H5 与回调/成功页都放在当前 `zhi2-web-admin` 工程内，并核对 nginx/网关前缀与 env 一致。

> 依据（摘）：「对应的接口都是POST」「成功页…只负责展示 UI…不会再去调 login 接口」「login…是在上一页 授权回调页…created → submitAuth() 里调用的」「PC 端登录仍靠登录页轮询 scanLogin 拿 acce…

文件：`zhi2-web-admin/src/views/suzhouDao/SuzhouDaoAuthCallback.vue`、`zhi2-web-admin/src/views/suzhouDao/SuzhouDaoAuthSuccess.vue`、`zhi2-web-admin/src/views/home/UnifiedLogin.vue`
