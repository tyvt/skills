# 门户表格标题
楼幢页面中空的表格标题阻碍了表头的显示。

## 描述
- `PortalTable` 仅在有 `title` 或导出时渲染工具栏；楼幢页面中 `tableTitle` 为空导致标题缺失。
- 统一标题：PropertyPages 楼幢→楼幢列表, BrokerPages 经纪人→经纪人列表, RentalPages 企业→企业列表, InformationPages 公告→公告列表.

## 文件
- `PortalTable.vue`, `PropertyPages.vue`, `InformationPages.vue`, `BrokerPages.vue`, `RentalPages.vue`, `UnifiedLogin.vue`, `README.md`, `tests/e2e/public-portal-interactions.spec.ts`

## 验证
- 源会话：`889b9339-9da0-4b8d-a47b-2acdb56919b7`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_table_title",
  "source_extraction_id": "89580cadf96140df80249b734eb2a264",
  "version": 1,
  "memory_type": "entities"
}
-->