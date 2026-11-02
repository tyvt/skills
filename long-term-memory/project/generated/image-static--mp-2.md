# 项目专属 · 图片与静态资源（2/2）

共 11 条，引用前核对所属项目及代码。

### x2115 · ZsImage 分包静态资源 500：resolveStaticUrl 按页面路由推断分包 + 主包清单优先级

🔴 踩坑 ｜ 验证于 苏住房C ｜ 距代码最后改动 61 天，绑定具体实现，务必先核对代码

什么情况：苏住房C 小程序（uni-app + ZsImage）多个页面刷屏「Failed to load local image resource … 500」，路径形如 /pages_owner_extra/static/images/owner_nav_1.png、/pages_transaction/static/images/szf/soldOut-shadow.png、/pages_main/static/images/play.png。
为什么：ZsImage 默认 local=true，由 resolveStaticUrl 按「当前页面路由所在分包」推断静态目录；图片实际在别的分包或主包 src/static/images 下，推断出的目录里没有文件，微信开发者工具就返回 500。同一页里若有的图显式传了 subpackage 就正常，漏传的就全挂——表现为「同页图有的显示有的不显示」。
怎么做：①新增 src/utils/mainStaticPaths.js 维护主包 static 资源路径清单，resolveStaticUrl 命中清单时优先走主包 /static/，不再被分包路由推断覆盖；②「跨分包引用」的图必须显式传 subpackage="pages_owner" 之类的目标分包名；③后续新增主包静态图要同步补进 mainStaticPaths.js，或改成生成脚本产出，否则同样的 500 会复发。
注意：resolveStaticUrl / subpackage / mainStaticPaths 属 shimin 端实现，同源于 C 的其它项目需先核对是否有同名机制。

> 依据（摘）：会话 5c003f25：ownerCard 页导航图标与箭头 500，根因是 ZsImage default local 按当前路由推断分包；补 subpackage="pages_owner" 后恢复。会话 b6ae18fa：play.p…

文件：`d:\repository\苏住房C\zhi2-mobile-shimin\src\components\ZsImage\ZsImage.vue`、`d:\repository\苏住房C\zhi2-mobile-shimin\src\utils\index.js`、`d:\repository\苏住房C\zhi2-mobile-shimin\src\utils\mainStaticPaths.js`
---

### x2138 · [苏房C] ZsImage 的 subpackage 属性传错分包会让图标静默不显示；分包页面必须指向图片实际所在的分包

🟡 踩坑 ｜ 验证于 苏住房C ｜ 距代码最后改动 60 天，引用前请核对

现象：pages_transaction/publishHouse/type.vue 里的问号图标不显示，微信报本地图片资源加载失败。

根因：图片走 ZsImage，属性 subpackage="pages_transaction"，但该图标资源实际在 pages_owner 分包下。小程序分包之间不能跨包取静态资源，subpackage 指错时编译期不报错，只是资源路径解析失败——属于「静默失败」类问题。

做法：subpackage 必须填写图片真实所在的分包名（本例去掉错误值后从 pages_owner 正确加载）。资源放在哪个分包，调用方就只能声明那个分包，或者把常用图标上提到主包 src/static。

排查顺序：图标/图片不显示 → 先确认 ZsImage 的 src 路径与 subpackage 是否属于同一个分包 → 再看资源是否真的存在于该分包 static 目录。不要先怀疑样式（宽高/display）。

同批还做了两处纯样式微调（权证类型最后一项补 border-bottom；下一步按钮 margin-top 改 40px），无复用价值，不单独提炼。

> 依据（摘）：会话 cf1f68c5，基线 f1939b0。type.vue 的问号图标未显示，原因是 subpackage="pages_transaction" 指向错误分包路径，去掉该属性后从 pages_owner 分包正确加载。

文件：`src/pages_transaction/publishHouse/type.vue`、`src/components/ZsImage/ZsImage.vue`、`src/utils/index.js`
---

### x2142 · 小程序 static 路径解析不能只按「当前页面路由」推断分包：images/szf 散落在 5+ 个分包，须按文件名映射

🔴 踩坑 ｜ 验证于 苏住房C ｜ 距代码最后改动 63 天，绑定具体实现，务必先核对代码

什么情况：map 找房页调 resolveStaticUrl 解析 images/szf/default.png 时，小程序报 [渲染层网络层错误] Failed to load local image resource /pages_main/static/images/szf/default.png，HTTP 500；但该文件实际在 pages_transaction/static/images/szf/ 下。

为什么：resolveSubpackageForStatic 的兜底是 inferSubpackageFromRoute（取 getCurrentPages 最后一页路由首段当分包根）。images/szf/ 下的资源分散存放——pages_main 8 个、pages_owner 22 个、pages_vote 2 个、pages_transaction 67 个，所以同一张图在不同页面会被推断到不同分包；页面一旦跨分包引用就必然指到不存在路径，小程序对本地静态资源不存在返回 500 而不是 404，容易误判成服务端问题。

怎么做：对「多分包共存」的图片目录用显式文件名 → 分包映射表打底，而不是靠路由猜：utils/index.js 中 PAGES_MAIN_SZF_FILES / PAGES_VOTE_SZF_FILES / PAGES_OWNER_SZF_FILES 三个 Set + resolveSzfImageSubpackage()，未命中默认落 pages_transaction；MAIN_STATIC_PATHS 收口主包专属路径。新增图片时先确认它落在哪个分包目录，再决定是否补进映射表；组件侧（如 collectBtn）未显式传 subpackage 时的默认值也要与映射表一致。

> 依据（摘）：会话 7f47849c：报错 Failed to load local image resource /pages_main/static/images/szf/aixin_g.png 与 default.png，状态 500，而文件实际在…

文件：`zhi2-mobile-shimin/src/utils/index.js`、`zhi2-mobile-shimin/src/utils/mainStaticPaths.js`、`zhi2-mobile-shimin/src/pages_main/houseMap/houseMap.vue`
---

### x2258 · 分包静态资源跨包访问致真机图片404

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

`pages_owner` 分包页面跨包引用 `pages_transaction` 分包 `static` 目录图片（如 `Bg-szf.png`、`icon-owner.svg`），真机未加载交易分包时触发 404 不显示。将图片复制至 `pages_owner/static/images/szf/` 并修正 `src/utils/index.js` 内的路径引用。

> 依据（摘）：src=苏住房C/026.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/house/index.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/house/components/TitleCard.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/house/components/HalfCard.vue`
---

### x2278 · 未指定分包的共享静态资源跨包加载失败

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

`Tips.vue` 引用 `icon/tip-szf.png` 未指定 `subpackage`，`resolveStaticUrl` 依据 `pages_vote` 下页面路由推断分包路径为 `/pages_vote/static/icon/tip-szf.png` 导致 500。将 `icon/tip-szf.png` 加入 `src/utils/mainStaticPaths.js` 的 `MAIN_STATIC_PATHS` 集合，强制解析为 `/static/icon/tip-szf.png`。

> 依据（摘）：src=苏住房C/035.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json`、`d:/repository/苏住房C/zhi2-mobile-shimin/scripts/fix-relative-static-paths.mjs`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsImage/ZsImage.vue`
---

### x2285 · 分包静态资源跨包访问致渲染层加载失败

⚪ 模式 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

pages_benefit 分包中 11 处静态资源跨包访问触发渲染层网络层 Failed to load 错误。静态资源引用须收敛至本分包内或提至公共目录以避免跨包限制。

> 依据（摘）：src=苏住房C/039.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsEmpty/ZsEmpty.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsImage/ZsImage.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/index.js`
---

### x2300 · 主包图片因分包路径推断错误加载失败

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

resolveStaticUrl 按分包路由推断主包 src/static/images/ 图片路径，致文件缺失报500。新增 src/utils/mainStaticPaths.js 清单并调整该函数优先走主包 /static/，修正 pages_owner 引用。

> 依据（摘）：src=苏住房C/049.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/index.js`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/commonNew/swiperComponent.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/collectBtn/collectBtn.vue`
---

### x2311 · 静态图片按路由推断分包致跨包加载失败

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

`resolveStaticUrl` 按当前页面路由推断 `images/szf/*` 分包，在 `pages_main/houseMap` 误解析至 `pages_main/static` 致 500。于 `src/utils/index.js` 改为按文件名映射至正确分包（如 `pages_transaction`）。

> 依据（摘）：src=苏住房C/056.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_main/houseMap/houseMap.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsImage/ZsImage.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/index.js`
---

### x2328 · 小程序URL拼接replace破坏协议头致下载失败

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

`contracts.vue` 经 `Type2.vue` 调用 `filePreview` 时，原 `${BASE_URL}${url}`.replace(/\/\//g, "/") 拼接逻辑全局替换双斜杠，将 `https://` 协议头破坏为 `https:/` 导致 `downloadFile` 报 `invalid url`。改用 `zhi2-mobile-shimin/src/utils/index.js` 中的 `resolveMediaUrl` 按前缀拼接 `IMAGE_BASE`/`IMAGE_BASE_V1` 域名。

> 依据（摘）：src=苏住房C/065.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/index.js`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/company/info/contracts.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/components/FileList/FileList.vue`
---

### x2429 · 筛选弹窗重复data致图标丢失

⚪ 踩坑 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

`conditionScreening.vue` 重复 `data()` 覆盖致 `resetIcon` 丢失且引用 `reset.png` 不存在；部分页面间距不符设计。移除重复 `data()`，改用 `ZsImage` 加载 `images/szf/reset.svg` 并 footer 改 flex；多个 `newHouse` 页面 `.page-top`/`.house-list` padding 改 12px；两智一全页面搜索框间距 20px、图片加圆角等。

> 依据（摘）：extracted source=cursor session=efe288e0-e72c-42af-848b-9bb1cbfc98d8

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/newHouse/index.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/newHouse/indexMore.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/newHouse/houseTypeList.vue`
---

### x2435 · ZsImage未指定subpackage致跨包图标加载失

⚪ 踩坑 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

根因为 `ZsImage` 未指定 `subpackage` 时默认跨包读取 `pages_owner` 的 `yiwen.png` 导致不显示。关键修复为在 `pages_transaction/publishHouse/type.vue` 指定 `subpackage="pages_transaction"`、设 `tip-img` 宽高 `28rpx`、引入 `form2.scss` 补分割线，并将按钮 `margin-top` 调为 `160rpx`。

> 依据（摘）：extracted source=cursor session=0a834aef-a81b-437e-98de-264832c5f82e

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/publishHouse/type.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/house/owner/authentication.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsImage/ZsImage.vue`
