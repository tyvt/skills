# 昆山市民H5子目录静态资源路径规则
uni-app H5 部署在子路径时，后端 `/statics` 资源与本地 `static` 目录不能共用同一套相对路径规则，本地资源须返回完整 URL 避免二次拼接。

## 问题背景
- uni-app H5 部署在子路径（如 /wyzx/）时，资源 URL 会被运行时再拼一次部署 base。
- 本地图返回 `/wyzx/static/...` 或 `./static/...` 会变成 `/wyzx/wyzx/static/...`，Network 拿到 HTML 而非图片。
- 后端资源路径 `/statics/xxx` 由 uni 自动加一次 base，可写 `/statics/xxx`。

## 解决方案
- 本地 `static` 目录在 H5 下应通过 `resolveLocalStaticUrl` 返回完整 URL（`origin + 部署前缀 + /static/...`），完整 URL 不会被二次改写。
- 线上课堂封面、菜单图标等需按类型走 `resolveServerAssetUrl` / `resolveLocalStaticUrl`，并在 vConsole 核对只有一个部署前缀且 Content-Type 为 image/*。
- 修复手段：H5 本地资源改完整 URL，与视频 `/statics/` 双前缀问题同类但路径段不同。

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 验证：会话 8ef2aa73 用户反馈在线课堂封面不显示，根因本地图 `/wyzx/static/...` 被 uni 再加 `/wyzx/`。
- 涉及文件：src/utils/resolveAssetUrl.js、src/components/zs-image/zs-image.vue、src/pages_onlineService/onlineIndex.vue、src/pages_onlineService/OnlineCass.vue、vite.config.js、src/env/mp.js。
- 所属项目：昆山市民；代码基线：c8c1c24；来源会话ID：8ef2aa73-67f1-4e34-9fc7-6ad739924137。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "h5_static_path_rule",
  "source_extraction_id": "c532054893f54bbe98ba7697d2d3b474",
  "version": 1,
  "memory_type": "entities"
}
-->