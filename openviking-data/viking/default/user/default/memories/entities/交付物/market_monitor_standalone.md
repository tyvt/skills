# market-monitor.standalone.html
苏州市房地产市场数据分析平台的离线单文件交付物，由已对齐的 Vue 源码一次性内联生成，运行时零依赖。

## Description
- 单 HTML 文件，约 1.36 MB，整个应用（Vue 2.7 + ECharts 6 + Tailwind v4 样式）全部内联，scoped 在 `.mm-dashboard` 下
- 运行时零外链：文件中的 `http://`/`src=`/`href=` 均为许可证注释、SVG xmlns 命名空间、截图导出的内生 dataURL，无网络请求
- 对齐文档 `docs/market-monitor-alignment.md` 实测「离线单文件 100%」相似度（Playwright + pixelmatch，1920×1080 与 1366×768）

## 面板结构
- 顶栏：标题/实时时钟/统计期/监测范围/全屏/返回首页
- 首排 6 张指标卡
- 左中右三列：商品住房、存量住房、累计可售、未售房源、经纪机构监管、成交面积段、购房人画像

## 文件位置与关联
- 位于仓库根目录
- 对应线上源：苏州市房地产市场数据分析平台（标题、顶栏、6 指标卡、三列面板均匹配）

<!-- MEMORY_FIELDS
{
  "category": "交付物",
  "name": "market_monitor_standalone",
  "source_extraction_id": "bdb7bdb18e534a38b91ef5b943711f92",
  "version": 1,
  "memory_type": "entities"
}
-->