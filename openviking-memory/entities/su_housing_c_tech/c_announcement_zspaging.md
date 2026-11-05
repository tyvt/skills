# 苏住房C业主端公告ZsPaging改造
苏住房C（zhi2-mobile-shimin）的社区公告与街道公告页已统一改用自定义 ZsPaging 组件与 useAnnouncementPaging hook，并调整电子业主卡报事报修入口为「暂未开放」。

## 分页改造
- 新增 `src/hooks/useAnnouncementPaging.js`，统一公告分页逻辑（含区域 code 自动补全）
- 社区公告 `src/pages_owner/community/announcement/index.vue`：使用 `ZsPaging` 替代原生 `z-paging`，`useAnnouncementPaging` 替代内联 `usePaging` + `getList`，支持 URL 参数 `code` 传入社区编码，搜索框放入 `#top` 插槽
- 街道公告 `src/pages_owner/subdistrict/announcement/index.vue`：同上，`displayLocation: 3`，`storeKey: 'subdistrict'`

## 电子业主卡
- `src/pages_owner/ownerCard/index.vue` 的 `goToOther` 中，点击报事报修（`value === "2"`）时提示「功能暂未开放」

## 验证与归属
- 改动已应用到子模块 `zhi2-mobile-shimin` 的 `suzhou-shiqu-suzhufang-main-v2.1` 分支
- 涉及文件：useAnnouncementPaging.js、community/announcement/index.vue、subdistrict/announcement/index.vue、ownerCard/index.vue
- 所属项目：苏住房C；来源会话ID：c6f5e6b8-04ec-4597-8607-ff8f6c062f99

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "c_announcement_zspaging",
  "source_extraction_id": "08c799b940474028a4a83eb8d3f409d8",
  "version": 1,
  "memory_type": "entities"
}
-->