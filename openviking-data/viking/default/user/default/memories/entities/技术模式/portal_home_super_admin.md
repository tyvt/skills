# 门户首页超级管理员权限判定
门户首页新增「拥有全部三大业务板块权限即视为超级管理员」的权限判定口径，统一三处逻辑。

## 改动内容
- `src/views/home/config/homeLayout.js` 新增 `hasAllBizSectionPerms(codes)`：已授权板块编码包含全部 3 个（commodityHouseTrade / secondHandHouseTrade / housingRental）即视为管理员
- `src/views/home/mixins/homeDataMixin.js` 新增 computed `isHomeSuperAdmin` = `store.isSuperAdmin || hasAllBizSectionPerms(authorizedSectionCodes)`
- `layoutVariant`、`showHomeNavMenu`（横向导航菜单）、`mergeBusinessFlows`（板块合并）三处统一改用该口径

## 生效逻辑
- `/portal/menu/listPerms` 返回 3 个权限串（commodityHouseTrade / secondHandHouseTrade / leaseBusi...），三码齐全即管理员

## 验证与归属
- 验证证据：extracted source=workbuddy project=门户；场景 2~4 已证明编码正确
- 涉及文件：homeLayout.js、homeDataMixin.js、terminalUser.js、menu.js
- 所属项目：门户；来源会话ID：7a743bfd-c7dc-4a0b-b359-5f6b0f208c13；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_home_super_admin",
  "source_extraction_id": "e094ff0ee23d42e5bdcbc819349ae6e5",
  "version": 1,
  "memory_type": "entities"
}
-->