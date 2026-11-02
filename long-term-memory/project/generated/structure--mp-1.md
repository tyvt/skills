# 项目专属 · 工程结构与约定（1/1）

共 10 条，引用前核对所属项目及代码。

### m009 · 项目架构约定：业主端 / staff 手持端双端目录结构，工具函数改动要评估跨端复用面

🟢 模式 ｜ 验证于 泰兴 ｜ 距代码最后改动（2026-09-12）仅 2 天，大概率仍然有效

泰兴小程序源码在 `src/`，是**业主端 + staff 手持端双端并存**的单仓库单小程序：

- 业主端页面：`src/pages/**`、`src/pages_owner/**`、`src/pages_property/**`、`src/pages_poll/**`、`src/pages-suggest/**` 等。
- staff 手持端页面：`src/staff/pages/**`（如 workbench 工作台、knowledge 知识库）、`src/staff/pages_facility/**`（巡检 record、issue 等，含自己的 components 子目录）。
- 双端各自可能有一份公共组件拷贝，例如 `src/components/ZsDatePicker/` 与 `src/staff/components/ZsDatePicker/`——**后者是未使用的重复实现，已删除**；新增组件一律放 `src/components/`。
- 公共组件库为自有 `Zs*` 前缀：ZsDialog、ZsPopup、ZsPicker、ZsDatePicker、ZsImage、ZsBottomPopup（底部弹层基座）等，另有 ComplexPicker、ProjectPicker、FilterPopup、PaymentChannelPopup、TransferKnowledgeDialog。
- 接口层：`src/staff/api/*.js`（knowledge、property 等）+ `src/staff/api/index.js` 聚合层；**聚合层会静默剔除值为 `undefined` 的参数**，所以参数名写错或值为空时接口会「安静地返回全量」，排查时必须先确认请求里参数真的带上去了。
- 工具函数：`src/staff/utils/*.js`（如 knowledgeCategory.js）。修改这类**被多页面共享**的 util 前先 grep 调用方；若改动会影响其他模块（如 TransferKnowledgeDialog.vue），优先把适配写在单个页面里而不是改公共函数。
- 静态资源：`src/static/` 由 `ZsImage.buildStaticUrl` 按需补 `static/` 前缀；`static/` 下资源不做自动裁剪，仅用 `scripts/findUnUseImages.mjs` 做未引用扫描；页面路由注册在 `src/pages.json`（调整分包会影响静态资源路径解析）。

> 依据（摘）：各会话涉及文件路径显示双端结构（src/pages/**、src/pages_owner/**、src/pages_property/**、src/staff/pages/**、src/staff/pages_facility/**）；会话…

文件：`src/pages.json`、`src/staff/api/index.js`、`src/staff/utils/knowledgeCategory.js`
---

### x1678 · 无锡 H5 子模块 dev_wuxi-sfb 与 dev_shiqu 的功能同步方式

🔴 套路 ｜ 验证于 无锡市区小程序嵌入H5 ｜ 距代码最后改动 88 天，绑定具体实现，务必先核对代码

仓库 `无锡市区小程序嵌入H5` 的业务代码在子模块 `zhi2-mobile-admin-h5-c-unlimited` 内，至少两条并行分支：`dev_wuxi-sfb`（苏服办/嵌入场景）与 `dev_shiqu`（市区交付）。市区需求在 sfb 分支开发后，同步到 shiqu 常用两种方式：① 整分支 `git merge dev_wuxi-sfb`（可能带入同期苏服办、人脸等改动）；② 单功能 `cherry-pick` 指定提交到 `dev_shiqu` 再 `git push`。

父仓若在 `main-sfb`，**不会自动更新**子模块指针；仅子模块远程 `dev_shiqu` 更新时，需另行在父仓提交子模块引用才算父仓同步。

> 依据（摘）：会话 9626bae5、73334c2d：维修资金与物业公司功能均通过 merge 或 cherry-pick 到 dev_shiqu 并推送；说明合并 dev_wuxi-sfb 含非单一需求的同期改动，父仓 main-sfb 未含 dev…

文件：`zhi2-mobile-admin-h5-c-unlimited`
---

### x1717 · [无锡H5] 主仓 -sfb 与子模块 dev_wuxi-sfb 成对同步：双分支提交、推远端、按 YYYYMMDDHHmm 打 tag

🔴 套路 ｜ 验证于 无锡市区小程序嵌入H5 ｜ 距代码最后改动 74 天，绑定具体实现，务必先核对代码

情况：无锡市区小程序嵌入 H5 为 superproject + 子模块 zhi2-mobile-admin-h5-c-unlimited；dev-shiqu/main 与 dev_wuxi-sfb/main-sfb 成对关联，功能改动（如移除 appStore 字典缓存：common.js getDict 直请求、app.js 删 dictList/hasDict/setDict）需两边同步。
怎么做：子模块分别在 dev_wuxi-sfb、dev_shiqu 提交并 push；主仓分别在 main-sfb、main 更新子模块指针并 push。Tag 保持原格式：子模块 `YYYYMMDDHHmm`（如 202608130950），主仓 main 同号、main-sfb 加后缀 `-sfb`（如 202608130950-sfb）。改完确认工作区干净、当前分支回到日常开发分支（如 main-sfb/dev_wuxi-sfb）。移除字典缓存后若文案仍旧，提示清浏览器缓存。

> 依据（摘）：会话 378a4abe：「当前主子模块是关联的，-sfb结尾。dev-shiqu和main分支关联的。同步修改，移除字典缓存逻辑。提交推送代码，分别打tag」；表格列出 ab59965/f06fbf6 与 202608130950 系列 t…

文件：`zhi2-mobile-admin-h5-c-unlimited/src/api/common.js`、`zhi2-mobile-admin-h5-c-unlimited/src/store/app.js`、`.gitmodules`
---

### x1741 · 跨分支改动须同步dev-shiqu并打tag

⚪ 偏好 ｜ 验证于 无锡市区小程序嵌入H5 ｜ 无 git 基线，引用前请自行核对

子模块 `zhi2-mobile-admin-h5-c-unlimited` 的 `dev_wuxi-sfb` 提交 `fb8019a` 须 cherry-pick 至 `dev_shiqu` 生成 `725d15f`。主仓库 `zhi2-mobile-shimin-h5-c-unlimited` 的 `main-sfb` 与 `main` 分别指向对应子模块提交并打 tag `202608131440-sfb` 与 `202608131440`，`main-sfb` 子模块指向须修正为 `fb8019a`。

> 依据（摘）：src=无锡市区小程序嵌入H5/007.md

文件：`d:/repository/无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/api/repair.js`、`d:/repository/无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/fundPublicity/index.vue`、`d:/repository/无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/fundPublicity/components/headerCard.vue`
---

### x1744 · 维修资金详情修复须同步dev-shiqu及父引用

⚪ 踩坑 ｜ 验证于 无锡市区小程序嵌入H5 ｜ 无 git 基线，引用前请自行核对

维修资金交易详情项目信息不显示修复提交于dev_wuxi-sfb(7866125)。子模块zhi2-mobile-admin-h5-c-unlimited的dev_shiqu分支cherry-pick同上提交(69ed86d)，父仓库main-sfb更新子模块引用至该提交(06aa6e2)。

> 依据（摘）：src=无锡市区小程序嵌入H5/010.md

文件：`d:/repository/无锡市区小程序嵌入H5/src/pages_owner/maintain/info.vue`、`d:/repository/无锡市区小程序嵌入H5/src/api/maintenance.js`、`d:/repository/无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/maintain/info.vue`
---

### x1746 · 维修资金详情页合并须同步dev-shiqu解冲突

⚪ 踩坑 ｜ 验证于 无锡市区小程序嵌入H5 ｜ 无 git 基线，引用前请自行核对

子模块zhi2-mobile-admin-h5-c-unlimited的dev_wuxi-sfb提交69363c8合并详情页字段，dev_shiqu(50b65d1)合并该分支并解决index.vue、utils.js冲突，采用getAccountTransInfos等实现。父仓库main-sfb(4883b08)更新子模块引用。

> 依据（摘）：src=无锡市区小程序嵌入H5/010.md

文件：`d:/repository/无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/maintain/info.vue`、`d:/repository/无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/maintain/detail.vue`、`d:/repository/无锡市区小程序嵌入H5/zhi2-mobile-admin-h5-c-unlimited/src/pages_owner/maintain/index.vue`
---

### x1938 · 小程序主包瘦身：mainStaticPaths 白名单要同步裁剪，只在分包使用的空状态图移到分包内

🔴 模式 ｜ 验证于 苏住房C ｜ 距代码最后改动 66 天，绑定具体实现，务必先核对代码

【什么情况】苏住房C 小程序主包 2204KB，超出 2048KB 上传限制，微信开发者工具报超体积。
【为什么】主包 static 里堆了大量「只在分包使用」的空状态图（约 300KB），加上 HouseList / PersonList 这类只被某个分包消费的组件也被打进了主包。uni-app 打包时只要资源被主包代码路径引用（包括被 mainStaticPaths 这类白名单显式列入），就会进主包。
【怎么做】1) 先盘点主包 static 的每张图真实使用方，把 apply-empty.png、empty_house.png、empty.png、auto-robot.png、face-error.png、kefurexian.png 等分别迁到 pages_transaction / pages_feedback / pages_owner / pages_main 等消费分包；2) 同步从 src/utils/mainStaticPaths.js 的白名单里移除这 14 项——白名单是「强制留在主包」的开关，不移除等于白搬；3) 把只被分包使用的组件（HouseList / PersonList）迁入对应分包 components；4) 迁移后必须回到每个引用点修正静态资源路径，以及 ZsEmpty 的默认图与各分包 ZsEmpty 路径，否则会出现图片空白；5) 迁移逻辑要落成脚本（scripts/migrate-main-empty-static.mjs）便于复现，构建后实测主包 1842KB、pages_owner 1.61MB、pages_transaction 1.80MB。

> 依据（摘）：会话 bee1d6dc（基线 9832ba3）：用户连续四轮反馈「小程序包体积超了很多」「还是过大」「还差一点」「分包还是有一个超过 2mb」。最终结论给出主包压到 1842KB 的原因与改动：14 项从 mainStaticPaths 白…

文件：`zhi2-mobile-shimin/src/utils/mainStaticPaths.js`、`zhi2-mobile-shimin/scripts/size-main-package.mjs`、`zhi2-mobile-shimin/scripts/migrate-main-empty-static.mjs`
---

### x2003 · 苏服办轻应用内拨打电话必须走 lightAppJssdk.device.call，统一收敛 callPhone/extractPhoneNumber

🔴 踩坑 ｜ 验证于 苏住房C ｜ 距代码最后改动 103 天，绑定具体实现，务必先核对代码

【什么情况】市民端多处电话（房贷导引各银行详情页联系方式、我的-设置-关于我们客服电话、PhoneCall 组件的服务热线）在苏服办里点击无法唤起拨打，uni.makePhoneCall 在轻应用 WebView 内不生效。
【为什么】苏服办 H5 运行在轻应用容器里，没有直接调起系统拨号的权限，必须通过 JS-SDK 桥 lightAppJssdk.device.call({phone, success, fail}) 转发给宿主 App。直接用 uni.makePhoneCall 只在小程序端有效。
【怎么做】在 src/utils/sfb.js 收敛两个函数：callPhone(phone) 判断处于苏服办环境时优先 lightAppJssdk.device.call，否则降级 uni.makePhoneCall；extractPhoneNumber(text) 从「吴经理 13771787779」这类混合文案里正则抽出纯号码（后端字段常是姓名+号码拼接，直接整串传给 SDK 会失败）。所有电话展示点都调 callPhone，包括 AboutUs 客服电话、页面内的电话文本，以及已经封装的 PhoneCall 组件（组件内部改一次即可覆盖所有使用它的页面）。附带结论：房贷导引银行详情原先跳外部 webView（cc.szfcweb.cn），要支持点击拨打就得改成站内本地详情页 /pages/policy/fddydetail?id=${bankLogo}，列表跳转同步改，外部 H5 无法注入这个 SDK 调用。

> 依据（摘）：会话 fffe887a：用户要求银行详情页联系方式与关于我们客服电话可唤起拨打，并给出 lightAppJssdk.device.call 调用片段。最终结论：sfb.js 新增 callPhone/extractPhoneNumber（优…

文件：`zhi2-mobile-shimin/src/utils/sfb.js`、`zhi2-mobile-shimin/src/components/PhoneCall/PhoneCall.vue`、`zhi2-mobile-shimin/src/pages/about/AboutUs.vue`
---

### x2049 · houseCard 的「个人/中介」徽章被 `type` 当开关：苏找房二手房被自己的 type="stock" 挡掉，且写法与同源三兄弟项目分叉

🔴 踩坑 ｜ 验证于 苏住房C ｜ 距代码最后改动 62 天，绑定具体实现，务必先核对代码

现象：苏找房「二手房」Tab 的房源卡片缺少「个人 / 中介」发布角色徽章，同页新房卡片正常。根因：components/commonNew/houseCard.vue 把发布角色徽章的显示条件写成了「`type` 为空才渲染」，而苏找房二手房列表必须传 type="stock"（组件靠它区分房源形态与图片底部前缀），于是徽章被自己的形态参数关掉——`type` 是「房源形态」而不是「是否显示徽章」，两个语义被挤在同一个 prop 上。同源项目（苏州房地产监测V3 / 泰兴小程序 / 苏住房G）此处的写法与苏住房C 已经分叉，从兄弟项目直接同步该组件会把徽章逻辑带偏，改动前先比对 type 的取值约定。做法：①徽章显示条件改为按房源形态白名单判定（type 为空或 type==='stock' 都渲染发布角色徽章），不再用「是否为空」当开关；②个人=蓝、中介=橙，颜色绑定到发布角色字段而非写死；③更彻底的收敛是把「是否显示徽章 / 是否显示前缀」拆成独立的 boolean prop（如 showPublishRole），避免继续叠在 type 上；④凡是列表页传了 type 的场景（二手房、租房、新房）都要回归一遍徽章与图片前缀是否同时正常。

> 依据（摘）：会话 2259f4fa（基线 5f0f4dc）「苏找房—二手房缺少个人，中介，定位等标志」；最终结论明确根因是 houseCard 只在 type 为空时显示徽章，而苏找房二手房列表传的是 type="stock"，修改为「type="st…

文件：`zhi2-mobile-shimin/src/components/commonNew/houseCard.vue`、`zhi2-mobile-shimin/src/pages_transaction/stockHouse/index.vue`、`zhi2-mobile-shimin/src/pages_tab/components/Project_Suzhufang.vue`
---

### x2188 · 苏住房C 小程序导航约定：政策/导引类详情一律走 webViewNav + H5，本地没有对应页面

🔵 事实 ｜ 验证于 苏住房C ｜ 约定/偏好类，通常长期有效（记录于 2026-08-24）

情况：zhi2-mobile-shimin 的「房贷导引」(pages_transaction/houseLoanGuide) 点银行跳 `/pages/policy/fddydetail?id=xx`，控制台报 navigateTo:fail page "pages/policy/fddydetail" is not found。原因：该页面在 src/pages.json 里根本没有注册，属于从其他端复制残留的本地路由；本项目的政策/导引类内容全部由 H5 站点 cc.szfcweb.cn:9999 承载。做法：与同项目的「税收导引」「交易流程导引」保持一致，改为 goto(`/pages_main/common/webViewNav?url=${encodeURIComponent(H5完整地址)}&title=${encodeURIComponent(title)}`)，title 用 getDictLabel(item.bankLogo, appStore.getDict('BANK_LOGO_H5')) 取字典中文。排查约定：遇到 navigateTo page not found，先在 pages.json 里 grep 目标路径确认是否注册，再看同目录兄弟页是不是走 webViewNav；H5 打不开时不要再改前端，先验 https://cc.szfcweb.cn:9999 服务可用性。新增导引类需求直接按 H5 + webViewNav 实现，不要在分包里新建同名本地页。

> 依据（摘）：会话 2d03bb3e（基线 4630e8e）：houseLoanGuide/index.vue 原用 goto(`/pages/policy/fddydetail?id=${item.bankLogo}`) 跳本地未注册页，改为 webV…

文件：`zhi2-mobile-shimin/src/pages_transaction/houseLoanGuide/index.vue`、`zhi2-mobile-shimin/src/pages.json`、`zhi2-mobile-shimin/src/pages_main/common/webViewNav.vue`
