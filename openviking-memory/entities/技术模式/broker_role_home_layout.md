# 经纪角色优先推断首页布局
`inferTerminalType` 与 `resolveHomeLayoutVariant` 原先忽略经纪企业角色致首页误判，已改为企业角色优先使用 `broker` 布局。
## 根因
- `inferTerminalType` 信任接口 `terminalType` 忽略 `jjjg_*` 企业角色
- `resolveHomeLayoutVariant` 仅认 `portal:bizSection:*` 权限致经纪机构首页误判
## 修复要点
- `terminalUser.js` 企业角色（`kfqy`/`jjjg`/`zljg`）优先推断 B 端并增 `hasBrokerHomeRole`
- `homeLayout.js` 传 `roleKeys` 令经纪角色优先用 `broker` 布局
- `homeDataMixin.js` 注入 `store.user.roles` 的 `roleKey`
## 涉及文件
- zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- zhi2-web-admin/src/utils/terminalUser.js
- zhi2-web-admin/src/utils/portalLayout.js
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/store/modules/user.js
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/api/portal/user.js
- zhi2-web-admin/src/permission.js
## 验证与归属
- 验证证据：src=门户/037.md
- 来源会话ID：78e839c9-bf59-41e5-bc24-89a6b50ab45b；代码基线：none；所属项目：门户

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "broker_role_home_layout",
  "source_extraction_id": "6fe27462e4a74952add80fdb66474b9b",
  "version": 1,
  "memory_type": "entities"
}
-->