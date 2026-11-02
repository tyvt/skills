# 路由与跳转 · 小程序（第 3/3 部分）

共 13 条，本文件是其中一部分；同类其它条目见本主题的其它分片。

其中 🔵 长期有效 0 条（排在最前，属必须遵守的约定）。

---

### x2281 · tabBar.js缺onTabPageShow致异常

⚪ 踩坑 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

根因：依赖文件 src/utils/tabBar.js 未支持 onTabPageShow 生命周期。修复：在解决 git 合并冲突时为该文件补全 onTabPageShow 逻辑以支持标签页显示。

> 依据（摘）：src=苏住房C/037.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/home.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/my.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/community.vue`
---

### x2291 · 分包脚本复制z-paging未更新依赖路径

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

根因：`relocate-z-paging.mjs`复制`z-paging`到分包后未更新其`require('../../../../common/vendor.js')`路径，错误指向分包内不存在的文件。修复点：更新`scripts/relocate-z-paging.mjs`，复制后遍历分包内`z-paging`的`.js`文件，动态修正`common/vendor.js`的require路径为主包路径，支持对已构建产物重新修补。

> 依据（摘）：src=苏住房C/043.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json`、`d:/repository/苏住房C/zhi2-mobile-shimin/package.json`、`d:/repository/苏住房C/zhi2-mobile-shimin/scripts/relocate-z-paging.mjs`
---

### x2298 · 分包空态图不可沿用主包路径否则资源加载失败

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

`empty.png` 等空态图从 `src/static/images/` 迁至各分包，代码仍用 `images/empty.png` 导致 `resolveStaticUrl` 错误解析至缺失的主包路径而报 500。`src/utils/index.js` 增加 `SUBPACKAGE_STATIC_IMAGES` 映射（对齐 `scripts/migrate-main-empty-static.mjs`）并更新 `resolveStaticUrl` 以正确寻址分包资源。

> 依据（摘）：src=苏住房C/048.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsEmpty/ZsEmpty.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/package.json`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsImage/ZsImage.vue`
---

### x2304 · 分包组件不可跨分包引用否则加载失败

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

微信小程序分包组件不可跨分包引用，`Home_Jiayuanqu`(分包`pages_tab`)内引用原分包`pages_main`的`NoticeList`导致报错。将`NoticeList`移至主包`src/components/NoticeList/NoticeList.vue`，`pages_tab/components/Home_Jiayuanqu.vue`等引用路径统一为`@/components/NoticeList/NoticeList.vue`并删除原路径。

> 依据（摘）：src=苏住房C/052.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/components/Home_Jiayuanqu.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/PageBg/PageBg.vue`
---

> ⚠️ 含项目专属引用，通用部分可直接用，具体路径需核对。

### x2313 · 分包页面不可跨分包引用组件否则报错

⚪ 偏好 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

微信小程序分包页面直接引用其他分包组件（如 `pages_my/onlineService/index` 引用 `pages_main/news/components/ListIndex`）导致组件找不到。将 `ListIndex` 与 `ListDetail` 抽离至主包 `src/components/article/` 目录，并同步更新 `pages_my`、`pages_main`、`pages_owner`、`pages_transaction` 下 6 个 Vue 文件的引用路径。

> 依据（摘）：src=苏住房C/057.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_my/onlineService/index.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_main/news/components/ListIndex.vue`
---

### x2323 · 登录页分包迁移后旧路径跳转致页面不存在

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

pages/login迁至pages_main/login且pages.json注册新路径，但多处代码仍跳旧路径/pages/login/index报page not found。统一改为/pages_main/login/index包括src/utils/index.js等文件。

> 依据（摘）：src=苏住房C/062.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json`、`d:/repository/苏住房C/zhi2-mobile-shimin/scripts/migrate-pages-tab.mjs`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/login/index.vue`
---

### x2325 · 苏找房TabBar混用v-model致接口未请求

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

`Project_Suzhufang.vue` 中 `ProjectTabBar` 同用 `v-model` 与 `@update:model-value`，uni-app 的 `v-model` 绑定 `update:modelValue` 覆盖自定义事件，致 `tabChange` 不执行、分页接口未请求。移除 `v-model` 仅保留 `:model-value` 与事件，并在 `$nextTick` 后调用 `reload()` 重载。

> 依据（摘）：src=苏住房C/063.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_tab/components/Project_Suzhufang.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/components/Project_Suzhufang.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/project.vue`
---

### x2339 · 分包页面迁移后菜单路由未更新致找不到

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

`houseMap` 迁至 `pages_main` 分包（`pages.json` 配置 `pages_main/houseMap/houseMap`），但 `menuRouteMap.js` 菜单路由仍指向旧路径 `/pages/houseMap/houseMap` 致页面找不到。`menuRouteMap.js` 菜单码 `1_4_5` 改为 `/pages_main/houseMap/houseMap?type=0`，`stockHouse/index.vue` 入口改为 `/pages_main/houseMap/houseMap?type=1`；`menuRouteMap.js` 残留旧 `/pages/` 前缀路径需同方式改为 `pages_main` 分包路径。

> 依据（摘）：src=苏住房C/074.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/menuRouteMap.js`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/route-map.js`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json`
---

### x2340 · 分包页面未注册pages.json路由致找不到

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

`pages_my/setting/userInfo` 的 Vue 文件存在，但未在 `pages.json` 的 `pages_my` 分包中注册路由，导致小程序报 `page not found`。在 `pages.json` 补充注册 `setting/userInfo`（标题「个人信息」）与 `setting/realInfo`（标题「实名信息」）路由。

> 依据（摘）：src=苏住房C/074.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/components/My_Suzhufang.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_my/setting/userInfo.vue`
---

### x2343 · 新闻详情迁分包后首页跳旧路径致报错

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

新闻详情页迁至 `pages_main/news/detail` 分包，但 `Home_Suzhufang.vue` 的 `goNewsDetail` 仍跳转 `pages.json` 未定义的 `/pages/news/detail` 引发 MiniProgramError。`Home_Suzhufang.vue` 改用 `route-map.js` 的 `PAGES.news.detail()` 生成正确路径；`menuRouteMap.js` 同步更新 `3_1_10`、`3_1_16` 等菜单路由至 `pages_main` 分包。

> 依据（摘）：src=苏住房C/075.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/route-map.js`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/components/Home_Suzhufang.vue`
---

### x2348 · pages.json未注册登录路由致跳转报错

⚪ 踩坑 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

根因：`pages.json` 中登录路由（如 `/pages/login/index`）被 commit `61febf6` 移除，但代码仍 `navigateTo` 跳转致 `page is not found`。修复：在 `pages.json` 恢复注册 `pages/login/index`、`forget`、`password`、`success` 四个页面。

> 依据（摘）：src=苏住房C/079.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/login/index.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json`、`pages.json`
---

### x2353 · 微信小程序无sessionStorage致跳转异常

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

微信小程序无 `sessionStorage`，`pages_transaction/intention/list` 复用 `my.vue` 时 `viewItem` 误用浏览器 API 致跳转异常。修改 `my.vue` 的 `viewItem` 用 `uni.setStorageSync`，`detail.vue` 读取改 `uni.getStorageSync` 并增 `|| '{}'` 防空值报错。

> 依据（摘）：src=苏住房C/081.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/intention/my.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/intention/detail.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/intention/list.vue`
---

### x2425 · 分包不可跨包引用组件需复制本包

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

微信小程序分包不可跨包引用组件，`pages_vote` 不能直接 import `pages_main` 下 `FileList`。复制 `FileList` 至 `pages_vote/components/FileList/`，并修改 `detail.vue` 引用路径为 `@/pages_vote/components/FileList/FileList.vue`。

> 依据（摘）：extracted source=cursor session=8542b614-0e61-4726-828c-c9829d260de1

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_vote/elect/detail.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_vote/decision/components/BackBtn.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/index.js`
---
