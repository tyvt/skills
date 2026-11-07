# ZsImage 图片 URL 错误拼接修复
苏住房C 小程序端 `ZsImage` 组件错误拼接图片 URL，导致渲染层报 `Failed to load` 与 500 错误，已修复。

## 问题原因
- 接口返回完整内网地址（如 `http://218.4.168.198:8887/...`），但 `ZsImage` 仍拼接 `IMAGE_BASE`，生成非法地址被微信当本地路径加载
- `resolveMediaUrl` 在小程序端只返回相对路径 `/zhi2-pro/...`，未拼 `IMAGE_BASE`，`<image>` 无法加载

## 修改内容
- `src/utils/index.js` 的 `resolveMediaUrl` 在小程序端拼接 `IMAGE_BASE`，输出完整 HTTPS 地址
- 兼容 `/http://...` 这类误加前导斜杠的地址
- 修改 `src/components/ZsImage/ZsImage.vue` 以正确加载

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`src/utils/index.js`、`src/components/ZsImage/ZsImage.vue`、`src/page-query/components/PropertyCard.vue`、`src/env/mp.js`
- 来源会话ID：d56ce156-0a63-4298-b177-fd3d0430fcf2

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zsimage_url_fix",
  "source_extraction_id": "53b1b22b039b46d69c1ec62dee8a5258",
  "version": 1,
  "memory_type": "entities"
}
-->