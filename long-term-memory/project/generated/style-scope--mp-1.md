# 项目专属 · 样式作用域与主题（1/1）

共 6 条，引用前核对所属项目及代码。

### t0010 · PageButton颜色未传入内联样式致背景白

⚪ 事实 ｜ 验证于 泰兴 ｜ 无 git 基线，引用前请自行核对

`detail.vue:378` 中 `#F39C12` 配置正确，但 `PageButton` 将颜色转为内联 `:style` 时未传入，导致按钮背景显示为白色。需确保 `PageButton` 正确接收并绑定颜色属性。

> 依据（摘）：src=泰兴小程序/004.md

文件：`D:/repository/泰兴小程序/src/staff/pages_facility/issue/detail.vue`、`D:/repository/泰兴小程序/src/staff/components/PageButton/PageButton.vue`、`D:/repository/泰兴小程序/src/staff/components/ZsButton/ZsButton.vue`
---

### t0020 · 巡保记录模块缺主题 mixin 致色不统一

⚪ 事实 ｜ 验证于 泰兴 ｜ 无 git 基线，引用前请自行核对

巡保记录模块原先缺少统一主题色变量。在 `src/staff/styles/theme.scss` 定义 `staff-page-theme` mixin 统一 `#1677ff`，并在 5 个记录页面根容器 `@include staff-page-theme` 注入主题变量。

> 依据（摘）：src=泰兴小程序/008.md

文件：`d:/repository/泰兴小程序/src/staff/pages_facility/record/index.vue`、`d:/repository/泰兴小程序/src/styles/index.css`、`d:/repository/泰兴小程序/src/staff/pages_facility/components/FilterPopup.vue`
---

### t0057 · 项目页样式须对齐 apply.vue 且保留 phase

⚪ 偏好 ｜ 验证于 泰兴 ｜ 无 git 基线，引用前请自行核对

`src/pages_maintain_project/project.vue` 以 `apply.vue` 为基准同步 CSS（背景 `#efefef`→`#f7f7f7`、卡片内边距 `28rpx 30rpx`、标题增 `margin-bottom:24rpx`、行距 `.row+.row{margin-top:12rpx}`），保留 `.phase` 特有颜色样式。

> 依据（摘）：extracted source=cursor session=1d2913da-ba61-4601-8826-ca51ff7f311d

文件：`d:/repository/泰兴小程序/src/pages_maintain_project/apply.vue`、`d:/repository/泰兴小程序/src/pages_maintain_project/project.vue`、`src/pages_maintain_project/project.vue`
---

### x1917 · 工单按钮橙色实心被plain描边样式覆盖

⚪ 偏好 ｜ 验证于 物业手持B端 ｜ 无 git 基线，引用前请自行核对

根因：src/pages_facility/issue/detail.vue 中催办、回复按钮设 plain: true 与 borderColor 致描边覆盖橙色实心样式。修复：移除 plain 与 borderColor 改为橙色实心按钮，相关组件同步调整。

> 依据（摘）：src=物业手持B端/002.md

文件：`d:/repository/物业手持B端/src/pages/workbench/index.vue`、`d:/repository/物业手持B端/src/pages_facility/issue/index.vue`、`d:/repository/物业手持B端/src/components/PageButton/PageButton.vue`
---

### x2096 · 小程序柱状图数值标签被右侧裁断：grid.right 必须按最长标签动态留白，缩略图看不出来

🔴 模式 ｜ 验证于 苏住房C ｜ 距代码最后改动 80 天，绑定具体实现，务必先核对代码

场景：小程序（uni-app + EchartsUniapp 封装）横向条形图，金额标签用 label.position:'right' + formatter 拼 `¥` 前缀，用户反馈「金额显示不全」——截图上一眼看不出是裁切而不是字体问题。

为什么：ECharts 的 label.position:'right' 是挂在柱子末端向容器外延伸的，它不参与 grid 的计算。grid.right 写死一个小值（本项目原为 12）时，超过该宽度的标签直接被 canvas 裁断；containLabel:true 只补偿坐标轴，管不到 series.label。金额又带千分位 + 两位小数 + ¥，标签宽度随数值增长，写死的 right 一定在某个数量级后崩。

怎么做：把 grid.right 从常量改成「按当前数据算出的最长标签宽度」——遍历 list 用同一个 label 格式化函数生成文本（如 getChartAmountLabel），取最长字符串，按 字符数 × 字号 估算宽度并给下限兜底（本项目 Math.max(88, maxLen * 8)）；label 的 formatter 与估算必须共用同一个函数，否则估算与实际渲染会漂移。

排查提示：这类问题表现为「数值缺尾巴/少一位」，容易被误判成数据类型或 toFixed 问题；先怀疑容器留白，再看 formatter。ECharts 在小程序端不报错、不告警，是纯视觉失败。

> 依据（摘）：会话 9f66fd77 用户诉求「图表的金额显示不全」并附截图；结论为已完成提交 f4939ee4「fix(balancePublicity): 修复经营性收支公示图表金额显示不全」并合入 mainv2.1。仓库现行代码 pages_ben…

文件：`zhi2-mobile-shimin/src/pages_benefit/balancePublicity/index.vue`、`zhi2-mobile-shimin/src/pages_benefit/components/echarts-uniapp/echarts-uniapp.vue`、`zhi2-mobile-shimin/src/utils/index.js`
---

### x2456 · add.vue信息有效期至误用区块标题样式

⚪ 事实 ｜ 验证于 苏住房C ｜ 无 git 基线，引用前请自行核对

根因为苏住房C/zhi2-mobile-shimin/src/pages_transaction/intention/add.vue中「信息有效期至」误用区块标题样式(24rpx/#a2a2a2)，而非表单项label的32rpx/#333。修改该文件41-43行view类为font-(32 weight-400 color-333) leading-44，与.uni-forms-item__label一致。

> 依据（摘）：extracted source=cursor session=452e5168-2d2e-4d7b-ad71-56eaaee8ce39

文件：`d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/intention/add.vue`、`根因为苏住房C/zhi2-mobile-shimin/src/pages_transaction/intention/add.vue`
