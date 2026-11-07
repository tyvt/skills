# 子路径版本检查BASE_URL相对路径
园区物管2.0 在子路径部署下，前端版本检查必须改用 BASE_URL 相对路径而非绝对 /version.json。
## 问题背景
- vite.config.js 的 base 为 "./"、应用部署在子路径（如 /sz/）且路由为 hash 模式时，绝对路径 /version.json 请求打到站点根，检查失败或拿错文件。
- hash 路由下直接用 location 拼 URL 会把 #/xxx 当路径拼错。
## 解决方案
- 默认路径写成 `${import.meta.env.BASE_URL}version.json`，随 base 解析为 ./version.json。
- fetch 前用 new URL(this.versionUrl, window.location.href) 把相对路径解析成完整 URL，规避 hash 路由拼接问题。
- 所有 public 目录静态文件轮询类需求（版本检查、配置热更）都应遵循此约定。
## 验证与归属
- 验证：会话 6e40a9a4 中 version-check.js 由 /version.json 改为 BASE_URL 相对路径 + new URL 解析，部署 /sz/ 时正确请求 /sz/version.json。
- 涉及文件：src/utils/version-check.js、public/version.json、src/utils/resolveServerAssetUrl.js、vite.config.js；所属项目：园区物管2.0；代码基线：f00310232。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "version_base_url",
  "source_extraction_id": "fe0dde00dbf24143868b76101755b35e",
  "version": 1,
  "memory_type": "entities"
}
-->