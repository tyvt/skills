# 原生 table + colgroup 统计表右侧留白
苏房G 公共查询-物业管理信息月报统计详情页（原生 `<table class="stat-table">` + `<colgroup>`）调整列宽后右侧出现留白，根因是列宽写死 width 且样式兜底被覆盖。

## 问题根因
- 该页非 zs-table，而是原生 table + colgroup 写死各列 `width`
- 列宽改固定值后，所有列宽之和小于容器宽度时 table 不会自动分配剩余空间，右边留白
- 样式表里 `.stat-table` 的 `width:100%` 被内联/局部覆盖后连兜底也没了

## 解决方案
- `colgroup`/列上的 `width` 改 `minWidth`（列宽语义从「定宽」变「下限」），内容总宽不足时浏览器把余量分给各列，超出触发容器横滚
- `.stat-table` 回收 `width: 100%`，与同模块其它统计页保持同一口径
- 外层 `.stat-table-wrap` 保留 `overflow: auto` 承载窄屏横向滚动

## 验证与归属
- 验证分宽屏/窄屏两态：宽屏看是否铺满且第一列不被异常拉伸，窄屏看是否横滚而非压缩换行
- 此类「原生表格 + colgroup」页与 zs-table 列宽算法无关，勿改公共 zs-table（会误伤全站列表）
- 验证：detail.vue 里 width→minWidth、.stat-table 恢复 width:100%，依赖 .stat-table-wrap 的 overflow:auto 处理窄屏
- 涉及文件：zhi2-web-admin/src/views/publicQuery/monthlyReportStat/detail.vue、index.vue
- 所属项目：苏住房G；来源会话：89bf3d7d-179a-4d0a-8a4f-3157bdf4d110；代码基线：a724727

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_colgroup_minwidth",
  "source_extraction_id": "38ebea9130674fadb31f6f1b20393453",
  "version": 1,
  "memory_type": "entities"
}
-->