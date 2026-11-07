# 门户 PortalBreadcrumb 盒高与间距修正
PortalBreadcrumb.vue 盒高由 40px 改为 30px 并调整外边距，解决标题栏到面包屑视觉间距过大的问题。

## 问题根因
- 原盒高 40px 且内容区上边距 26px，致标题栏到面包屑视觉间距约 33px 过大

## 样式规则
- 盒高设为 30px
- 设 margin: -4px 0 14px，上方间距收至 22px、下方 14px
- 上下合计不变故卡片布局零位移

## 验证与归属
- 验证证据：extracted source=zcode session=session_3d01b16252048fb94546dd89cb938bd8
- 涉及文件：PortalBreadcrumb.vue
- 来源会话ID：session_3d01b16252048fb94546dd89cb938bd8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "breadcrumb_box_fix",
  "source_extraction_id": "33f4963f45204d3a81f502bef31db9dd",
  "version": 1,
  "memory_type": "entities"
}
-->