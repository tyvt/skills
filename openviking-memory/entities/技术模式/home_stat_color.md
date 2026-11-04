# 首页统计卡今日橙本月蓝配色模式
门户首页统计卡要求今日值橙色、本月值蓝色且同卡并存时，应给数值包 span 挂类名而非整块动态设色。

## 规范要点
- 不要在整块 .stat-value 上用动态 :style 设色
- 模板给今日/本月数值分别包 span 并挂 .stat-today（橙色 #F5A623，与首页住房租赁板块主题色一致）、.stat-month（蓝色 #2B5EA7）
- 分隔符单独设色（如 #333）
- 在 HomeStatsBar 的 v-for 下各卡表现一致，比按 stat 字段映射颜色更符合产品文案结构

## 验证与归属
- 技术实现证据：会话 749e4ed1 审查移除 stat-value 上 :style，新增 .stat-today/.stat-month，结论 APPROVE
- 配色变更证据：会话 0aa11988 用户先提蓝/绿再改为「今日橙色、本月蓝色」并已写入 HomeStatCard.vue
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeStatCard.vue、HomeStatsBar.vue
- 所属项目：门户；来源会话ID：0aa11988-ce1f-4e89-9c19-4e0a6ad2e936；代码基线：ac6513b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_stat_color",
  "source_extraction_id": "33360d4db96f4c3997d000676965140a",
  "version": 2,
  "memory_type": "entities"
}
-->