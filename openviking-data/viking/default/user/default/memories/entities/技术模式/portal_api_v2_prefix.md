# 门户 v2 网关前缀 /api/v2.0 三处对齐
门户 monorepo 中部分接口缺 `/api` 前缀或走旧网关致 404，需父仓 env/nginx 与子模块 rewrite/sign 同步修改。

## 现象
- listTree、上传等请求 URL 缺 `/api` 前缀或仍走旧网关路径，页面 404 或网关拒收

## 根因
- 父仓管 env/.env 与 deploy/nginx.conf，子模块含 portalApiRewrite.js、public/sign.js 及 vue 硬编码 basePath，只改一处会漂移
- 已知 #1793/#1828 覆盖菜单路由重写，#1189/#1823 覆盖 env 相对路径，未覆盖 listTree 漏改 + 主仓 nginx 与子模块 sign 同步提交

## 解决方案
- 父仓 env/.env 与 deploy/nginx.conf 统一前缀 `/api/v2.0`
- 子模块 portalApiRewrite.js 全量扫 v2 接口族，懒加载 path 带前导 `/`
- sign.js、FileUpload、登录 vue、README 中 API 前缀常量同步改
- 主仓与子模块各建分支分别提交，子模块指针再进主仓 commit

## 验收
- 抓 listTree、上传、登录三类请求，浏览器最终 URL 均含同一 gateway 前缀，nginx 日志无 strip 错误

## 涉及文件
- env/.env
- deploy/nginx.conf
- zhi2-web-admin/src/utils/portalApiRewrite.js
- zhi2-web-admin/public/sign.js
- zhi2-web-admin/src/utils/request.js
- zhi2-web-admin/src/components/FileUpload/index.vue
- zhi2-web-admin/src/views/login.vue

## 关联信息
- 所属项目：门户；来源会话 ID：66c9378e-4cf9-4d89-9040-e0be3ea73d99；代码基线：3e8673b；子模块 commit 374ecad，主仓 commit f10ff03

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_api_v2_prefix",
  "source_extraction_id": "54e46530937a4ae2aa43b2926881ee38",
  "version": 1,
  "memory_type": "entities"
}
-->
