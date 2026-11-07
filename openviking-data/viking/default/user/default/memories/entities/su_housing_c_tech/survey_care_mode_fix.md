# 民意调查答题页微信关怀模式评星修复
苏住房C（zhi2-mobile-shimin H5）民意调查答题页在微信关怀模式（大字模式）下底部评星不可见且无法滚动，已通过整页滚动改造修复。

## 问题根因
- src/pages-survey/index.vue 原结构：顶部信息固定（flex-shrink:0）+ 中间答案区 flex:1 height:0 内部独立滚动 + 底部按钮固定
- 微信关怀模式字体整体放大后，顶部信息（标题/说明/进度/统计）撑高且不可收缩，把中间答案区压到接近 0 高
- 底部评星位于答案区最底部，被压没、内部滚动容器高度为 0 → 评星看不到也滑不下去

## 修复内容
- 将「顶部信息 + 问题内容」整体包进单个 scroll-view scroll-y（class survey-page-body，flex:1; height:0; overflow-y:auto），底部按钮保持固定在外层
- 内容区去掉 flex:1 / overflow:hidden，答案区由内部独立滚动改为随主体整体滚动（原 inner scroll-view 还原为普通 div）
- 无论字体放大多少，整段内容作为一个滚动区，评星始终可通过滚动到达，底部操作栏固定不遮挡

## 验证与归属
- 本地 nginx UI 站点（端口 8093）构建部署，Playwright 安卓/小米视口（393x851、MI 13 UA、触摸）模拟放大字号验证
- 正常模式：页面适配、底部固定、选项可滚动（scrollTop 0→419），无回归
- 关怀模式 1.5x：主体 scrollTop 0→342，评星可达；2.0x：scrollTop 0→982，评星可达；ALL_PASS
- worktree fix/survey-care-mode 修复，合并回 dev-v0（提交 4e1e63e + merge 39ce63a），已推 origin/dev-v0（534b7c7..39ce63a）
- 构建期被 uni 改写的 pages.json/manifest.json 已还原未夹带
- 所属项目：zhi2-mobile-shimin（家园区一网通办H5）；来源会话：2026-11-06

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "survey_care_mode_fix",
  "source_extraction_id": "85625c1169c84641aef6580b8045dc5c",
  "version": 1,
  "memory_type": "entities"
}
-->