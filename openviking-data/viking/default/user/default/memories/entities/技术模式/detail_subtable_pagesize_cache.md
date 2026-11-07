# 详情内嵌子表缓存异常致pageSize白屏
苏州市房地产监测V3 的详情页内嵌子表场景下，listMixins 按路由读写搜索缓存，queryParams 未就绪时访问 undefined.pageSize 导致 Tab 白屏。

## 问题现象
- 详情页内嵌场景下列表 Tab 出现白屏
- listMixins 按当前路由读写搜索缓存，queryParams 未就绪时访问 undefined.pageSize

## 根因
- listMixins.js 按当前路由读写搜索缓存，queryParams 未就绪会访问 undefined.pageSize
- PayDetailsTable.vue 等内嵌子表组件未兜底 queryParams 存在性

## 解决方案
- listMixins.js 增加 skipSearchParamsCache 标记并兜底 queryParams 存在性
- PayDetailsTable.vue 启用 skipSearchParamsCache 并显式绑定 :page-size

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/065.md
- 涉及文件：PayDetailsTable.vue、listMixins.js、table.js、detail.vue、zs-pagination.vue、zs-table.vue、RelatedBuildingsTable.vue、tableComponents.js
- 来源会话ID：ad7a580b-3a8f-4044-8329-77ea3f59363a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_subtable_pagesize_cache",
  "source_extraction_id": "f693a59fc8b14fa8a5001f904bae2259",
  "version": 1,
  "memory_type": "entities"
}
-->