# 房产监测环比百分比全局两位小数
zhi2-web-admin 房产监测页切换区县后 KPI 卡片环比出现浮点长尾（如 +0.799999999999998%），需全局保留两位小数。

## 问题根因
- 区县按比例换算（如 dist.commercialMoM - 0.4）产生浮点长尾，模板直接 {{ xMoM }}% 未格式化
- KpiCards 12 处、AgencyPanel 3 处、DetailModalA/C 明细弹窗环比均直接输出

## 解决方案
- 各组件新增 fmtPct(v) 方法：Number(v).toFixed(2) 并带正负号；模板 {{ xMoM }}% 改为 {{ fmtPct(xMoM) }}
- 仅「环比」动态百分比统一两位；占比类（饼图区县占比 (3%)、面积段份额 23.3%）保持原设计不强制两位，避免偏离原版 UI

## 验证与归属
- 验证：会话 2026-11-04，切「姑苏区」环比显示 +0.80% 等正常两位、无长尾；E2E 29 项通过
- 涉及文件：zhi2-web-admin/src/views/property/marketMonitor/components/KpiCards.vue、AgencyPanel.vue、DetailModalA.vue、DetailModalC.vue
- 所属项目：zhi2-web-admin 房产监测；来源会话：2026-11-04

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mm_fmt_pct",
  "source_extraction_id": "c0ad0a9d312d40b6a54ce9d51b9c054a",
  "version": 1,
  "memory_type": "entities"
}
-->