# 门户 v2 前缀与 nginx 代理对齐缺陷
zhi2-web-admin 子模块与主仓「门户」的 v2 API 网关前缀未统一对齐 /api/v2.0 及 nginx 代理。

## 现象
- 子模块与主仓 v2 API 网关前缀未对齐 /api/v2.0
- nginx 代理配置与前端前缀不一致

## 修复要点
- 子模块修改 README、sign.js、portalApiRewrite 及相关 vue 文件（commit 374ecad42）
- 主仓调整 env/.env、deploy/nginx.conf 及子模块指针（commit f10ff03）

## 涉及文件
- zhi2-web-admin/src/views/login.vue
- zhi2-web-admin/src/utils/portalApiRewrite.js
- deploy/nginx.conf
- zhi2-web-admin/src/components/FileUpload/index.vue
- zhi2-web-admin/src/utils/request.js
- zhi2-web-admin/src/vite.config.js
- zhi2-web-admin/src/views/portal/application/detail.vue
- zhi2-web-admin/src/utils/resolveServerAssetUrl.js

## 关联信息
- 所属项目：门户；来源会话 ID：66c9378e-4cf9-4d89-9040-e0be3ea73d99；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_v2_prefix",
  "source_extraction_id": "e536ad8384c04e189368e44c4e15b854",
  "version": 1,
  "memory_type": "entities"
}
-->
