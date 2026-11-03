# 建湖G旧方案与V3现有能力重复
建湖G 迁入的 OperationContainer、SearchContainer、v-waiting 与 V3 现有能力重复，且 v-waiting 劫持 XMLHttpRequest 与 Vite/axios 栈叠加致维护成本高。

## 问题根因
- 建湖G 的 OperationContainer、SearchContainer、v-waiting 与 V3 的 operation-btn-group、zs-search-form+ListTemplate、v-loading+listMixins 能力重复
- v-waiting 劫持 XMLHttpRequest 与 Vite/axios 栈叠加致维护成本高

## 修复方案
- 删除前述遗留组件/指令
- 详情顶栏用 operation-btn-group
- 列表搜索用 zs-search-form+ListTemplate
- 加载态用 v-loading 结合 listMixins 的 getList loading

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/010.md
- 涉及文件：SupervisionAddDialog.vue、建湖G/package.json、V3/package.json、listMixins.js、建湖G/stock/agreement/index.vue、superviseBank/index.vue、ListTemplate.js、detailMixins.js
- 来源会话：005ca51a-2e96-4282-b80d-8c9843005a56；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "jianhu_g_duplicate",
  "source_extraction_id": "c7f6eb576e6d4f86af40444cea8581f7",
  "version": 1,
  "memory_type": "entities"
}
-->