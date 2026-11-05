# 门户叠层详情弹窗标题居中
门户在公共样式中统一将首页二级页叠层详情弹窗标题水平居中，并移除重复局部样式。

## 修改说明
- `portal.scss`（`PortalDetailHeader` 全局样式）将标题 `h2` 由 `inline-block` 改为 `display: block; width: 100%; text-align: center`
- 覆盖商品房、租赁等所有使用 `portal-detail-header` 的叠层弹窗（公司/房屋/预售许可、租赁企业/人员/信用等）
- `PropertyDetailDialog.vue` 删除仅针对预售许可弹窗（`is-permit`）的重复居中样式，逻辑已并入全局
- 关闭按钮仍为右上角绝对定位，不占标题行宽度，标题在弹窗内水平居中

## 验证与归属
- 验证证据：cursor 会话提取；所属项目：门户；来源会话ID：b0657f58-c3a5-4ffd-a3ba-7e97031b4770；代码基线：none
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/portal.scss、zhi2-web-admin/src/views/home/publicPortal/pages/InformationPages.vue、PropertyDetailDialog.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_dialog_title_center",
  "source_extraction_id": "efc4aa0efde14a4f8028a6847cc877b0",
  "version": 1,
  "memory_type": "entities"
}
-->