# 门户市场监测大屏高度不足内部滚动
门户（zhi2-web-admin）项目市场监测大屏在屏幕高度不足时，原样式用 overflow:hidden 裁切内容导致溢出不可滚动，改为视口内主内容区纵向滚动。

## 现象与根因
- 1920×953 视口命中 `@media (min-width:1024px) and (min-height:900px)` 分支，容器与 .mmd-main 均设 overflow:hidden
- 各面板有硬性最小高度（min-h-[210px]、min-h-[150px] 等），内容总高超过视口后被裁切，无内部滚动
- 上轮将 .mmd-content 改为 flex:1 1 auto; min-height:auto 内容撑高，行 flex:1 1 auto，图表 height:100% 配合 ResizeObserver 监听，高度链无确定参照 → 图表高度被内容反推无限增大，ResizeObserver 循环触发 resize 形成无限膨胀

## 解决方案
- 媒体查询由 min-height:900px 放宽为 min-width:1024px，去掉高度阈值导致的裁切
- .mmd-main 设为 flex:1 1 0%; min-height:0; overflow-y:auto; overflow-x:hidden，成为视口内滚动容器
- 内层内容栈 .mmd-content 改回确定高度 flex:1 1 0%; min-height:800px（KPI约150+行1 460+行2 300+间隙），行 flex:... 0% 分摊确定高度，图表 height:100% 解析为确定像素不再膨胀
- .mmd-row1 / .mmd-row2 加最小高度兜底（460px / 300px），矮屏时内容超出即触发内部滚动而非压扁裁切

## 验证与归属
- 验证：npm run build 成功，产物输出到 D:\repository\门户\dist；本地 nginx 门户站点（门户.conf，端口8092）部署，http://127.0.0.1:8092/market-monitor 返回200，构建 CSS 含 min-height:460px、overflow-y:auto 等新规则
- 涉及文件：zhi2-web-admin/src/views/property/marketMonitor/assets/supplement.css、zhi2-web-admin/src/views/property/marketMonitor/index.vue
- 二次修复验证：Playwright 实测 1920×953 / 1920×1080 / 1366×768 三档分辨率，图表高度 t1→t3 漂移均为 0，彻底消除「无限增长」
- 所属项目：门户（zhi2-web-admin）；来源会话：2026-11-04；用户确认不提交，改动保留工作区

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "market_monitor_height_scroll",
  "source_extraction_id": "670f30d2664a4f35ba284df46650aaa7",
  "version": 2,
  "memory_type": "entities"
}
-->