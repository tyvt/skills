# 未经 InnerLink 标准化的外部链接菜单导致 404
外部菜单路由未遵循 InnerLink 规范，导致路由守卫拦截并报 404。

## 问题根因
- 菜单的 `path` 为 `https://` 时与内部 Vue Router 不匹配。
- `sso/bTerminalRedirect/index` 在 `permission.js` 中未经过 `InnerLink` 路由标准化，路由守卫将其作为未授权拦截至 `/404`。

## 解决方案
- 在 `permission.js` 中，将 `bTerminalRedirect` 纳入 iframe 路由标准化。
- 调整 `RecursiveMenu` 在该组件中使用 `router-link`，避免打开新窗口。

## 验证与文件
- 验证: src=无锡市区G/002.md
- 涉及文件: api/security/oauth2.js, sso/bTerminalRedirect/index.vue, property/culturalTourism/index.vue, store/permission.js, api/index.js, api/property/cultourPlatform.js, components/iFrame/index.vue, InnerLink/index.vue
- 会话: 2c02c8f7-aee0-47dd-b23d-d8d8f94a007a; baseline: none

## 验证与归属
- 所属项目：无锡市区G
- 验证证据：extracted source=cursor project=无锡市区G
- 来源会话：2c02c8f7-aee0-47dd-b23d-d8d8f94a007a


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "external_menu_404",
  "source_extraction_id": "dddbe66f1d9f49389bae575d92bc71c9",
  "version": 1,
  "memory_type": "entities"
}
-->
