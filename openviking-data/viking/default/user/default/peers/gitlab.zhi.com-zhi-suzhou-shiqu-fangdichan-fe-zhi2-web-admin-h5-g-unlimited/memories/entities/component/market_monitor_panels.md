# Market Monitor Panels
Vue 2 dashboard components under zhi2-web-admin/src/views/property/marketMonitor/components/, ported from a minified React bundle.

## Components (Core)
- TradePanel.vue: ported from Ree; two-column panel (商品住房 blue / 存量住房 emerald), each column has 全市合计 + 市区 blocks with 4 metrics (成交套数/面积/金额/单价), a donut pie via ChartBox plus a DistrictPie beside it; year/month selects and a toggle. Uses data Iee (commercial) / Lee (resale). 2026-11-04 两处「各板块成交套数比例」饼图卡片已移除 border border-slate-200/70 与 rounded-lg p-2 sm:p-2.5（边框与内边距）。
- AgencyPanel.vue: ported from ze; purple 中介机构 card with 3 stats (企业数 家 / 人员数 万人 / 网签数 笔) plus MoM badges; icons users, building-2, user-check, file-pen-line.
- AreaStructurePanel.vue: ported from Re; inline Le bracket echarts config; three-档 stacked bar + legend + 3 detail rows (商品房/存量房 cards); props data/theme.
- DistrictPie.vue: sibling component written by dev-a; props dataPoints array of {district, units}; used in TradePanel via <district-pie :data-points="..." />.

## Components (Task-3)
- CumulativePanel.vue: ported from p-zee.js; 3 tabs (套数走势/面积走势/未售情况 = quantity trend/area trend/unsold status) with same button styling; unsold cards (一年/三年/多年 未售) and a taller dual-axis bar chart (未售套数 cyan / 未售面积 amber) render only when unsold tab active; bar chart container min-h-[210px].
- BuyerOverviewPanel.vue: ported from p-Bee.js; left 户籍与年龄结构 line chart with 户籍/年龄 toggle (unchanged), right 付款方式结构 payment structure as donut chart LEFT + legend list RIGHT (商业贷款/一次性付款/分期付款/公积金贷款 with count and %, 2026-11-04 新增公积金贷款 payFund 第四类并放大图例色块图标与文字、调整左移与间距), same style as DistrictPie; 2026-11-09 环形图 ECharts radius 从 ['62%','90%'] 改为 ['50%','72%']（外径约 155px → 124px，缩小约 20%，圆心不变）。
- DetailModalA.vue: ported from p-Vee.js; government report print/preview modal (政务汇报专报); uses computedData (quantityData) / areaData / propertyData / districtData props; no charts.
- DetailModalB.vue: ported from p-Hee.js; 5-slide 汇报演讲 carousel with autoplay/prev/next, highlight box, pagination dots.
- DetailModalC.vue: ported from p-Uee.js; 4-tab 明细表 with per-tab CSV export; renders charts only when visible=true (v-if); emits 'close'.

## Relations
- Part of the zhi2-web-admin portal project (Vue2 + Element UI + echarts + Vite).
- Foundation reused: assets/dashboard.css (scoped tailwind under .mm-dashboard; 预生成 Tailwind v4 产物，仅含 w-[172px]/h-[172px] 等固定类，新任意值类不会被生成), components/LucideIcon.vue, components/ChartBox.vue (props option, height), assets/data.js exporting Iee, Lee, Z9, Q9, x, S, C, w, b, themes, districtInfo.
- Modals receive visible prop (not isOpen) plus computedData, trendData, areaData, propertyData, districtData from index.vue.

<!-- MEMORY_FIELDS
{
  "category": "component",
  "name": "market_monitor_panels",
  "source_extraction_id": "6db2548183324589bf6320003dbce685",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 5,
  "memory_type": "entities"
}
-->