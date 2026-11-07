# 民意调查答题页滚动修复
苏住房C（zhi2-mobile-shimin H5）民意调查答题页在小米/安卓WebView下无法上下滑动，已通过 height:100% 与原生 scroll-view 修复。

## 问题根因
- src/pages-survey/index.vue 的 .survey-page 用 height:100vh + overflow:hidden，内部普通 div 做 overflow-y:auto
- iOS Safari 的 100vh 等于可视区高度，因此苹果手机正常
- 小米/安卓 WebView 的 100vh 多算浏览器工具栏/导航栏高度，容器比真实可视区更高，被 overflow:hidden 裁掉后中间 flex:1 滚动区被撑到同高，无真实溢出导致滑不动

## 修复内容
- .survey-page 的 height:100vh 改为 height:100%，贴合真实页面盒子，安卓不再溢出
- 答案区由普通 div 换成 uni-app 原生 scroll-view scroll-y，与能正常滚动的调查结果页同款机制
- .survey-page-answer-scrollable 加 height:0 配合 flex:1 形成受高度约束的可滚动容器，头/底部固定仅中间答题区滚动

## 验证与归属
- 本地 nginx UI 站点（端口 8093，路径 /wechatapph5/，配置 家园区一网通办H5.conf）构建部署
- Playwright 安卓/小米视口（393x851、MI 13 UA、触摸）验证：页面高度等于视口高度，滚动容器 clientH=484 小于 scrollH=887，scrollTop 0 到 250 生效，无报错
- 分支 fix/survey-scroll-xiaomi 合并至 dev-v0（提交 534b7c7），已推 origin/dev-v0
- 涉及文件：src/pages-survey/index.vue；构建期被 uni 改写的 pages.json/manifest.json 已还原未提交
- 所属项目：zhi2-mobile-shimin（家园区一网通办H5）；来源会话：2026-11-06
- 附注 tag `202611061437`（仓库 YYYYMMDDHHMM 时间戳规则）打在提交 534b7c7，2026-11-06 推送 origin/dev-v0

## 后续演进
- 2026-11-06 同页后续修复（见 survey_care_mode_fix）：微信关怀模式大字模式下底部评星不可见，将顶部信息+问题内容整体包入 survey-page-body 滚动容器，答案区还原为普通 div 随主体滚动，本修复的 inner scroll-view 机制被取代

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "survey_scroll_fix",
  "source_extraction_id": "85625c1169c84641aef6580b8045dc5c",
  "version": 2,
  "memory_type": "entities"
}
-->