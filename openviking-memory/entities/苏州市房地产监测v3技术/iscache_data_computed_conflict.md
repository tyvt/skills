# data与computed同名属性冲突致Vue警告
detailMixins 在 computed 定义 isCache，AgencyBranchDetail.vue 与 AgencyPersonnelDetail.vue 在 data 声明同名属性，违反 Vue 同名约束并产生警告。

## 问题根因
- detailMixins.js 的 computed 中定义 isCache
- AgencyBranchDetail.vue 与 AgencyPersonnelDetail.vue 在 data 中声明同名 isCache 属性
- 违反 Vue 不允许 data 与 computed 同名共存的约束

## 修复方案
- 从组件 data 移除 isCache
- 改为在 computed 中重写 isCache() { return false } 覆盖 mixin
- 关闭表单 sessionStorage 缓存并消除警告

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/323.md
- 涉及文件：detailMixins.js、AgencyBranchDetail.vue、AgencyPersonnelDetail.vue
- 所属项目：苏州市房地产监测V3
- 来源会话ID：0a54735e-51f0-4603-9e93-d900dddbb423
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "isCache_data_computed_conflict",
  "source_extraction_id": "2a864028af814491ba471786ba13e88c",
  "version": 1,
  "memory_type": "entities"
}
-->