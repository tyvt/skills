# 门户主题色统一商品房蓝
publicPortal 二级页与首页弹窗主题色经 `resolvePortalAccent` 统一写入 `--portal-accent`，统一返回 `PORTAL_BLUE`（`#3f669c`）。

## 样式规范
- 首页弹窗 PortalDialogHost 与 publicPortal 二级页主题色经 `portalTheme.js` 的 `resolvePortalAccent` 写入 `--portal-accent`
- 统一返回 `PORTAL_BLUE`（`#3f669c`）可使横幅、按钮、分页、面包屑、详情弹窗等与商品房蓝一致
- 登录页菜单图标分板块色不在该函数内

## 验证与归属
- 验证证据：会话 1be5db23：resolvePortalAccent 不再按板块返回存量房绿/租赁橙
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/portalTheme.js、zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- 所属项目：门户；来源会话ID：1be5db23-7deb-4d3c-9d27-0292fc8a2bb8；代码基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_accent_blue",
  "source_extraction_id": "dd05c04674b048bf80a36b361c86a7fd",
  "version": 1,
  "memory_type": "entities"
}
-->