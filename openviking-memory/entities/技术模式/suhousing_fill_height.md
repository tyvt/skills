# zs-table fill-height 显示修复（苏住房G）
苏住房G 项目 zs-table fill-height 与 auto-height 冲突导致行显示不全的修复记录。

## 问题根因
- 区域树列表页用 table-tr 按每页条数算高度，设 50 条撑爆页面，区域树外层 overflow:hidden 无法滚动
- fill-height 出现「3 条只显示 1 条」是因为 fill-height 与 auto-height 两个 CSS 类同时生效，list-card 样式冲突

## 修复方案
- zs-table.vue 启用 fill-height 时不再叠加 auto-height 类，禁用 shouldSparseAutoHeight，改进高度计算兼容嵌套场景
- 所有区域树列表页改回 fill-height（含 complexChange、complex 等 17 个页面）
- spFeeBill 表格在 tabs 内去掉 table-tr 保持默认自适应；pubParkingRate 保持 auto-height 未改动

## 验证与归属
- 涉及文件：zs-table.vue、mixins/listMixins.js、mixins/table.js、views/property/complexChange/index.vue
- 所属项目：苏住房G；来源会话：b5e42f56-b78e-4251-a412-5cb4a5f7e449

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suhousing_fill_height",
  "source_extraction_id": "65c1d962f20549ccb0401f3b58973a8c",
  "version": 1,
  "memory_type": "entities"
}
-->