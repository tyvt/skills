# 首页统计条今日蓝本月绿配色模式
门户首页统计条要求今日值蓝色、本月值绿色且同卡并存时，应给数值包 span 挂类名而非整块动态设色。

## 规范要点
- 不要在整块 .stat-value 上用动态 :style 设色
- 模板给今日/本月数值分别包 span 并挂 .stat-today（如 #2b5ea7）、.stat-month（如 #4fc25d）
- 分隔符单独设色（如 #333）
- 在 HomeStatsBar 的 v-for 下各卡表现一致，比按 stat 字段映射颜色更符合产品文案结构

## 验证与归属
- 验证证据：会话 749e4ed1 审查移除 stat-value 上 :style，新增 .stat-today/.stat-month，结论 APPROVE
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeStatCard.vue、HomeStatsBar.vue
- 所属项目：门户；来源会话ID：749e4ed1-e8ba-46db-8cbc-1a669ab74d3f；代码基线：ac6513b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_stat_color",
  "source_extraction_id": "68e834d5fe024c5aae8fd9b4419b2716",
  "version": 1,
  "memory_type": "entities"
}
-->