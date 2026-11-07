# PayDetailsTable queryParams.pageSize 未定义报错修复
苏州市房地产监测V3 项目用款明细子表 PayDetailsTable.vue 因 listMixins 路由缓存导致 undefined.pageSize 白屏。

## 问题根因
- 详情页内嵌场景下，listMixins 按当前详情路由读写搜索缓存
- PayDetailsTable.vue 分页绑定 queryParams.pageNum/pageSize，若 queryParams 未就绪或缓存合并异常，渲染时访问 undefined.pageSize
- 导致整块 Tab 白屏，控制台报 Cannot read properties of undefined (reading 'pageSize')

## 解决方案
- listMixins.js 的 created 中保证 queryParams 存在
- 新增 skipSearchParamsCache 支持（详情子表不写/不读路由缓存），带该标志时不再把子表分页写入 store
- query 的 get/set 更稳妥
- PayDetailsTable.vue 设置 skipSearchParamsCache: true，增加 :page-size="queryParams.pageSize"
- 去掉重复的 created（由 mixin 统一 init），queryParams 中声明相关字段

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：PayDetailsTable.vue、listMixins.js、usemoney/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：ad7a580b-3a8f-4044-8329-77ea3f59363a；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "usemoney_paydetails_bug",
  "source_extraction_id": "2c79c87a304d4b9a9dcb02329c6a7a73",
  "version": 1,
  "memory_type": "entities"
}
-->