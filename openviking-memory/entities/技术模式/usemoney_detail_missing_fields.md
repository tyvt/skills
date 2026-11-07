# usemoney详情data缺字段致警告与接口错误
苏州市房地产监测V3 的 zhi2-web-admin 中 usemoney/detail.vue 的 data() 未声明关键字段，导致渲染警告与接口路径错误。

## 问题根因
- `usemoney/detail.vue` 的 `data()` 未声明 `primaryKey`、`moduleName`、`businessName`
- 导致 `operation-btn-group` 渲染警告且 `form.js` 的 `getDetail()` 接口路径拼接错误

## 修复方案
- 在 `data()` 中补充上述三字段以匹配同模块规范

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/284.md
- 涉及文件：supervision/unblock/usemoney/detail.vue、mixins/detailMixins.js、usemoney/index.vue、plan/detail.vue、mixins/form.js、usemoneyRevoke/detail.vue、form.js
- 所属项目：苏州市房地产监测V3；来源会话：36f552fb-1f48-4082-96f2-5593b64d72f1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "usemoney_detail_missing_fields",
  "source_extraction_id": "f1c4654c51974fa2a2a5c10e8aeed237",
  "version": 1,
  "memory_type": "entities"
}
-->