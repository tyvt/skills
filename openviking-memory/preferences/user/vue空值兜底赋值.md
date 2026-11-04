- 在 `zhi2-web-admin/src/views/maintenance/accountQuery/type.vue` 的 `listCallback` 中，当 `response.costMap` 为 `null/undefined` 时，赋值为空对象默认值，以避免 `accountClassifySummary` 渲染错误。
- 验证证据: src=bugfix/002.md; 文件: zhi2-web-admin/src/views/maintenance/accountQuery/type.vue; 会话: 7237df2f-31b9-4f24-abf3-253139b16a09
- 在模板中，读取可能为 null 的对象属性时使用可选链和短路 fallback：对于 `threeData[threeDataIndex]` 为 undefined 的情况，使用 `v-if="threeData[threeDataIndex]?.companyNames?.length"` 和 `:dataList="threeData[threeDataIndex]?.companyNames || []"` 以避免 TypeError。
- 验证证据: src=bugfix/003.md; 涉及文件: index.vue, vue.js; 会话: 57ee5fc8-b902-4632-8d17-f084cf9e6c5d
- 在 `src/views/benefit/statisticsMap/operatingAssets.vue` 中移除 `statsConfig` 和 fallback，统计区域仅使用后端的 `statistics`；当 `assetStatsMap` 缺失/null/非对象/为空时返回 []，页面不报错且区域

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vue空值兜底赋值",
  "source_extraction_id": "5ba2dade06d048a48e78322216a00bde",
  "version": 6,
  "memory_type": "preferences"
}
-->