# 公告页分包路由兼容修复
`pages/announcement/detail` 迁至 `pages_main` 分包后后端仍返旧路径，已加 `normalizeLegacyPageUrl` 兼容映射。
## 问题根因
- 公告详情页 `pages/announcement/detail` 已迁移到 `pages_main` 分包，但后端 `msgUrl` 仍返回旧路径前缀，导致 `navigateTo` 失败
## 解决方案
- 新增 `utils/route-map.js` 的 `normalizeLegacyPageUrl`，在 `utils/index.js` 的 `goto`/`openPage` 及 `message.vue` 跳转前将旧前缀映射为 `pages_main/`
## 验证与归属
- 涉及文件：utils/route-map.js、utils/index.js、pages/message/index.vue、pages/message/detail.vue、pages/msg/detail.vue、pages/redirect/index.vue、menuRouteMap.js、pages.json、package.json、scripts/merge-main-leaks.mjs
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 01893cc7-e8de-4690-b98f-18f412beec9e；验证证据 苏住房C/023.md

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "announcement_subpackage_routemap",
  "source_extraction_id": "eda857c276dd4b41a6be633cb004b45e",
  "version": 1,
  "memory_type": "entities"
}
-->