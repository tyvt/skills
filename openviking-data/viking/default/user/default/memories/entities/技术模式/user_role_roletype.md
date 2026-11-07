# 用户角色下拉误传roleType致缺失
园区公共收益(zhi2-web-admin)用户管理角色下拉因误传 roleType 仅返回管理端角色。

## 问题根因
- `system/user/detail.vue` 加载角色下拉时调 `/system/role/roles` 传 `roleType: '1'`，仅返管理端角色，业务端角色缺失

## 解决方案
- 新增 `loadRoleOptions()` 不传 `roleType` 以获取全部角色
- 新增与编辑用户时统一调用 `loadRoleOptions()` 加载完整角色列表

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：src/views/system/user/detail.vue、src/views/system/role/index.vue、src/views/system/role/detail.vue、src/api/flowable/definition.js、src/views/tool/definition/detail.vue、src/mixins/detailMixins.js
- 来源会话ID：2227b821-282f-4858-9970-4b2a43f4aebd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "user_role_roletype",
  "source_extraction_id": "ff320310ed4d44fca7c9fe7878836a34",
  "version": 1,
  "memory_type": "entities"
}
-->