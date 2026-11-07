# 组织架构搜索图标404缺失修复
组织架构搜索框与 complex-select 搜索框因 search-icon 引用失效地址导致图标缺失，已修复。
## 问题根因
- 组织架构搜索框的 `search-icon` 引用了 404 的 CDN 地址 `static-xcx/static/staff/organization/search.png`。
- `ZsSearch` 传入自定义图标后会覆盖 `uni-search-bar` 默认的 `uni-icons`，图片加载失败时左侧空白。
## 解决方案
- `src/pages/staff/organization/index.vue`：图标地址改为 `static-h5/organization/search.png`（与同页 header 图同目录）。
- `src/staff/pages/complex-select/index.vue`：同步修正相同错误 URL。
- `src/staff/components/ZsSearch/ZsSearch.vue`：增加 `@error` 回退，图片加载失败时自动显示默认 `uni-icons` 搜索图标。
## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages/staff/organization/index.vue、src/staff/pages/complex-select/index.vue、src/staff/components/ZsSearch/ZsSearch.vue、src/components/ZsSearch/ZsSearch.vue、src/pages.json、src/staff/pages/knowledge/index.vue、node_modules/@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue
- 来源会话ID：05ddf740-652b-4db6-aeac-8adfb2e90abe
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "org_icon_404",
  "source_extraction_id": "77ba704f1a8144e49c493206d2246a53",
  "version": 2,
  "memory_type": "entities"
}
-->