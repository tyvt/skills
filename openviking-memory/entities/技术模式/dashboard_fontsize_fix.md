# 门户全局CSS压缩html字号导致大屏rem错位修复
在 zhi2-web-admin 的 property/marketMonitor 大屏中，门户全局 CSS 在 1280 至 1440px 把 html 字号压到 14px 导致 rem 错位，已在 created() 锁定 16px 修复。

## 根因
- 门户全局 CSS 在 1280 至 1440px 媒体查询中将 html 字号设为 14px（参考站为 16px）
- Vue 组件原在 mounted() 锁定字号，子组件已按 14px 初始化图表，布局残留

## 解决方案
- 将 html 字号 16px 锁定逻辑从 mounted() 提前到 created()

## 验证
- 1366×768 相似度从 87.8% 升至 96.44% 再至 99.999%，通过门禁
- 所属项目：zhi2-web-admin（姑苏区房产）；来源：2026-11-07 对齐任务

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dashboard_fontsize_fix",
  "source_extraction_id": "0b58a661573d498cac397b128d5ffe38",
  "version": 1,
  "memory_type": "entities"
}
-->