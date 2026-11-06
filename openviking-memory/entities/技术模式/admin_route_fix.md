# 企业管理菜单路由 path 拼接修复
苏州市房地产监测V3 中菜单详情 path 被拼成 `companyAdmin:/tableid` 导致新增跳转匹配失败，规范路由注册与跳转解析。

## 问题现象
- 菜单详情 path 被拼成 `companyAdmin:/tableid`，新增跳转到 `/add` 时匹配失败，出现「页面未授权或不存在」

## 修复内容
- `permission.js`：路由注册时把 `:/tableid` 规范为 `/:tableid`
- `ruoyi.js`：列表跳转详情/新增时按规范 path 解析并校验可路由性

## 验证与本地操作
- E2E：`npm run test:e2e:company-admin-add` 已通过（管理端选企业后新增 + 企业端直接新增）
- 本地需重新登录或清除 `sessionStorage` 的 `routers` 后重试；E2E 默认连 8082，需改 `e2e/.env.e2e` 的 `E2E_BASE_URL` 或本机 8082 起 dev

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`permission.js`、`ruoyi.js`、`companyAdmin/index.vue`
- 所属项目：苏州市房地产监测V3；来源会话：d698b1b1-35a3-4409-8b54-ec6572857a14

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_route_fix",
  "source_extraction_id": "cef2b075f6c0442896293524a42a0f30",
  "version": 1,
  "memory_type": "entities"
}
-->