# 门户表格标题
楼幢页面中空的表格标题阻碍了表头的显示。

## 描述
- `PortalTable` 仅在有 `title` 或导出时渲染工具栏；楼幢页面中 `tableTitle` 为空导致标题缺失。
- 完整标题映射见下节
## 标题规则
- PropertyPages：楼幢→楼幢列表；房屋→房屋列表；预售许可→许可列表；楼盘→项目列表
- BrokerPages：经纪人→经纪人列表；机构下人员→经纪人员；门店→门店列表；机构→机构列表
- RentalPages：开业→企业列表；人员→人员列表；信用→信用记录列表
- InformationPages：公示公告→公告列表（原先误写为「项目列表」）
- 详情页里的「交易记录」等原本就有标题，未改

## 文件
- `PortalTable.vue`, `PropertyPages.vue`, `InformationPages.vue`, `BrokerPages.vue`, `RentalPages.vue`, `UnifiedLogin.vue`, `README.md`, `tests/e2e/public-portal-interactions.spec.ts`

## 验证
- 刷新后进入「可售楼盘展示 → 项目 → 楼幢列表」，左上角应显示「楼幢列表」，与面包屑一致
- 源会话：`889b9339-9da0-4b8d-a47b-2acdb56919b7`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_table_title",
  "source_extraction_id": "8ea22524996d48c6aef67b1869dae806",
  "version": 2,
  "memory_type": "entities"
}
-->