# 公开门户二级页详情字段对齐方案
公开门户（publicPortal）机构/人员等详情采用四列网格 + display:contents + subgrid 解决标签值错位。

## 问题根因
- 混用全宽行与双列行，双列用两个 50% flex 格各自排 label/value，导致左右列值起点不一致、窄列文字叠在标签上
- 根因是两套标签宽度 + 双列 flex

## 解决方案
- 字段区改四列网格：`180px | 值 | 180px | 值`
- 双列项容器用 `display: contents` 让 dt/dd 直接落入四列成对排列
- 全宽项占满一行，优先用 `grid-template-columns: subgrid` 与父网格对齐（不支持时回退相同四列定义），值从第 2 列跨到行末，与双列左侧值 x 起点一致
- 标签列宽度需足够容纳「统一社会信用代码」等长文案避免换行
- ≤1200px 断点调整时勿把机构详情误收成两列导致再次错位

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 用户反馈字段对齐出问题后改四列网格，要求刷新验证全宽行与双列左侧值纵向对齐
- 涉及 zhi2-web-admin/src/views/home/publicPortal/portal.scss、PropertyPages.vue、BrokerPages.vue、PropertyDetailDialog.vue、RentalDetailDialog.vue
- 所属项目：门户；来源会话 f3136e73-1172-459f-872c-cc4efe5d4b2f；代码基线 e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "public_portal_detail_grid",
  "source_extraction_id": "06deb50548ec4b1da053721f776eb879",
  "version": 1,
  "memory_type": "entities"
}
-->