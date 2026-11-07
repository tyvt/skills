# 门户菜单相对路径绝对化修复
若依式菜单在 Vue Router 3 中相对 path 会被相对当前路由解析，门户新增 `toRouterAbsolutePath` 统一前导斜杠。

## 问题根因
- `router-link`/`router.push` 对不以 `/` 开头的 `to` 会相对当前路由解析（如在 `/system/...` 下 `system/user` 会变成 `/system/system/user`）
- 遗留坑：若 `isActive` 仍用原始 `menuItem.path` 比较而未做同样绝对化，会出现「能跳到 `/system/user` 但菜单不高亮」

## 修复要点
- `menuVisibility.js` 新增 `toRouterAbsolutePath`（补前导 `/`、折叠重复斜杠；整串 `http(s)://` 原样返回）
- `buildNavbarChildrenMenus` 与 `RecursiveMenu.vue` 的 `handleClick`/`getLinkProps` 在拼接后统一调用
- HTTP 外链分支仍走 `href`/`target`，`isHttpUrl` 为真时不改写 path
- 无子菜单叶子项的激活判断须与跳转共用 `toRouterAbsolutePath`

## 涉及文件
- zhi2-web-admin/src/utils/menuVisibility.js
- zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue

## 验证与归属
- 验证证据：会话 0b648e95 审查 menuVisibility.js 与 RecursiveMenu.vue 的 toRouterAbsolutePath 修复；确认扁平路径 system/user 与顶栏拼接正确、外链不误加斜杠；MEDIUM 发现 isActive 未同步绝对路径导致激活态与跳转不一致
- 所属项目：门户；来源会话ID：0b648e95-ebc1-4042-9f42-3def8cb4501f；代码基线：ac6513b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "menu_absolute_path",
  "source_extraction_id": "64bb4d84a5b24a1c9ba1a0d617819bfd",
  "version": 1,
  "memory_type": "entities"
}
-->