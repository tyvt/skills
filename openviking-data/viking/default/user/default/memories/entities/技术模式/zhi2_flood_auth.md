# 苏住房防汛C端登录鉴权模型
zhi2-mobile-query-h5-c（苏住房防汛C端移动查询H5）的登录与 token 鉴权技术模式，后端为 RuoYi 风格。

## 存储与状态
- Token 以 key `flood-token-v1`、缓存用户以 key `flood-login-user-v1` 持久化在 localStorage
- App.vue 原先盲目信任 token（不校验即进首页）
- 2026-11-12 修复：App.vue 在启动时先调用 `isTokenAlive()` → `/v2.0/security/auth/getInfo` 校验 token；通过则进首页，HTTP 401/403 则 clearToken/clearLoginUser 并停在登录页，isDemoDataMode 跳过校验，网络异常或返回非 2xx 保守判为有效（不清空会话）

## 接口契约
- 登录：`POST /v2.0/security/auth/login`（useFloodStore().login 调用），响应 data 含 nickName/userName/userId/phone/roles/roleKeys
- 校验：`POST /v2.0/security/auth/getInfo`（RuoYi 风格配套校验端点）
- request.ts 的 management-auth 段（lines 84–116）提供 getLoginUser / clearLoginUser 函数

## 验证与归属
- 所属项目：苏住房防汛C端（GitLab suzhufang-fe/zhi2-mobile-query-h5-c）
- 来源：2026-11-12 bug 6502 token 盲信修复任务
- 关联禅道 bug 6502（product=79, project=141, execution=142, openedBy=lichandan, assignedTo=tiany）
- 修复提交 1446391 已推送 origin/dev（仅改 src/App.vue）
- 2026-11-14 401 处理细化：原拦截未生效因 demo 登录绕过启动时令牌校验、请求层只检查 HTTP 状态码未处理 HTTP 200 响应体 code:401；现 request.ts:79 识别两种 401，App.vue:50 将鉴权失败识别为令牌无效（提交 e925eec6 本地未推送，详见项目 修复记录）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_flood_auth",
  "source_extraction_id": "5873dc1ad52440c6ab2ff23954a7e50c",
  "version": 3,
  "memory_type": "entities"
}
-->