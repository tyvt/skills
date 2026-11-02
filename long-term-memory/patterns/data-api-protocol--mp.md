# 接口与数据归一化 · 请求协议与加解密 · 小程序

共 16 条。

其中 🔵 长期有效 2 条（排在最前，属必须遵守的约定）。

---

### x1701 · 苏服办门户首页轮播：pages/webview/home 用原生 swiper，banner 当前仅本地图不调接口

🔵 事实 ｜ 验证于 无锡市区小程序嵌入H5 ｜ 约定/偏好类，通常长期有效（记录于 2026-07-17）

应用入口与 Tab「首页」对应 `pages/webview/home`（pages.json 首项、custom-tabbar 指向该路径），轮播为页面内原生 `<swiper>`，**未**引用全项目零引用的 `components/ZsSwiper/ZsSwiper.vue`。

数据流：`banners` 默认 `resolveZhishuAsset('background@2x.jpg')`，`onLoad` 调 `usePortal` 的 `loadBanners(banners)`，其实现为 `banners.value = getPortalLocalBanners()`，**当前不请求后端 banner 接口**。`pages/index/home.vue`、`newHome.vue` 不是线上 Tab 首页轮播承载页。

若要接动态轮播，应在 webview/home 或 usePortal.loadBanners 接 API，勿误以为 ZsSwiper 或 index/home 已在用。

> 依据（摘）：会话 57231176 调查报告：明确 webview/home 为实际首页轮播、ZsSwiper 无引用、loadBanners→getPortalLocalBanners、当前首页轮播不调用任何 API。

文件：`zhi2-mobile-admin-h5-c-unlimited/src/pages/webview/home.vue`、`zhi2-mobile-admin-h5-c-unlimited/src/hooks/usePortal.js`、`zhi2-mobile-admin-h5-c-unlimited/src/components/ZsSwiper/ZsSwiper.vue`
---

### x2219 · 苏住房C 实名认证没有 /security/ctAuth/wechat/verify 请求：模拟器不支持人脸核身，该链路只能真机验证

🔵 事实 ｜ 验证于 苏住房C ｜ 约定/偏好类，通常长期有效（记录于 2026-08-25）

情况：提交实名认证后只看到 getRepeatByIdTypeAndIdNumber 返回 {hasRepeat:"0", phone:null}，随后弹「认证失败」，且完全没有 /security/ctAuth/wechat/verify 请求。

为什么：认证链路是 提交认证 → getRepeatByIdTypeAndIdNumber（校验是否重复）→ uni.startFacialRecognitionVerify（微信人脸核身）→ 只有 success 分支才 wx.login 再调 wechat/verify。开发者工具/模拟器不支持或无法完成人脸核身，直接走 fail 回调，所以 wechat/verify 永远发不出来，这不是前端代码或接口配置的问题。

怎么做：实名认证必须在真机微信小程序里验证（开发者工具 → 预览 → 手机扫码），再看 Network 是否出现 wechat/verify；H5 端则直接提示「请在微信小程序中进行实名认证」，同样不调该接口。排查此类「接口没发但也没有前端报错」的问题，先确认前置异步能力（人脸核身、授权、扫码等）在模拟器是否可用，再怀疑代码；遇到微信专有能力报 unexplained fail，优先换真机复测。

> 依据（摘）：会话 13ed1683 用户诉求「没有/security/ctAuth/wechat/verify 请求，是不是因为我在模拟器里面测试的原因？」；结论确认 startFacialRecognitionVerify 在模拟器走 fail 回调…

文件：`zhi2-mobile-shimin/src/api/security.js`、`zhi2-mobile-shimin/src/pages_my/verification/FormLocal.vue`、`zhi2-mobile-shimin/src/pages_my/verification/FormNonLocal.vue`
---

> ⚠️ 含项目专属引用，通用部分可直接用，具体路径需核对。

### m005 · 分类树带环对象写入响应式数据会导致 setData 崩溃并静默吞掉后续请求参数（知识库筛选不生效）

🟢 踩坑 ｜ 验证于 泰兴 ｜ 距代码最后改动（2026-09-12）仅 2 天，大概率仍然有效

症状：工作台-知识库点「筛选」选分类后确定，列表仍返回全量，表现为「筛选没反应」，且控制台可能只有一条 `TypeError: Converting circular structure to JSON`。

根因链：`src/staff/utils/knowledgeCategory.js` 的 `normalizeCategory(item, parent, top)` 给每个节点挂了反向指针 `parent`（父子反向链）和 `top`（指向顶级节点，顶层自指），构成**循环引用树**。`src/staff/pages/knowledge/index.vue` 的 `loadCategories` 把这棵环树直接塞进 `topCategories.value`，模板读取后 uni-app 对 setData payload 做 `JSON.stringify` 校验时抛错，**同步截断** `confirmFilter` 中后续的 `await loadKnowledge({ reset: true })`；而 `src/staff/api/index.js` 会静默删除值为 `undefined` 的参数，于是请求里 `categoryId` 恒为 undefined → 接口返回全量。

复现/自证方法：直接摘 `node_modules/@dcloudio/uni-mp-vue/dist/vue.runtime.esm.js` 中 `setResult` / `unwrapper` / `toTypeString` 相关段落，用 node 跑 `JSON.stringify(diff(...))` 即可复现抛错，无需真机。

修复套路（只改页面一个文件，不动共享 util，避免波及同样使用 normalizeCategory 的 `TransferKnowledgeDialog.vue`）：
1. `stripCircularRefs`：递归把 `parent`/`top` 置 null，只保留 children 单向链；写入 ref 前先 `.map(stripCircularRefs(...))`。
2. `snapshot`：只取 `{id, name}` 的扁平快照，用于回填 `activeCategory` / `activePath`。
3. `rebuildTopMap`：构建 `id → 顶级 {id, name}` 的**非响应式 Map**，绝不放入 setup 的响应式 data，`groupedKnowledge` 只查它。
4. `openFilter` 里用 `findCategory(topCategories, p.id)` 反查重建 draftPath；**不能用 `.slice()`** —— 浅拷贝节点引用不变，照样带环。
5. `confirmFilter` 不再调依赖 parent 反向链的 `buildPath`；模板字段从 `activeCategory.categoryName` 改为 `activeCategory.name`。

通用教训：任何会进入组件 data/模板的对象树，先在边界处剪掉反向指针；组件内需要查找表就用非响应式闭包变量，不要塞 ref。查找「参数为何丢失」时，先看页面是否在调接口前抛过异常（异常会截断同一 async 函数后续逻辑）。

> 依据（摘）：最终结论（会话 294e988e）：根因为 normalizeCategory 挂反向指针导致环；uni-app setData 走 JSON.stringify 抛 `TypeError: Converting circular stru…

文件：`src/staff/utils/knowledgeCategory.js`、`src/staff/pages/knowledge/index.vue`、`src/staff/api/index.js`
---

### m062 · Vue3 setup 中 ref 被同名局部变量遮蔽导致接口静默失败

🟡 踩坑 ｜ 验证于 泰兴 ｜ 距代码最后改动 22 天，属具体实现细节，引用前请核对

选举记录详情页显示「暂无数据」的根因：在 composable/页面的 getList 里写了 `const recordId = recordId.value`，局部变量同名遮蔽了对 ref 的访问；后续拼请求参数、调用接口时拿到的值是错的，接口未成功调用，`list` 一直为空，UI 只反映为空态「暂无数据」，不会报错。修复：局部变量改名（`currentRecordId`），并在按分组匹配候选人失败时增加「平铺展示选项」的回退逻辑。排查经验：uni-app/Vue3 页面出现「接口明明写了却没数据」时，先检查 setup 内是否有变量名与 ref/handler 同名遮蔽，而不是先怀疑后端或渲染层。

> 依据（摘）：会话最终结论第 1 节：「根因是 `getList` 里变量名冲突：`const recordId = recordId.value` // 局部变量遮蔽了 ref，导致请求失败 / 接口未成功调用，`list` 一直为空，页面就显示「暂无…

文件：`src/pages_owner/elect/ResultRecord.vue`、`src/pages_owner/elect/ResultDetail.vue`、`src/store/vote.js`
---

### m125 · 页面空白且无明显报错 → 先查 script setup 是否运行时崩了（漏 import ref / 变量遮蔽 TDZ）

🔴 踩坑 ｜ 验证于 泰兴 ｜ 距代码最后改动 103 天，属具体实现细节，强烈建议先核对代码

现象：详情页空白、接口一次都没发出去、控制台也没有明显报错。根因是 `<script setup>` 在运行时整体崩掉，后续的接口调用代码根本没执行到。两个典型原因：

1. **漏 import**：用了 `const id = ref('')` 但只从 vue 引入了 `reactive`，运行时报 `ReferenceError: ref is not defined`，整段 setup 失效；
2. **变量遮蔽 + TDZ**：`getDetail` 里写 `const id = id.value`，内层 `const id` 遮蔽外层 ref，在初始化前访问 `id.value` 抛错，函数执行中断，接口不调用。

排查套路：页面「空白 + 无请求 + 无报错」时不要在接口层找问题，先确认 setup 是否完整执行（import 是否齐全、有没有同名 const 遮蔽外层 ref）。修法：补齐 import、直接写 `getXxxDetail(id.value)` 并加 `if (!id.value) return` 防护，顺手删掉无用初始化代码。

> 依据（摘）：已修复。详情页空白是因为脚本在运行时就挂了，接口根本没机会发出去。原因 1：ref 未导入，第 70 行用了 const id = ref('')，但只从 vue 引入了 reactive，运行时 ReferenceError，<scrip…

文件：`src/pages_facility/detail.vue`、`src/api/maintenance.js`
---

### x1729 · H5 嵌入：initQqMapKeys 必须在 await initH5Context 之后，且无 token 不请求 getConfigKey

🔴 踩坑 ｜ 验证于 无锡市区小程序嵌入H5 ｜ 距代码最后改动 145 天，绑定具体实现，务必先核对代码

【现象】`getConfigKey`（拉 `qq.map.key`）明明走 `@/api` 拦截器，请求头却没有 `Authorization`。

【根因】小程序 web-view 嵌入 H5 时，URL token 由 `initH5Context` 写入 `userStore`；若 `App.vue` 在 `initQqMapKeys()` 早于 `await initH5Context(getH5Param)` 执行，拦截器里 `userStore.token` 仍为空。

【修复】1) 启动顺序：`await initH5Context` 后再 `initQqMapKeys()`；2) `qqMapKey.js` 无 token 时直接跳过 `getConfigKey`（小程序端从 storage 恢复 token 时一般不受影响）。

> 依据（摘）：会话 ef15cdae：用户要求 qqMapKey 接口携带 token；结论明确 initQqMapKeys 在 setToken 之前发起请求是根因，App.vue 调整顺序并在 qqMapKey 增加 token 校验。

文件：`zhi2-mobile-admin-h5-c-unlimited/src/App.vue`、`zhi2-mobile-admin-h5-c-unlimited/src/utils/qqMapKey.js`、`zhi2-mobile-admin-h5-c-unlimited/src/api/index.js`
---

### x2169 · uni-app 自定义 tab 组件同时写 v-model 与 @update:model-value，监听被覆盖导致切 tab 不请求接口

🔴 踩坑 ｜ 验证于 苏住房C ｜ 距代码最后改动 66 天，绑定具体实现，务必先核对代码

情况：苏找房页面（pages/index/components/Project_Suzhufang.vue）切换「推荐 / 新房 / 二手房」标签时 tab 高亮正常变化，但列表数据不刷新，也不发任何请求，控制台无报错，非常像「点了但没生效」。

为什么：模板里对 ProjectTabBar 同时写了 v-model 和 @update:model-value="tabChange"。uni-app 里 v-model 本身就会编译成 update:modelValue 监听并覆盖同名自定义监听，结果是 curTab 被 v-model 更新（所以高亮切换了）、tabChange 却从不执行，$refs.paging.reload() 自然也不会被调到，列表接口根本不重发。这类「UI 有反应、逻辑没跑」的现象不要先去怀疑接口或 z-paging。

怎么做：去掉 v-model，只保留 :model-value + @update:model-value="tabChange" 单一数据流；在 tabChange 里把新 tab 写入后才在 $nextTick 之后调 reload()，保证 curIndex 已更新再触发分页请求；同时删掉手动的 this.houseList = []，列表重置交给 z-paging 的 reload() 统一负责，避免自动重置与手动清空互相打架造成闪烁。修完应按 tab 分别核对请求：推荐 listRecommend、新房 pageByKeyWord、二手房 houseInfoDisplayList。

> 依据（摘）：会话 6e707628：用户报「苏找房页面切换tag没有调用接口」；定位到 Project_Suzhufang.vue 第 67 行 <ProjectTabBar :model-value="curTab" :tabs="tabList" …

文件：`zhi2-mobile-shimin/src/pages/index/components/Project_Suzhufang.vue`、`zhi2-mobile-shimin/src/pages/index/components/menu/ProjectTabBar.vue`、`zhi2-mobile-shimin/src/pages/index/project.vue`
---

### x2225 · redirect 中转页多个接口共用一个 loading：深度计数 + trackApi 包装（含 onUnload 清零）

🔴 模式 ｜ 验证于 苏住房C ｜ 距代码最后改动 170 天，绑定具体实现，务必先核对代码

情况：小程序 pages/redirect/index.vue（扫码/分享入口中转页）里 onLoad 会并发发起多个互不相关的接口（getUserInfo、listComplexCommunitySubdistrictByToken、getTokenV1、埋点 eventDataAdd），用户要求「全页只有一个 loading，不要反复开关」。为什么：uni.showLoading/hideLoading 是全局单例计数，多个接口各自 show/hide 时，先返回的接口会 hideLoading 掉别人还没完成的 loading，界面出现闪烁；而原 lanch() 自带 showLoading，在埋点请求未完成时就 hideLoading，属于同一类误关。怎么做：在页面实例上维护 _apiLoadingDepth，封装 _beginApiLoading/_endApiLoading（0→1 才 showLoading，回到 0 才 hideLoading），再封装 trackApi(promise)：非 Promise 直接 Promise.resolve 透传，否则 begin 后用 .finally(end) 保证成功失败都关；所有接口调用一律包 this.trackApi(...)，埋点再包一层 eventDataAddWithLoading 复用同一计数；onUnload 时循环 end 直到深度归 0，避免离开页面后 loading 残留。该套路可直接搬到任何「一屏多请求」的中转/聚合页，新增接口只需包一层 trackApi 即自动接入。

> 依据（摘）：会话 3446b277（基线 97a1f31）：用户要求「这个页面的所有接口调用都需要加 loading，但是保证一个 loading，不要多次打开和关闭」；最终实现 _apiLoadingDepth + trackApi + onUnlo…

文件：`zhi2-mobile-shimin/src/pages/redirect/index.vue`、`zhi2-mobile-shimin/src/store/user.js`、`zhi2-mobile-shimin/src/api/appAnalytics.js`
---

### x0227 · 登录页 token 写死为 1 致请求假参

⚪ 模式 ｜ 验证于 iHome2.0小程序 ｜ 无 git 基线，引用前请自行核对

src/pages/login/index.vue 硬编码 token=1（100行）拼入 URL（31行），且 doLogin(token: string) 传数字、uni.getStorageSync('urlToken') 被注释，致请求携带假 token。删除测试赋值，恢复真实 token 读取并转字符串传给 doLogin。

> 依据（摘）：extracted source=cursor session=e6a6d0c0-4d4e-4d14-9183-9c91662e8402

文件：`D:/repository/iHome2.0小程序/src/pages/login/index.vue`、`src/pages/login/index.vue`
---

### x1358 · [无锡H5] webview 首页维修资金/业主决策接口要带门户 auth 且 toast 展示后端 msg

⚪ 模式 ｜ 验证于 小程序 ｜ 无 git 基线，引用前请自行核对

`pages/webview/home.vue` 调维修资金、业主决策等前置接口时，请求头 **auth** 必须与 `pages/user/index/index.vue` 一致的门户 Token，不要用全局旧 token。

失败提示：在 `utils/portal-h5-webview.js` 用 `extractMaintenanceApiErrorMessage` 从 `Error`、响应体 `msg`/`message`、`errMsg` 提取文案；HTTP 非 200 优先 body 中的 `msg`/`message`，页面侧 `showApiErrorToast(error, fallback)` 统一 `uni.showToast`。**401 时返回空串**，避免与门户「登录已过期」类全局提示重复弹两次。

> 依据（摘）：会话 9b72f418：维修资金接口加 auth；extractMaintenanceApiErrorMessage + home.vue showApiErrorToast；示例 code 500 msg 房屋信息不存在 直接 toast…

文件：`d:/repository/小程序/wygl-wxxcx-dev-slh/pages/webview/home.vue`、`d:/repository/小程序/wygl-wxxcx-dev-slh/utils/portal-h5-webview.js`
---

### x1408 · H5接口请求响应未打印console日志

⚪ 踩坑 ｜ 验证于 小程序 ｜ 无 git 基线，引用前请自行核对

portal-h5-webview.js新增requestCtAuthWithLog包装器，为fetchExternalMaintenanceH5Url的getToken、getH5Url请求打印url、method、header、data及响应statusCode、data。

> 依据（摘）：extracted source=cursor session=57f4069f-fd57-4bea-aab1-45b00ad189d9

文件：`d:/repository/小程序/wygl-wxxcx-dev-slh/utils/portal-h5-webview.js`、`d:/repository/小程序/wygl-wxxcx-dev-slh/utils/portal-user.js`、`portal-h5-webview.js`
---

### x1496 · 资产公示页onShow并行请求3接口

⚪ 踩坑 ｜ 验证于 惠山二期H5 ｜ 无 git 基线，引用前请自行核对

`assetsPublicity/index.vue` 于 `onShow` 通过 `loadData` 并行请求 `getProjectAssetInfo` 等 3 接口，根因系请求置于展示钩子导致重复调用。应将该初始化请求移至 `onLoad` 以避免冗余。

> 依据（摘）：extracted source=cursor session=b66b1ff3-1bf8-4446-8866-c444e2bc6f43

文件：`d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/assetsPublicity/index.vue`、`d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/api/benefit.js`、`d:/repository/惠山二期H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_property/serviceStandard/index.vue`
---

### x1753 · 苏服办token仅用于SDK换票禁加请求头

⚪ 偏好 ｜ 验证于 无锡市区小程序嵌入H5 ｜ 无 git 基线，引用前请自行核对

苏服办入口 URL 的 `token` 仅用于 SDK 与登录换票，误写入 `userStore` 导致 `api/index.js` 拦截器统一添加 `Authorization` 头至业务接口。关键修改为 `api/index.js` 拦截器判断苏服办入口不添加头、`h5Context.js` 新增 `clearSfbTokenIfStored()` 清除误存 token、`usePortal.js` 初始化清 token 并走 `sfbLogin` 换内部 `accessToken`、`sfbFaceAuth.js` 人脸仅用 URL token。

> 依据（摘）：src=无锡市区小程序嵌入H5/013.md

文件：`d:/repository/无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/utils/h5Context.js`、`d:/repository/无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/api/index.js`、`d:/repository/无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/hooks/usePortal.js`
---

### x1816 · H5持decisionId直调详情接口

⚪ 事实 ｜ 验证于 昆山市民 ｜ 无 git 基线，引用前请自行核对

H5 环境 `src/pages_vote/vote/votedetail.vue` 存在 `decisionId` 时直接 `loadVoteDetail` 且不走 `loginWithWxCode`，token 由首页缓存经拦截器附加 Authorization；小程序端保留先登录后加载，实名检查仍依赖 `getDecisionDetail` 传参。

> 依据（摘）：extracted source=cursor session=1d9b7d53-d5cd-4b5c-87e0-c3804303cc41

文件：`d:/repository/昆山市民/src/pages.json`、`d:/repository/昆山市民/src/pages_vote/vote/votedetail.vue`、`d:/repository/昆山市民/src/pages_vote/vote/components/DetailTop.vue`
---

### x1819 · tabDisabled 与生命周期错位致不请求

⚪ 偏好 ｜ 验证于 昆山市民 ｜ 无 git 基线，引用前请自行核对

`tabDisabled` 在请求中返回使切换 tab 不调 `refresh()`；`useLoadMore(getList)` 先于 `getList` 定义；进入页仅依赖 `onShow`。移除 `tabDisabled` 拦截，前置 `getList` 定义，于 `onLoad` 调 `refresh()`，并在 `getList` 记录请求 `tab` 防数据覆盖。

> 依据（摘）：extracted source=cursor session=5d15f726-65f1-4f6a-b8a9-728d78cb3933

文件：`d:/repository/昆山市民/src/pages_examine/examineList.vue`、`d:/repository/昆山市民/src/hooks/useLoadMore.js`、`d:/repository/昆山市民/src/pages_contract/list.vue`
---

### x1822 · wxLogin 并发互打断致请求中止

⚪ 偏好 ｜ 验证于 昆山市民 ｜ 无 git 基线，引用前请自行核对

`src/utils/wxLogin.js` 中 `getInfoByCode` 接口报 `MiniProgramError: Request aborted`，属微信登录请求被中途取消。最常见原因为重复触发登录流程，并发请求互相打断。

> 依据（摘）：extracted source=cursor session=abc57820-2b35-4849-8e23-0d665121c69f

文件：`d:/repository/昆山市民/src/utils/wxLogin.js`、`d:/repository/昆山市民/src/api/modules/estate.js`、`d:/repository/昆山市民/src/request/index.js`
---
