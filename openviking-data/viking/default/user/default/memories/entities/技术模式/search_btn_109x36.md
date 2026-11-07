# 门户公共搜索栏按钮宽高统一 109x36
portal.scss 新增 .portal-search-actions .portal-button 固定 109×36 尺寸，统一全二级页搜索按钮规格。

## 样式规则
- .portal-search-actions .portal-button 固定 width:109px; height:36px
- 覆盖通用 80×40 样式
- PropertyPages.vue 的 property-search-actions 改为同尺寸并去内边距
- 统一全二级页搜索按钮规格

## 验证与归属
- 验证证据：extracted source=zcode session=session_2d242ceaa0db85cc64a462b79b6a9d87
- 涉及文件：portal.scss ; PropertyPages.vue
- 来源会话ID：session_2d242ceaa0db85cc64a462b79b6a9d87

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_btn_109x36",
  "source_extraction_id": "33f4963f45204d3a81f502bef31db9dd",
  "version": 1,
  "memory_type": "entities"
}
-->