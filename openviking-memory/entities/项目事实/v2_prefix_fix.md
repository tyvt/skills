# 门户 v2 API 网关前缀对齐 /api/v2.0
门户及子模块发现类似问题后，统一将 v2 API 网关前缀对齐为 /api/v2.0 并创建分支提交（未 push）。

## 分支与提交
- 分支 cursor/fix-api-v2-prefix（主仓与子模块同名）。
- 子模块 zhi2-web-admin：Commit 374ecad42 — fix: align v2 API gateway prefix with /api/v2.0；文件 README、sign.js、portalApiRewrite、3 个 vue 修复。
- 主仓 门户：Commit f10ff03 — fix: use /api/v2.0 gateway prefix for v2 APIs and nginx proxy；文件 env/.env、deploy/nginx.conf、子模块指针更新。

## 状态
- 当前工作区干净，需要 push 时再处理。

## 涉及文件与归属
- 涉及文件：README、sign.js、env/.env、deploy/nginx.conf、login.vue、portalApiRewrite.js、FileUpload/index.vue 等。
- 项目门户；来源会话 66c9378e-4cf9-4d89-9040-e0be3ea73d99。

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "v2_prefix_fix",
  "source_extraction_id": "1121f675ae5041a1b8d5b2fb551f6b4f",
  "version": 1,
  "memory_type": "entities"
}
-->
