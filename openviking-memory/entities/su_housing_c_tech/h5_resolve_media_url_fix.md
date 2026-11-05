# H5媒体资源相对路径缺前导斜杠修复
苏住房C H5 部署在子目录时 `resolveMediaUrl` 返回相对路径导致图片 404，已通过统一加前导 `/` 修复。

## 问题根因
- H5 部署在 `/testh5/pages/index/` 子目录下时，`resolveMediaUrl` 返回不带前导 `/` 的相对路径（如 `zhi2-pro/2025/p/s/p/xxx.png`）
- 浏览器按当前页面路径解析，变成 `https://szf.szzfcjj.cn/testh5/pages/index/zhi2-pro/2025/p/s/p/xxx.png` 导致资源加载失败

## 修复内容
- 在 `resolveMediaUrl` 中，对 `zhi2-pro`、`zhi2-dev`、`zhi2-test`、`zs-fym` 等媒体资源路径统一加上前导 `/`，使其从站点根路径解析
- 修改位置：`zhi2-mobile-shimin/src/utils/index.js` 中的 `resolveMediaUrl` 函数
- 所有通过 `ZsImage`（`:local="false"`）或 `resolveMediaUrl` 加载的服务器图片都会生效

## 验证与归属
- 重新构建并部署 H5 后即可验证
- 涉及文件：`src/utils/index.js`、`vite.config.ts`、`src/components/ZsImage/ZsImage.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：288c6ff2-ac59-4b55-b6ee-a561f76eeba1；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "h5_resolve_media_url_fix",
  "source_extraction_id": "89e86137a57a4163a4616007107418e7",
  "version": 1,
  "memory_type": "entities"
}
-->