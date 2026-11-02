# 表格与布局 · 小程序

共 7 条。

其中 🔵 长期有效 0 条（排在最前，属必须遵守的约定）。

---

### m114 · UI 架构约定：详情页统一用 CardCell 组件族（CardCell / CellInline / CellFulline）+ PhoneCall 金色电话，双列区靠 cell-inline 与竖线分隔

🟡 模式 ｜ 验证于 泰兴 ｜ 距代码最后改动 103 天，属具体实现细节，强烈建议先核对代码

详情页字段展示不要各页面自定义行结构，统一使用 src/components/CardCell 组件族：默认列表行用 CardCell（左右对齐，底部有分割线）、双列需要居中并带列间竖线时用 `cell-inline`（CellInline）、整行展示用 CellFulline；样式细节收敛在 src/styles/cell.scss。电话字段统一用 PhoneCall 组件（金色，可直接拨号），且电话行应去掉底部分割线，周期/双列区用 `border-top` 与上方列表区分。新增详情页直接沿用这套组合即可与既有页面视觉一致。

> 依据（摘）：会话 1c61ac87 最终结论：「上方 10 项仍为左右对齐的列表行（含金色电话 PhoneCall）；周期区使用 cell-inline 双列居中，列间竖线分隔；联系电话行去掉底部分割线，周期区用 border-top 与列表区分」；涉…

文件：`src/components/CardCell/CardCell.vue`、`src/components/CardCell/CellInline.vue`、`src/components/CardCell/CellFulline.vue`
---

### x2182 · 横向图标导航不要用 scroll-view + calc 页宽：改 swiper 整页切换，flex 均分列宽

🔴 模式 ｜ 验证于 苏住房C ｜ 距代码最后改动 66 天，绑定具体实现，务必先核对代码

情况：苏住房C 小程序「苏找房」页顶部图标导航横向分页左右滑动时 UI 错位——第 6 个图标被裁切露出一角，底部分页指示器也错位。
为什么：用 scroll-view 做「按页滑动」，每页宽度却写成 calc(100vw - 44px)，而 scroll-view 容器是全屏宽。两者宽度不一致 → 右侧会提前露出下一页内容；同时 scrollLeft 按错误的页宽换算页码，指示器必然对不上。
怎么做：① 分页式横向导航改用 swiper，天然按容器宽度整页切换，页码直接绑 swiper 的 @change 事件 current，不再自己用 scrollLeft 推算；② 每页内部用 flex 均分列宽而不是写死像素，5 列时用 flex: 0 0 calc((100% - 32px) / 5)（32px 为 4 个间距之和），保证任意屏宽下每页正好 5 个且不露出下一个；③ 图标数不整除时补齐占位，避免最后一页被拉伸；④ 若确实需要「连续滚动而非翻页」，才用 scroll-view，此时页宽必须与容器宽度严格同源（都用 100%），不要混用 100vw 与扣减后的宽度。

> 依据（摘）：会话 1d4644c7（2026-08-21，基线 9832ba3）用户报「上面这个分页左右滑动组件UI有问题」；定位 Project_Suzhufang.vue 横向导航用 scroll-view 而每页宽度设为 calc(100vw -…

文件：`d:\repository\苏住房C\zhi2-mobile-shimin\src\pages\index\components\Project_Suzhufang.vue`、`d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_tab\components\Project_Suzhufang.vue`、`d:\repository\苏住房C\zhi2-mobile-shimin\src\pages\index\project.vue`
---

### x1398 · 首页布局须按设计稿恢复垂直节奏与尺寸

⚪ 模式 ｜ 验证于 小程序 ｜ 无 git 基线，引用前请自行核对

在 `pages/home/new/index.vue` 增大 `page`、`home-wrapper` 及模块间 `margin-top`，恢复房屋卡、公告卡高度与头像标题比例，底部图标区回调尺寸与间距以贴合设计稿。

> 依据（摘）：extracted source=cursor session=816053e2-056a-43aa-b164-fbf6cbc32d48

文件：`d:/repository/小程序/wygl-wxxcx-dev-slh/pages/home/new/index.vue`、`pages/home/new/index.vue`
---

### x2257 · flex-wrap致权证号折行改固定两行布局

⚪ 踩坑 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

根因为 `flex-wrap` 布局在一行空间不足时将“号”字挤至下一行。改为固定两行布局：第一行放置“苏”与年份输入框，第二行放置“苏州市不动产权第”、编号输入框与“号”保持同行，`placeholder` 维持 `22rpx` 字号。

> 依据（摘）：src=苏住房C/026.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/house/verify.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/publishHouse/verification.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/styles/form2.scss`
---

### x2259 · 分栏flex布局右栏高度0致内容塌陷

⚪ 踩坑 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

分栏模式为横向flex布局，`.sidebar-right` 的 `height:0` 使右侧 `scroll-view` 高度塌陷为0致菜单不显示。修复：`.sidebar-right` 恢复 `height:100%`，`.service-sidebar` 增 `flex-direction:row` 与 `align-items:stretch`。

> 依据（摘）：src=苏住房C/028.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/community.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_tab/components/Community_Suzhufang.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/components/Community_Suzhufang.vue`
---

### x2270 · 卡片最小宽度超容器且标题不换行致双列布局失效

⚪ 偏好 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

根因：卡片`flex:0 0 48%`但标题`white-space:nowrap`及图标致最小宽超容器，双列失效。`pages_main/publicNotice/index.vue`改CSS Grid`repeat(2,minmax(0,1fr))`，标题去`nowrap`改`word-break:break-all`并缩图标。

> 依据（摘）：src=苏住房C/033.md

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_main/publicNotice/index.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_main/publicNotice/publicNotice.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsImage/ZsImage.vue`
---

### x2398 · tab栏未设flex且用span致布局异常

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

`pages_transaction/publishHouse/index` 的 `.tab-box` 未设 `display: flex` 且 Tab 用 `span`，导致挤压靠左及小程序兼容异常。`.tab-box` 设 `flex + space-around`，Tab 改 `div` 并设 `flex: 1`，下划线 `transform` 改 `translateX(-50%)`。

> 依据（摘）：extracted source=cursor session=46b361be-d49d-4712-aad1-88015b1ae377

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/publishHouse/index.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/publishHouse/houseList.vue`、`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json`
---
