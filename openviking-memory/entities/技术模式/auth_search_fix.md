# 用户授权详情按物业区域名称搜索修复
苏住房G 行业管理-用户及授权模块中，用户授权详情按物业管理区域名称搜索不生效的问题已修复。

## 问题根因
- 用户授权详情页「物业管理区域信息」子表搜索参数错误，`queryParams.name` 与后端接口不一致

## 修复方案
- 在 `operatorAuthRangeTable.vue` 中将 `queryParams` 的 `name` 改为 `projectName`
- 搜索表单项 `model` 从 `'name'` 改为 `'projectName'`
- 修改后请求参数变为 `projectName=xxx`，与后端接口一致

## 验证与归属
- 验证：按物业管理区域名称搜索可正常检索
- 涉及文件：`zhi2-web-admin/src/views/company/userManagement/operatorAuth/operatorAuthRangeTable.vue`
- 所属项目：苏住房G；来源会话：2c9ae661-5e3b-4099-bf4c-ac312e7a2647；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "auth_search_fix",
  "source_extraction_id": "ae55cc6b3935446799466a4196796bb8",
  "version": 1,
  "memory_type": "entities"
}
-->