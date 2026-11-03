# V0V2双token清理校验不足致登录与头异常
无锡锡山业主决策H5 中 tokenV0 与 tokenV2 双 token 清理校验不足，导致登录跳转异常与旧 token 残留。

## 问题根因
- home.vue 仅校验 tokenV0，未区分登录类型，导致 V2 登录场景校验缺失
- user.js 的 clear() 未清除 tokenV0，登出后旧 token 残留
- http.ts 在无 token 时仍发送无效的 Authorization 头

## 解决方案
- home.vue 区分登录类型，分别校验 V0+V2 或仅 V2
- user.js clear() 同时清除 token 与 tokenV0
- http.ts 仅在有 token 时才添加 Authorization 头
- login.vue 等补充 token 校验与日志

## 验证与归属
- 验证：src=无锡锡山业主决策H5/001.md
- 涉及文件：src/store/user.js、src/apiV1/index.js、src/apiV1/auth.js、src/http/http.ts、src/pages/common/login.vue、src/pages/index/home.vue、src/api/security.ts、src/pages/login/index.vue
- 所属项目：无锡锡山业主决策H5；来源会话：d1439aa9-599c-4c6a-9480-89632916160e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "dual_token_clear_bug",
  "source_extraction_id": "51c475875d87459b8f21f008402d2f1a",
  "version": 3,
  "memory_type": "entities"
}
-->