# Real Estate Market Operation Monitoring Decision Dashboard
房地产市场运行监测决策大屏，2026-11-07 起对齐至最新 React 版（原 Vue2 移植版废弃）。

## 最新版本来源
- 参考站 localhost:3000 = C:\Users\Administrator\Downloads\苏州市房地产市场数据分析平台 的 Vite dev server（进程命令行核实），即「最新版本」
- 该版本为整体重构：新增 DistrictBanner / UnsoldPanel，重做 KPI、交易、面积段、购房人面板，更换数据与字体

## 对齐实现（as of 2026-11-07）
- 采用最新版源码 `npx vite build --base=./` 构建，将产物 JS/CSS 内联为无依赖单文件 HTML（market-monitor.standalone.html）
- 门户大屏路由 `#/market-monitor` 经幂等补丁（scripts/apply-market-monitor-route.mjs）指向该单文件，两端运行同一份代码保证像素级一致
- 复用 nginx UI 站点「门户.conf」(8092，root 指向 dist)，访问 http://127.0.0.1:8092/index.html#/market-monitor

## 验收与 E2E
- 对齐前 Vue2 移植版逐像素相似度仅 83.29%；对齐后 E2E（Playwright + pixelmatch，门禁 ≥98%）5/5 PASS
- 确定性对比（外部字体桩化）100.000%；真实联网 Google Fonts 99.974%；离线 file:// 100.000%；交互切姑苏区 100.000%；门户路由 100.000%
- 多视口：1920×1040 99.996%、1600×900 99.998%、1366×768 100.000%；波动仅来自字体加载时序
- 测试脚本 tests/e2e/market-monitor-similarity.cjs，报告 test-results/mm-similarity/

## 交付物
- market-monitor.standalone.html（最新版构建内联，暂不提交 Git，保持未跟踪）
- dist/market-monitor.html（nginx 站点访问）
- scripts/build-market-monitor-standalone.mjs、apply-market-monitor-route.mjs
- docs/market-monitor-alignment.md

## 代码与部署
- 开发于 worktree D:\repository\门户-wt-mmalign 分支 align/market-monitor-latest，fast-forward 合回 develop/v2.6.2-portal（本地提交 b1cf316，4 文件/352 行），worktree 已删
- 单文件保留 Google Fonts 外链以与参考站字体一致；离线回退本地字体布局不变
- 最新版「返回首页」语义为重置全域，本实现保持一致

## 2026-11-10 缓存诊断更新
- 根目录 market-monitor.standalone.html 为 2026-11-09 10:31 构建、早于 18:20 字体修复，含 26 处 #64748b，已陈旧非线上产物；线上 #/market-monitor 实际由门户 dist（Vue 源码构建，2026-11-09 21:36 重建含修复）提供，经 nginx 8092 站点访问。
- 2026-11-10 用户复报文字不清，实为浏览器 30 天静态缓存（nginx 对 js/css immutable, max-age=2592000）旧 chunk，非代码未修复；强刷即可生效。

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "market_monitor_dashboard",
  "source_extraction_id": "0280547fac6d4a5f8315974d2dc1be76",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 8,
  "memory_type": "entities"
}
-->