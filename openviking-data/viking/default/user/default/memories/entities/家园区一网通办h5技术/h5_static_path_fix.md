# 家园区一网通办H5静态路径修复
该项目的 uni-app H5 部署在 /wechatapph5/ 子路径，曾因 vite base 绝对化导致静态资源 404，现已统一改为相对路径。

## 问题根因
- 提交 184eeda（ty，2026-02-12）将 vite base 从 './' 改为 '/wechatapph5'，使资源变为绝对路径。
- 线上构建未读取 .env.production，base 回落为 '/'，导致请求 https://sipps.sipac.gov.cn/assets/... 404 白屏。
- 源码中部分组件属性与内联样式裸写 ../../static/...、../static/...，不经过 uni 的 getRealPath 归一化，子路径下同样 404。

## 解决方案
- vite.config.ts 的 base 改为 VITE_APP_PUBLIC_BASE || './'，env/.env.production 设 VITE_APP_PUBLIC_BASE = './'。
- index.html 中 tracker.js 引用改回 ./static/js/tracker.js。
- 将 pages-my/house/add.vue、pages/project.vue、pages-survey/house.vue、pages-my/components/personCard/index.vue 中的裸静态路径改为 import 资源绑定。

## 验证与归属
- 本地 nginx 8092 复刻 /wechatapph5/ 子路径，Playwright 实测静态资源 404 为 0，tabBar 图标正常加载。
- 修复合并至 dev-v0（提交 6fdb901，merge d124ed0）并推送远程。
- 所属项目：家园区一网通办H5（zhi2-mobile-shimin-h5）；来源会话：2026-11-05 调试会话。


<!-- MEMORY_FIELDS
{
  "category": "家园区一网通办H5技术",
  "name": "h5_static_path_fix",
  "source_extraction_id": "731d4ec5f48a4ebbb9c142a325acd25a",
  "version": 1,
  "memory_type": "entities"
}
-->