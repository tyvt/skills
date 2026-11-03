# 门户用户角色权限
门户 B 端登录后通过 Vuex GetInfo 汇总角色权限，前端不维护硬编码角色枚举。

## 权限来源
- 登录后 Vuex `GetInfo` 调用 `api/portal/user.js` 的 `getPortalUserInfo()`，按用户 `roleIds` 拉取各角色 `roleKey` 汇总为 `roles[]` 与 `permissions[]`。

## 已知角色标识
- `admin` 超管：`permissions` 含 `*:*:*`。
- 无角色时兜底 `ROLE_DEFAULT`。

## 开发规范
- 条件渲染、菜单与 `v-hasPermi` 应依赖接口下发的 permissions/roles，不要在前端维护与后端不一致的常量列表。

## 验证与归属
- 验证证据：会话 57a9cd8c-dd87-4fd1-83f5-4acbe116d94f 探索第 3 节「角色/权限来源（无前端枚举）」。
- 涉及文件：zhi2-web-admin/src/store/modules/user.js、zhi2-web-admin/src/api/portal/user.js、zhi2-web-admin/src/store/modules/permission.js。
- 所属项目：门户；代码基线 a1e5beb。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_user_roles",
  "source_extraction_id": "79033622a7cb4a268c141fd5ce945446",
  "version": 1,
  "memory_type": "entities"
}
-->