# 经纪机构账号首页误判修复
门户系统修正了经纪机构账号首页被误判为管理端或开发企业布局的问题，通过调整终端类型推断与布局解析逻辑。

## 问题原因
- `inferTerminalType` 过于信任接口：用户详情 `terminalType` 为 G/A 时，即使 `jjjg_*` 企业角色也不会当成 B 端，易走管理端首页。
- `resolveHomeLayoutVariant` 只认业务板块权限：无 `portal:bizSection:*` 时，B 端落到默认开发企业布局，而非经纪机构侧栏首页。

## 修改说明
- `terminalUser.js`：企业角色（`kfqy`/`jjjg`/`zljg`）优先推断为 B 端；增加 `hasBrokerHomeRole` 等辅助函数。
- `homeLayout.js`：解析布局传入 `roleKeys`；`jjjg`/`zljg` 优先于「仅商品房」权限，无板块权限仍用 `broker` 布局。
- `homeDataMixin.js`：把 `store.user.roles`（来自 `/portal/role/detail` 的 `roleKey`）传给上述逻辑。

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 涉及文件：`terminalUser.js`、`homeLayout.js`、`homeDataMixin.js`、`portalLayout.js` 等
- 来源会话ID：78e839c9-bf59-41e5-bc24-89a6b50ab45b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "broker_home_layout_fix",
  "source_extraction_id": "e97aa4d6101849998a56240336a9ee93",
  "version": 1,
  "memory_type": "entities"
}
-->