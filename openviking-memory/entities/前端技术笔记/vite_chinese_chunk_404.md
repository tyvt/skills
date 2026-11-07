# Vite中文文件名chunk404
园区物管2.0 中因中文命名静态资源被 Vite 打成中文名 chunk，子路径/CDN 部署时 404 伪装成动态模块加载失败的问题与修复。

## 现象
- 生产环境报 TypeError: Failed to fetch dynamically imported module（如 ../assets/index-BJlYXbMW.js），本地构建正常。
- 控制台请求形如 .../assets/%E4%BC%9A%E6%89%80-xxx.js（URL 编码中文），是 Vite 为被 import 的静态资源模块打出的小 JS chunk（再导出图片 URL），chunk 名来自源文件路径。

## 根因
- 页面用中文文件名 import PNG（如 会所.png、帐篷租赁.png），部署在 /sz/ 子路径且部分 Nginx/CDN 对 URL 编码中文路径不友好，导致 404 进而触发顶层动态模块加载失败。

## 解决方案
- 源码所有中文命名静态资源统一改英文短名（会所.png→club.png），import 路径同步替换，业务层中文 key 映射表（如 STAT_ICON_MAP）无需改动。
- 重建后确认 dist/assets 不再出现中文命名 chunk。
- 若部署后仅主入口 chunk 仍报 Failed to fetch，多半是整包未同步完/CDN 或浏览器缓存旧 index.html 指向新 hash/网关只转发部分静态文件，处理办法全量发布 dist 并强刷/清 CDN，保证 index.html 与各 assets/*.js 来自同一次构建。

## 涉及文件
- src/views/benefit/statisticsMap/images/、src/assets/images/benefit/、src/views/benefit/statisticsMap/components/operatingAssets.vue
- 所属项目：园区物管2.0（代码基线 f00310232，来源会话 d9094763-20ae-4fff-969b-13dc3c307504）

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "vite_chinese_chunk_404",
  "source_extraction_id": "55c1f8ecd97649acabbcbd94a8dbf7c0",
  "version": 1,
  "memory_type": "entities"
}
-->
