# 企业管理变更跳转失败修复
苏州市房地产监测V3 修复企业管理变更（companyAdminChange）发起变更后跳转报错问题。

## 问题根因
- `getLast` 在 HTTP 200 / code:200 时已成功，失败发生在下一步跳转
- `handleStartChange` 用 `getRouterPathByFilePath('company/companyAdminChange/.../detail')` 解析路由，未传 `busCode`（如开发企业 `qyglybg`）
- 动态菜单里变更详情多为 hidden，仅靠 `filePath` 常匹配不到
- 匹配失败 `getRouterPathByFilePath` 抛错或拼出空 path，`router.push` 再失败
- 外层空 `catch` 统一提示「发起变更失败，请稍后重试」，实为路由未登记/未解析

## 修复方案
- `detail.vue` 用 `buildNavigationByFilePath` 按 `filePath` + `busCode` + `pathHint` + `routeId` 生成跳转（支持 `:tableid` 与命名路由 + `query.id`）
- `resolveChangeId(res.data, res)` 兼容多种返回结构
- `ruoyi.js` 对应 `get` 方法调整

## 涉及文件与归属
- 涉及：`detail.vue`、`ruoyi.js`、`resolveChangeId.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：a6708ea4-5668-470a-8195-2f5b2f48cf71；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_admin_change_nav_fix",
  "source_extraction_id": "332cc5b2c96c4093aff81c5d14018372",
  "version": 1,
  "memory_type": "entities"
}
-->