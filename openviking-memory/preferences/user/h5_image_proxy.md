- 生产环境 H5 的 `/zs-fym` 图片加载须统一使用 `VITE_APP_API_PROXY`（如 `https://szfweb.szzfcjj.cn:8887`），`resolveMediaUrl` 中误用 `VITE_APP_IMG_PROXY_V1` 拼接会导致图片加载失败
- `src/utils/index.js` 移除 `/zs-fym` 特殊分支统一用 `VITE_APP_API_PROXY`；`vite.config.ts` 本地代理同步指向该变量；`swiperImage.vue` 补充 `:local` 属性绑定
- 验证证据：src=苏住房C/075.md；来源会话：bb5ef4f6-787c-49c9-b071-0b62385878d7

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "h5_image_proxy",
  "source_extraction_id": "873f4ef6e59543cbb812a28511cb69d3",
  "version": 1,
  "memory_type": "preferences"
}
-->