# listMixins queryParams 空值防护
在 listMixins 的 computed query 中对未定义 queryParams 的组件做空值防护，避免 created 阶段 Object.assign 报错。

## 问题根因
- VenueAssetDialog 等组件混入了 listMixins 但未在 data() 中定义 queryParams。
- listMixins 的 created 通过 this.query 读写搜索条件缓存，其 setter 执行 Object.assign(this.queryParams, val)。
- 当 this.queryParams 为 undefined 时，Object.assign(undefined, val) 抛出 TypeError: Cannot convert undefined or null to object。

## 解决方案
- 在 src/mixins/listMixins.js 的 computed query 中增加防护。
- get：若 this.queryParams == null 则返回 {}，不再对 undefined 做展开。
- set：若 this.queryParams == null 则跳过缓存写入。

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 验证证据：会话 e7f13f04（VenueAssetDialog 因缺 queryParams 报错，listMixins 增加防护）。
- 涉及文件：src/mixins/listMixins.js、src/views/benefit/statisticsMap/components/VenueAssetDialog.vue、src/views/benefit/statisticsMap/operatingAssets.vue、packages/tabs/src/tab-pane.vue。
- 来源会话ID：e7f13f04-7af6-4354-8122-d5aee1779dac；代码基线：none。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listmixins_queryparams_guard",
  "source_extraction_id": "d891346b25114d0abfd81113c73e838b",
  "version": 1,
  "memory_type": "entities"
}
-->