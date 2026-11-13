# zhi2-admin-h5
Suzhou real estate regulation platform back-office H5 frontend (admin + non-admin brokerage/dev-enterprise internal homepages); local nginx port 8092.

## Layout & Components
- Non-admin homepage: HomeLayoutSidebar.vue; right column = user card + AI Q&A panel (HomeAiPanel) + announcements (HomeQuickLinks removed).
- Admin homepage: AI Q&A section HomeAiPanel + dialog HomeAiChatDialog.
- Layout chain: #app > .app-viewport(min-height:100vh) > .app-wrapper(height:100%) > .main-container > .right-container > .app-main; B-end .right-container adds .portal-home-layout (overflow:auto, app-main height:auto;min-height:100%).
- HomeQuickLinks: quick links (admin only now).

## Relations & History
- 2026-11-04 non-admin quick links → AI Q&A + dialog; e2e portal-home-visual.spec.ts updated; submodule develop/v2.6.2-portal 04ff25537, parent 879c169.
- Homepage "查看更多数据" (HomeStatsBar more) → #/market-monitor dashboard.
- 2026-11-07 #/market-monitor patched to inline single-file dashboard from latest React source, pixel-consistent (E2E ≥99.97%).
- Super-admin "broken" was independent GetInfo login bug (parentId='0' → dept/detail?deptId=0 fail, ROLE_DEFAULT fallback took sidebar); 04ff25537 untouched admin layout.

## Fix Records
- 2026-11-06 B-end sidebar AI panel stretch: HomeAiPanel height:auto, .sidebar-ai-panel flex:0 0 auto;align-self:flex-start; submodule 1a8d32ed7, parent 3d16b94.
- 2026-11-06 B-end cards whitespace: .home-layout-sidebar flex:1 1 auto;min-height:0; submodule a5662a037, parent d267b1d, deploy 8092 200.
- 2026-11-06 layout root .app-wrapper fill: min-height:100vh;box-sizing:border-box; submodule 8e4c32ad4, parent b587375, deploy 8092 verified.
- Local 8092 test account: 91320505MA1X866218 / ZS0001Aa! (dev enterprise/test legal, user 2026-11-06).
- 2026-11-09 BrokerPages.vue 经纪机构「交易记录/信用记录」tab 对齐 zs-tabs：`.portal-tabs` 的 `align-self:stretch`→`center`，未激活色 `#333`→`rgba(0,0,0,0.65)`；提交 330a474df 合并入 develop/v2.6.2-portal（85c948dd5），由并行任务推送远程。
- 2026-11-10 PropertyDetailDialog.vue 房屋详情弹窗样式调整：室号加粗+字号30px（.portal-house-number strong { font-size:30px; font-weight:700 }）；房屋性质、层高（m）、单元号、所在自然层、套型5字段右对齐（.portal-house-overview > div:not(.portal-house-number) { align-items:flex-end; text-align:right }）；右上角「非政策类」标签右对齐（.portal-house-tags.is-right { justify-content:flex-end; text-align:right }）；scoped 样式，文件 zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue。
- 2026-11-10 租赁输入框左对齐修复：RentalContractQueryPanel.vue（操作指引版）与 RentalPages.vue（公众版）及 -wt-payfund 同构副本共 4 文件，标签 `flex:0 0 auto`→`200px`、input 加 `text-align:left`；根因为未 import 的 `operationGuideContract.scss` 死代码含 `flex:0 0 200px` 设计稿。

## Market Monitor Page (2026-11-09)
- MarketHeader.vue: logo reads platformConfig.sysLogo (mapState+resolveServerAssetUrl → <img>, w-9 h-9 overflow-hidden); fallback static house SVG on missing/@error; title "苏州市房地产市场数据分析平台".
- /market-monitor in route whitelist (guard skips platform config) → MarketHeader mounted dispatches('app/getPlatformConfig') (store deduped).
- Return-home: emit go-home (tooltip "返回对内主页"); goHome() exits fullscreen; from.matched has value → $router.go(-1), else $router.replace('/index'); avoids history.state/length (direct open misjudges).
- Legacy docs PORTING-SPEC.md / market-monitor-alignment.md still say "返回首页＝重置全域" (not updated); market-monitor.standalone.html offline old behavior (non-deliverable).
- Region switch: data only, layout fixed, removed return-button white highlight (user 2026-11-09).
- Buyer panel (household+age) + KPI trend chart (yAxis hidden, auto-scaled) on page.
- Unsold-housing right y-axis max:v.max*1.05 broke eCharts nice ticks (23.5935/20/15); fixed via boundaryGap (2026-11-09).
- Verified: layout byte-identical across region switch; return button semi-transparent no white bg (2026-11-09).
- 2026-11-12 Vue 源码大屏（marketMonitor）重对齐至 market-monitor.v2.html（编译版 React 包），navbar（MarketHeader）确认未改，图表区像素相似度 98.06%（≥98% PASS），子模块提交 ea3860a58。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_admin_h5",
  "source_extraction_id": "5e28bfd933f94709b10b769b3e6049fe",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 15,
  "memory_type": "entities"
}
-->