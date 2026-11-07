# 昆山市民H5资源与接口相对路径规范
H5 嵌入/子目录场景下，接口与媒体地址统一走相对路径（无前导斜杠、不加 /h5 段），小程序端仍用 IMAGE_BASE 拼完整域名。

## 问题背景
- H5 嵌入/子目录场景下，接口与媒体地址若带前导 `/` 或人为加 `/h5` 段，请求会落到站点根。
- 早期用 `VITE_IMAGE_URL` 拼绝对域名，H5 下不适配子路径部署。

## 解决方案
- 接口与媒体地址统一走相对路径（如 `statics/xxx`、`./static/images/...`），不要前导 `/`，不要加 `/h5` 段。
- `src/env/mp.js` 在 H5 将 `IMAGE_BASE` 置空，业务不再用 `VITE_IMAGE_URL` 拼绝对域名；小程序端仍用 `IMAGE_BASE` 拼完整域名。
- 新增 `resolveServerAssetUrl` / `resolveLocalStaticUrl` 按 `#ifdef H5` 分支；`ZsImage` 与附件/头像/富文本图片统一调用。
- 本地图标用 `:src="staticUrl('...')"` 动态绑定，避免编译期写死绝对路径；开发环境 `vite.config.js` 保留 `/statics` 代理到 `VITE_IMAGE_URL` 预览后端静态资源。

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 验证：会话 c0160254 用户明确要求接口前缀相对路径、H5 用、不带前导 `/`、不加 `/h5`，网络图与本地图都要相对。
- 涉及文件：src/utils/resolveAssetUrl.js、src/env/mp.js、src/request/index.js、vite.config.js、.env.development、.env.production。
- 所属项目：昆山市民；代码基线：bf3efcf；来源会话ID：c0160254-f57e-4417-b5f5-15ff6a735c30。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "h5_relative_url_pattern",
  "source_extraction_id": "c532054893f54bbe98ba7697d2d3b474",
  "version": 1,
  "memory_type": "entities"
}
-->