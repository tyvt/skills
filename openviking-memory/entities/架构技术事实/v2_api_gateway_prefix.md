# v2 API 网关前缀与 nginx 代理
项目 v2 接口统一使用 /api/v2.0 网关前缀并由 nginx 代理，合并修复分支时需同步相关配置与子模块指针。

## 关键事实
- v2 接口统一走 /api/v2.0 网关前缀（nginx proxy）。
- 合并修复分支到 develop/v2.6.2-portal 时必须同步 deploy/nginx.conf、env/.env 与 zhi2-web-admin 子模块指针。
- 若前缀不对或子模块不一致会导致接口 404/网关错误。
- 验证证据：会话 5cdf25d8（005.md）fix 合并到 develop/v2.6.2-portal，使用 /api/v2.0 gateway prefix。

## 涉及文件
- deploy/nginx.conf
- env/.env
- zhi2-web-admin 子模块指针

## 归属与来源
- 所属项目：园区物管2.0（zhi2-web-admin）
- 来源会话ID：5cdf25d8-ea02-4547-8d90-647c4d438c7b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "架构技术事实",
  "name": "v2_api_gateway_prefix",
  "source_extraction_id": "b21f97ce3f0d42898d28fa313bf40a83",
  "version": 1,
  "memory_type": "entities"
}
-->