# 经纪角色优先推断首页布局
`inferTerminalType` 与 `resolveHomeLayoutVariant` 原先忽略经纪企业角色致首页误判，已改为企业角色优先使用 `broker` 布局。

## 根因
- `inferTerminalType` 过度信任用户详情里的 `terminalType`（G/A），忽略 `kfqy`/`jjjg`/`zljg` 等企业 roleKey
- `resolveHomeLayoutVariant` 只看 `portal:bizSection:*` 板块权限，无板块时 B 端默认 developer 而非 broker

## 修复要点
- `terminalUser.js` 企业角色前缀优先推断 B 端，并暴露 `hasBrokerHomeRole`（`jjjg`、`zljg`）
- `homeLayout.js` 解析布局时传入 `store.user.roles` 的 `roleKey`，**jjjg/zljg 优先于「仅商品房」权限**，无板块权限的经纪类角色仍用 `broker` 皮肤
- `homeDataMixin.js` 把 roles 传入上述逻辑

## 验收标准
- 经纪机构账号应见侧栏版（存量房+住房租赁、经纪统计条），而非 admin/developer 错皮

## 涉及文件
- zhi2-web-admin/src/utils/terminalUser.js
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- zhi2-web-admin/src/store/modules/user.js
- zhi2-web-admin/src/utils/portalLayout.js
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/api/portal/user.js
- zhi2-web-admin/src/permission.js

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：用户提供经纪机构测试账号并反馈首页判断不对；结论两点根因（terminalType 误判、仅板块权限选布局），已改 terminalUser/homeLayout/homeDataMixin 使 jjjg/zljg 优先 broker 布局；另 src=门户/037.md
- 来源会话ID：78e839c9-bf59-41e5-bc24-89a6b50ab45b；代码基线：ac6513b；所属项目：门户

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "broker_role_home_layout",
  "source_extraction_id": "64bb4d84a5b24a1c9ba1a0d617819bfd",
  "version": 2,
  "memory_type": "entities"
}
-->