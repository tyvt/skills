# 苏住房G 列表默认查询值改 undefined 的缓存治理
物业管理变更单列表把 bizState 默认值由 '2' 改 undefined 做查全部，但 listMixins 条件缓存让老用户仍见旧默认。

## 问题现象
- complexChange 列表首屏原只查「已备案」，改 queryParams.bizState 为 undefined、占位符改「全部」
- 新访问者正常，回访用户仍只看到已备案
- resetQuery() 走 this.$options.data().queryParams 回到 undefined，与「全部」一致

## 根因
- listMixins 把 query 写 store 做搜索条件缓存，进同路由 merge 回 queryParams，缓存里 bizState:'2' 覆盖代码新默认
- 新默认仅对「无缓存」访问生效

## 解决方案
- 评估默认值改动影响面时，把「代码默认值」和「路由级缓存」当两个来源分开评估
- 产品要求升级后一律新默认：该路由 created 剔掉旧缓存字段；否则发布说明提示用户点一次「重置」
- 确认下拉 clearable，未选即查全部，占位符文案与实际语义一致

## 验证与归属
- 验证会话 5fa69af7：复核 complexChange/index.vue 改动，结论 APPROVE 但提 MEDIUM：listMixins 缓存可能覆盖新默认、首屏范围扩到全部属产品行为变化
- 涉及文件：zhi2-web-admin/src/views/property/complexChange/index.vue、zhi2-web-admin/src/mixins/listMixins.js、zhi2-web-admin/src/mixins/table.js
- 所属项目：苏住房G；代码基线：4f7c2c3

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "suzhufang_list_cache_default",
  "source_extraction_id": "5476d06cd4c6428c960d083c3f249c32",
  "version": 1,
  "memory_type": "entities"
}
-->