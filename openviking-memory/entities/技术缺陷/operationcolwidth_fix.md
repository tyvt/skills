
# ListTemplate操作列宽度未定义告警修复
园区物管2.0 中 AccountCancel 页面使用 ListTemplate 时因未声明 operationColumnWidth 触发 Vue warn。

## 问题根因
- ListTemplate.js 操作列写死 :width="operationColumnWidth"
- AccountCancel 只用了 listMixins，未在自身 data 声明 operationColumnWidth，table mixin 原也无该字段，渲染报警

## 解决方案
- 在 table.js（listMixins 依赖的表格 mixin）的 data 增加默认值 operationColumnWidth: 80（与 maintenance/query/index.vue 等页面一致）
- 所有走 ListTemplate 的列表页都会带该属性；某页需更宽可在自身 data 覆盖

## 验证与归属
- 涉及文件：zhi2-web-admin/src/mixins/ListTemplate.js、table.js（表格mixin）、maintenance/query/index.vue
- 所属项目：园区物管2.0（项目2-0）
- 来源会话：0613463c-dedd-4264-a38a-7d944299a97c


<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "operationcolwidth_fix",
  "source_extraction_id": "a549c01781a14f8d92d24a4948405f59",
  "version": 1,
  "memory_type": "entities"
}
-->