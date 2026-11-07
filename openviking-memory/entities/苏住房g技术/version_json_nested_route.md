# 嵌套路由致version.json错且dev未生效
嵌套路由将 version.json 请求解析为错误路径，且 dev 热重启后 public 静态文件未生效。

## 问题根因
- 嵌套路由将 version.json 请求解析为错误路径
- dev 热重启后 public 静态文件未生效

## 修复方案
- 在 zhi2-web-admin/src/utils/version-check.js 推断部署根路径并校验响应
- 在 zhi2-web-admin/vite.config.js 抽取 writeVersionJson 并增 middleware 显式响应 /version.json

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：src=苏住房G/035.md
- 涉及文件：package.json、.workbuddy/memory/2026-09-11.md、index.html、dist/version.json、src/utils/version-check.js、src/main.js、vite.config.js、zhi2-web-admin/package.json
- 所属项目：苏住房G；来源会话ID：13762d7c-a3f0-424d-9ceb-6eb384cdcb36；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "version_json_nested_route",
  "source_extraction_id": "a81b0be46c114c94bdf5b0efa2e5f31f",
  "version": 1,
  "memory_type": "entities"
}
-->