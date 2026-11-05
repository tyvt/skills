# 公告列表页重复空状态修复
苏住房C 项目/社区/街道三处公告列表页重复 `ZsEmpty` 空状态的问题已修复，统一由 `NoticeList` 组件展示。

## 问题根因
- 项目、社区、街道三处公告列表页各自包含 `ZsEmpty`，会出现两个「暂无数据」

## 修复内容
- 删除 `pages_owner/community/announcement/index.vue`（社区公告）中的 `ZsEmpty`
- 删除 `pages_owner/subdistrict/announcement/index.vue`（街道公告）中的 `ZsEmpty`
- 三处公告列表页（项目/社区/街道）统一由 `NoticeList` 组件展示空状态

## 涉及文件与归属
- 涉及文件：pages_owner/project/announcement/index.vue、community/announcement/index.vue、subdistrict/announcement/index.vue、components/ZsEmpty/ZsEmpty.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：53374cb4-01f1-44e3-b0b4-f4cca8826844

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "announcement_empty_fix",
  "source_extraction_id": "be4cb5694a9049d2b5d24d217f92a0dc",
  "version": 1,
  "memory_type": "entities"
}
-->