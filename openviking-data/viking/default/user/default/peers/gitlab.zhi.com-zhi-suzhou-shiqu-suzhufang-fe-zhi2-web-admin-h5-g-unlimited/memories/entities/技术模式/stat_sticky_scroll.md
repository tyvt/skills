# 统计表表头吸顶与单滚动修复
苏住房G禅道任务2730统计表：纵向滚动时首行横向表头滚走，页面级与表格容器同时出现纵向滚动条，横向滚动交互不友好。用户目标（2026-11-25）：页面不滚、仅表格外层滚且全页只有一层纵向滚动，顶部横向滚动条始终可见并与表体同步。

## 问题根因
- `<thead>` 中「合计」与区县列 `th` 缺 `position:sticky; top:0`，原仅固定「工作内容」列 `left`，纵滚时表头整行滚出视野。
- 全局 `.list-container`（index.scss L201）仅 `min-height:0`、无 `height`/`overflow` 约束，形成页面级滚动；`.stat-table-wrap` 又设 `max-height:calc(100vh-220px); overflow:auto` 形成容器内滚动，两者叠加成双滚动条。
- 横向滚动条默认隐藏且原无滚轮横滚；保持 Shift+滚轮，不强映射普通滚轮以免误伤纵滚。
- 顶部横向条「鼠标移入才显示」的根因：全局 `index.scss` 滚动条 thumb 仅在 `:hover` 显示，需为本页滚动区加覆盖样式。

## 修复方案
- `detail.vue` 表头行所有 `th` 加 `sticky-head`，设 `top:0`，交叉角按 z-index 分层。
- 根容器改 flex 自适应并采用项目已有 `calc(100vh-120px)` 量纲（index.scss:211 region-tree 先例），只保留一个纵向滚动容器。
- 验证补窄屏截图；计划已审核并经人工确认，提交、禅道带图回写延后到验证后。

## 迭代细化（2026-11-25）
- v2：sticky 实底 + 底部遮罩——`.sticky-head`/角头实色 `#f5f7fa` + `box-shadow: 0 4px 0 #f5f7fa` 盖缝，`.sticky-cell`（tbody 左列）实色 `#fafafa`，`.stat-table-wrap` 加 `overscroll-behavior: contain`；`npm test`/build 同步 8101。
- v3：顶部常驻横条 `.stat-table-xbar`（高 12px）与表体 `scrollLeft` 双向同步；`.stat-table-wrap` 改 `overflow-y:auto` + `overflow-x:hidden`（底部不再出横条避免双轨）；`pageScroll: false` 整页不纵滚（浏览器 eval 已测）。
- v4：顶栏横向与表体纵向均改为 `overflow: scroll`（eval `xOv/yOv` 均 `scroll`）并加 `scrollbar-gutter: stable`，顶栏高度 16px；用户反馈仍有 2 个纵向滚动条、顶部横条仍移入才显示，v4 未通过，继续为本页滚动区覆盖全局 hover 规则并排查外层页面级纵滚。
- 文件：`zhi2-web-admin/src/views/publicQuery/monthlyReportStat/detail.vue`（约 L181–250）；全局参照 `index.scss`（`.list-container`、region-tree 量纲、hover 滚动条规则）。

## 验证与归属
- 2026-11-25：eslint 通过、`npm test` 构建 EXIT_CODE=0（仅既存 Sass deprecation warning）；dist 14:42 更新，nginx 8101 返回 HTTP 200。
- 截图证据：`verify2730-20261125-151510-scroll-v2.png`、`verify2730-20261125-151520-scroll-xy-v2.png`、`verify2730-20261125-152000-top-xbar.png`、`verify2730-20261125-152200-scrollbar-v4.png`。
- 已请用户在 8101 详情页确认是否过验证门，顶栏条高度/颜色/与表头间距可再调。
- 来源会话ID：`session-e90119be-87a2-4ca1-be9f-62f40d06bac0`；关联禅道任务2730、苏住房G。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stat_sticky_scroll",
  "source_extraction_id": "44bfd3231330489c9eb33c9bb1f41611",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->