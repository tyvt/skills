# 组织架构搜索图标不可引404 CDN否则缺失
组织架构搜索框因 search-icon 引用 404 的 CDN 地址，导致图标缺失不显示。
## 问题根因
- 组织架构搜索框的 search-icon 引用了 404 的 CDN 地址 static-xcx/static/staff/organization/search.png。
- CDN 资源缺失导致图标不显示。
## 解决方案
- 修正静态资源路径或替换有效图标地址。
## 验证与归属
- 验证证据：src=泰兴小程序/007.md
- 涉及文件：src/pages/staff/organization/index.vue、src/staff/components/ZsSearch/ZsSearch.vue、src/components/ZsSearch/ZsSearch.vue、src/staff/pages/complex-select/index.vue、src/package.json、src/staff/pages/knowledge/index.vue、src/pages.json、node_modules/@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue
- 来源会话ID：05ddf740-652b-4db6-aeac-8adfb2e90abe
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "org_icon_404",
  "source_extraction_id": "75e2a66b692d45b087fc5f6610906d1c",
  "version": 1,
  "memory_type": "entities"
}
-->