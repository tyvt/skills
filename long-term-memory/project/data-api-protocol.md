# 接口与数据归一化 · 请求协议与加解密（项目专属）

绑定具体项目的组件、路径与业务约定，共 6 条。

## 泰兴小程序（5）

### m086 · 密码提交前必须 AES 加密：rawPassword cannot be null 的根因

🟢 踩坑 ｜ 验证于 泰兴 ｜ 距代码最后改动（2026-09-12）仅 1 天，大概率仍然有效

改密码报 `rawPassword cannot be null` 并非后端 bug，而是小程序把明文密码直接提交，后端 decrypt 失败得到 null，再交给 Spring Security 的 BCryptPasswordEncoder 加密就抛该错。服务端与登录接口一致要求密码先经 AES 加密再传输。修复方式：在 src/staff/pages/profile/change-password.vue 提交前对 oldPassword / newPassword 调用 src/staff/utils/passwordEncrypt.js 的 encryptPassword，与 src/staff/pages/login/index.vue 保持一致。可复用套路：任何新增的“密码类”接口（改密、重置、二次验证）都要先走 encryptPassword，不要直接传明文。

> 来源依据（摘）：报错 `rawPassword cannot be null` 来自 Spring Security 的 BCryptPasswordEncoder：后端在加密新密码时收到了 null。…小程序这边之前少了加密步骤，后端解密失败后就触发了该错误。…已在 src/staff/pag…

文件：`src/staff/pages/profile/change-password.vue`、`src/staff/utils/passwordEncrypt.js`、`src/staff/pages/login/index.vue`、`src/staff/api/security.js`

---

### m087 · 知识库接口参数约定：keyWord 大写 W、分类筛选用 categoryId

🔵 事实 ｜ 验证于 泰兴 ｜ 约定/偏好类知识，通常长期有效（记录于 2026-09-10）

分页接口 `/property/knowledgeBase/page` 的筛选参数是 `keyWord`（注意大写 W）与 `categoryId`，不是 `knowledgeCategoryId`。src/staff/api/knowledge.js 中 getKnowledgePage 默认注入 pageNum/pageSize/publishStatus:1，其余 params 透传，所以调用方直接传 keyWord、categoryId 即可。`knowledgeCategoryId` 只出现在响应体的分类字段里，从未作为请求参数使用。`/property/knowledgeBase/category/tree` 的注释虽写“支持按分类名称或关键字筛选”，但未标明参数名，且仓库内所有调用处均未传参——需要按分类/关键字过滤时不要臆造参数名，应以后端确认为准或复用 page 的 keyWord+categoryId。/property/workOrder/knowledge/search 是工单场景引用知识库的独立搜索接口。

> 来源依据（摘）：`knowledgeCategoryId` **从未作为请求参数**出现，仅用于解析**响应**中的分类字段。…请求参数：pageNum / pageSize（20）/ publishStatus 固定 1 / `keyWord` 关键字搜索（注意大写 W）/ `category…

文件：`src/staff/api/knowledge.js`、`src/staff/pages/knowledge/index.vue`、`src/staff/utils/knowledgeCategory.js`、`src/staff/pages_facility/issue/aiKnowledge.vue`

---

### m088 · 项目无 API 文档，接口参数唯一权威来源是 api 层与调用点

🟢 套路 ｜ 验证于 泰兴 ｜ 距代码最后改动（2026-09-12）仅 2 天，大概率仍然有效

泰兴小程序仓库内没有 Swagger/OpenAPI、mock 数据或独立 API 文档，所有接口定义与参数用法只能从 `src/**/api/*.js` 的封装和各页面实际调用反推。因此接新接口或排查“参数传错/字段为 undefined”时，先读对应 api 模块（如 src/staff/api/knowledge.js、src/api/maintenance.js、src/staff/api/maintenance.js），再看调用处的实参，并注意默认值（如 publishStatus: 1）与 `...params` 透传顺序；必要时用 git log -S "参数名" 追溯历史实现。标注为“支持某筛选”但未写参数名的注释不可当作可靠依据。

> 来源依据（摘）：仓库内**未发现** Swagger/OpenAPI、mock 数据或独立 API 文档文件。知识库相关接口定义与参数用法全部来自 `src/staff/api/knowledge.js` 及各页面的实际调用。…`/property/knowledgeBase/category/…

文件：`src/staff/api/knowledge.js`、`src/staff/api/index.js`、`src/api/maintenance.js`、`README.md`

---

### undefined · 删除接口约定：POST + 裸数组 body，不要包 { ids: [...] }

🟢 模式 ｜ 验证于 泰兴 ｜ 距代码最后改动（2026-10-25）2 天，大概率仍有效

什么情况：zhi2-web-admin 里各业务模块的删除/批量删除接口此前写法不统一（有的 DELETE、有的 POST 包一层对象），联调时后端只有一种可接受形态。

为什么：后端删除接口按「POST + 参数直接是 id 数组」实现，前端包成 { ids: [] } 或 { idList: [] } 时后端取不到参数，表现为删除无响应或 500，而请求本身不报错，极难定位。

怎么做：统一改为 post(url, ids) —— body 就是裸数组 [1,2,3]，不套对象；这是一次性全仓对齐的机械改动（本次一次修了 7 处：capital/albuild、capital/umbuild、capital/jhdetail、capital/usedtl、company/brand、finance/guarantee_building 等）。排查套路：全局搜 delete 关键字，用脚本（如 D:/jdk-sdk/check-delete-apis.mjs）比对每处 request 形态，改完用真实接口探针（probe-delete.mjs）逐个验证，不要只靠单测。同类改动单独开分支（fix/delete-api-align），避免与业务改动混在一个 commit。

> 来源依据（摘）：commit「98151e3f4 fix(api): 删除接口统一 POST + 裸数组 body（7 处）」，涉及 api/capital/albuild.js、umbuild.js、jhdetail.js、usedtl.js、company/brand.js、finance/…

文件：`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/capital/albuild.js`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/capital/umbuild.js`、`D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/api/company/brand.js`、`D:/jdk-sdk/check-delete-apis.mjs`

---

### undefined · V3 接口规范：只有 CRUD 接口是四段路径，业务接口一律三段

🟡 模式 ｜ 验证于 泰兴 ｜ 距代码最后改动 39 天，引用前请核对

本项目（苏州市房地产监测V3 / zhi2-web-admin）的接口路径段数规则：只有标准增删改查接口才带动作段构成四段（如 `/prefund/tradeDetail/detail`），其余业务接口一律三段（module + entity/action），不存在四段。批量做「V3 规范改造」时极易误伤：脚本只对 CRUD 接口补了 `/detail`、`/add`，却把非 CRUD 业务接口也一起补上，导致 `/getVendeeListByContractNo/detail`、`/queryBalanceAmount/detail`、`/openAccountRecord/detail`、`/startFlow/detail`、`/beProjectList/add` 这类错误路径。排查/修复套路：①全局扫描 `src/api` 目录里所有 URL 字符串，筛出四段路径；②逐条判断是否真 CRUD，非 CRUD 就删掉末尾的 `/detail` 或 `/add`，保留 module/entity 前缀与 body 参数不动；③与同项目的 `contractRequest.js`、`account.js` 以及页面内 `$post` 直调路径交叉比对，确认同一接口在各处写法一致；④V2 原生四段路径（如 `contractView/list`）与标准三段 CRUD 不要动。该轮一次性修复了 30 个 api 文件共 57 处，最终仅保留 `/system/dict/data/detail`、`/system/dict/type/detail` 两处真 CRUD。不确定的接口要先问用户再改。

> 来源依据（摘）：会话 d2a25c11：用户指出「只有增删改查接口有调整，剩下的接口都保持原样，不存在4段接口，都是三段的」，最终修复 57 处/30 文件，复检仅剩 dict data/type 两处四段路径。

文件：`zhi2-web-admin/src/api/presale/contractMainInfo.js`、`zhi2-web-admin/src/api/finance/vendee.js`、`zhi2-web-admin/src/api/finance/account.js`、`zhi2-web-admin/src/views/contract/utils/contractRequest.js`

---

## 苏州市房地产监测V3（1）

### undefined · [苏房] 请求拦截器把路径末段当 REST 动作：/presale/permit/cancel/page 被改写成 /presale/permit/cancel 导致 400

🟡 踩坑 ｜ 验证于 苏房V3 ｜ 距代码最后改动 45 天，引用前请核对

什么情况：V3 后台某些列表页请求 400、列表空白，而同类页面正常。为什么：问题不在页面拼的地址。apiV3Normalize.js 的 normalizeTrailingPathParams 会把路径倒数第二段当 REST 动作、末段当 id 移进请求体，于是 listMixins 拼出的 `POST /presale/permit/cancel/page` 被改写成 `/presale/permit/cancel` + body{id:'page'}，后端返回 400。permit/extend 不受影响，只因 extend 不在 REST_ACTIONS 名单里，只有 cancel 这类动作词命中，所以第一眼很容易误判成列表页 moduleName/apiMethod 拼错或权限问题。怎么做：在 normalizeTrailingPathParams 里加两道判断——末段已是标准动作（page/detail/list/save 等）时直接返回不清洗；「参数段」本身是 REST 动作名时不按路径参数处理。改完要回归两类 URL：`/presale/permit/cancel/page` 保持原样，`/flowable/process/cancel/12345` 仍规范成 cancel + id。排查此类问题先打印拦截器改写后的真实请求 URL，而不是页面里写的字面量。

> 来源依据（摘）：会话 f82e7cc4：用户指出「这个接口少了/page@zhi2-web-admin/src/views/presale/permitCancel/index.vue」；定位结论「index.vue 里通过 listMixins 拼出的地址本来就是对的：POST /presal…

文件：`zhi2-web-admin/src/utils/apiV3Normalize.js`、`zhi2-web-admin/src/mixins/table.js`、`zhi2-web-admin/src/mixins/listMixins.js`、`zhi2-web-admin/src/views/presale/permitCancel/index.vue`

---
