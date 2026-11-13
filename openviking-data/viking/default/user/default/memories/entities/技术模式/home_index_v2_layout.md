# 苏住房G 首页 index-v2 布局
苏住房G 项目 zhi2-web-admin 门户首页 index-v2.vue 已按设计图重做，结构对齐设计稿。

## 布局结构
- 行1：关键数据导航（指标+双列信息盒）、待办事项（新增卡片）、通知公告（原学习园地改名）
- 行2：公共收益（左统计列+右环形图含中心总额）、双晒公示（新增面板：3项统计+行政区划排名进度表）、报事维修
- 行3：物业管理标准化评价（新增全宽面板：物业自查/街道检查/区县检查/市级检查4列+整改进度条）
- 区域栏右侧新增「当前数据统计周期」，各卡片 SegTabs（历史累计/当月数据/图表走势）

## 改动文件
- `index-v2.vue`（布局重排）
- `KeyDataNav/PublicBenefit/TodoPanel/StudyPanel/RepairPanel`（重构/改名）
- 新增 `SunshinePanel.vue`、`EvaluationPanel.vue`、`api/portal/home.js`（新增2接口+mock）
- `repairDataMap/benefitDataMap/keyDataMap`（数据格式化修复）

## 项目归属
- 所属项目：苏住房G（zhi2-web-admin）
- 验证：E2E 像素对比测试跑通，视口对齐1920设计稿

## 窄屏适配修复（2026-11-12）
- 图1 区域栏与日期重叠：去掉 RegionTabs 的 embed-in-parent-scroll，.home-v2__region 改 flex 横向布局，.home-v2__period 改常规流 flex:0 0 auto nowrap 完整显示，.home-v2__region-tabs 设 flex:1 1 0; min-width:0; overflow:hidden 让 tab 内部横向滚动
- 图2 卡片标题换行/tab 溢出：SectionCard .sc__title 加 white-space:nowrap; flex:0 0 auto，.sc__hd-r 改 flex:0 1 auto; min-width:0; overflow-x:auto；SegTabs .seg 去 overflow:hidden 改 overflow-x:auto、按钮 flex:0 0 auto 不换行
- 改动文件：index-v2.vue、SectionCard.vue、SegTabs.vue
- 验证：构建 exit 0、ESLint exit 0、nginx localhost:8101 + Playwright mock + 900px 窄视口截图断言通过
- 提交：子模块 486e5e384（develop/v2.6.2-suzhufang），父仓 gitlink db9e2b0d

## 响应式栅格断点适配（2026-11-12，提交 738a8fa42）
- 根因：主栅格 `1.33fr 1fr 1fr` + 固定 `grid-auto-rows:416px` 无任何断点，窄屏仍3列被压窄；区域栏 flex 不换行；公共收益图表 min-height:0 塌缩；双晒公示表格列宽固定溢出
- index-v2.vue：≥1200 三列 / 768–1199 两列且首卡整行铺满 / ≤767 单列自适应、区域栏 flex-wrap 换行（tab 整行在上、周期整行在下）
- KeyDataNav.vue：≤575px 卡片两列改单列、企业卡片纵向排列
- PublicBenefit.vue：≤767px 侧栏与图表区上下堆叠，环形图/趋势图显式高度 200/240px 防塌缩
- SunshinePanel.vue：≤991px 排名表格横向滚动（min-width:460px + overflow-x:auto）覆盖中屏半宽与手机窄屏
- 验证：npm test（Vite test 构建）exit 0、ESLint 无报错、rebase 拉入上游2提交后 ahead=1 behind=0
- 提交：子模块 738a8fa42、父仓 1cb2118（均 develop/v2.6.2-suzhufang）
- 未执行：真机/浏览器窄屏（320/768/1200）视觉联调，建议 DevTools 设备模式或手机 WebView 实测

## 关键数据导航对齐调整（2026-11-13）
- 用户要求上方面积卡子项盛满宽度、下方企业卡子框靠右对齐
- KeyDataNav.vue 两处 scoped CSS：`.kd__boxes--stack` 加 `width:100%`（住宅/住宅非住宅两行盛满）、`.kd__boxes--company` 加 `justify-content:flex-end`（本地/非本地靠右）
- 提交：子模块 bf1ac6419（fix(home-v2)）、父仓 8c83396（chore(submodule) gitlink）；lint 通过，构建基线因编排器 120s stall 未执行

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_index_v2_layout",
  "source_extraction_id": "af35dfe490e34a7f861b327ca6c23258",
  "version": 4,
  "memory_type": "entities"
}
-->