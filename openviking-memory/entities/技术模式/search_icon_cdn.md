# 本地缺失search-icon致小程序加载失败
泰兴小程序 complex-select 页 search-icon 指向仓库不存在的本地图片，导致加载失败。
## 问题根因
- `src/staff/pages/complex-select/index.vue` 的 `search-icon` 指向仓库不存在的 `/static/organization/search.png`。
- 本地图片缺失导致小程序加载失败。
## 解决方案
- 改为 CDN 地址 `https://www.ylzhwy.com:8081/zhi2/static-xcx/static/staff/organization/search.png`。
- 需确认 CDN 资源部署状态。
## 验证与归属
- 验证证据：src=泰兴小程序/017.md
- 涉及文件：src/staff/pages/complex-select/index.vue、src/staff/components/ZsSearch/ZsSearch.vue、src/pages/staff/organization/index.vue、src/pages.json、src/components/ZsImage/ZsImage.vue、src/env/mp.js、vite.config.ts
- 来源会话ID：9d087ad1-9371-48e0-a759-a1977d0f33fa
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_icon_cdn",
  "source_extraction_id": "14f9f34c6b2047cf86ef295274671d43",
  "version": 1,
  "memory_type": "entities"
}
-->