# complexChange概览对齐complex页
园区物管2.0 资产概览页 complexChange/detail.vue 区域概览样式需对齐 complex/detail.vue。

## 问题根因
- 原 complexChange/detail.vue 区域概览样式与 complex/detail.vue 不一致

## 解决方案
- 调整为 DetailTemplate + area-overview-wrapper 并排布局
- stat-column 三列 flex 布局（gap:12px），统一宽度 560px
- 图片 max-width:340px、height:180px、object-fit:cover
- 样式块转为 scoped lang="scss"

## 验证与归属
- 验证证据：园区物管2.0/058.md
- 涉及文件：zhi2-web-admin/src/views/property/complex/detail.vue、complexChange/detail.vue
- 所属项目：园区物管2.0；来源会话：0133feff-e930-40ca-a2a9-5764a587a20a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complexchange_overview",
  "source_extraction_id": "aa50523b6a354b449d9d0ea5f5964e57",
  "version": 1,
  "memory_type": "entities"
}
-->