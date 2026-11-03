# ListTemplate 操作列宽度 mixin 默认值
ListTemplate.js 操作列绑定 operationColumnWidth，页面仅用 listMixins 未声明时会 Vue warn，须在 table.js 提供默认 80。

## 问题根因
- ListTemplate.js 操作列绑定 :width="operationColumnWidth"，页面只用 listMixins 未声明该字段会报 Property or method operationColumnWidth is not defined。

## 解决方案
- 在 mixins/table.js（listMixins 依赖）的 data 增加默认 operationColumnWidth: 80，与 maintenance/query 等页一致。
- 各列表页可在自身 data 覆盖加宽。

## 验证与归属
- 验证证据：会话 0613463c AccountCancel 渲染告警；结论指向 ListTemplate 写死宽度、table mixin 缺字段，已在 table.js 补默认值。
- 涉及文件：zhi2-web-admin/src/mixins/ListTemplate.js、zhi2-web-admin/src/mixins/table.js、zhi2-web-admin/src/views/maintenance/accountCancel/index.vue
- 所属项目：2-0；来源会话ID：0613463c-dedd-4264-a38a-7d944299a97c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_template_opcol_width",
  "source_extraction_id": "f8f198cd162642018005f9ca8c1daff5",
  "version": 1,
  "memory_type": "entities"
}
-->