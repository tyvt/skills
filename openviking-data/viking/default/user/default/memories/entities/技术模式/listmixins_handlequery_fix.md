# 未引listMixins致handleQuery缺失
宜兴公共收益项目中 pubBankDetailDay 页面补注册 listMixins 以修复 handleQuery 缺失的修复套路。

## 问题背景
- `pubBankDetailDay/index.vue` 未引入 listMixins 导致 `handleQuery` 方法缺失
- 模板 `@query` 及 `resetQuery` 调用了该方法

## 解决方案
- 在 `pubBankDetailDay/index.vue` 注册 listMixins（来自 table.js）
- 混入 `handleQuery`（实现为 `this.queryParams.pageNum = 1; this.getList()`）与 `multiple`、`loading` 等状态，对齐 `bankDetailDay/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=宜兴公共收益
- 验证证据：src=宜兴公共收益/003.md
- 涉及文件：zhi2-web-admin/src/views/benefit/pubBankDetailDay/index.vue、zhi2-web-admin/src/views/benefit/bankDetailDay/index.vue、zhi2-web-admin/src/views/benefit/pubVerificationReceipts/index.vue、zhi2-web-admin/src/mixins/table.js、zhi2-web-admin/src/mixins/listMixins.js
- 所属项目：宜兴公共收益；代码基线 none；来源会话 6eab2f2e-27e3-4a85-8d91-5b508fe89d60

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listmixins_handlequery_fix",
  "source_extraction_id": "033c4384d3a244c9b904b7072ccc1be0",
  "version": 2,
  "memory_type": "entities"
}
-->