# ParamsDialog 声明 prop 致 $attrs.id 丢失
ParamsDialog.vue 混入 dialogMixins.js 将 id 声明为 prop，导致 this.$attrs.id 为 undefined，请求体缺失 printConfigId 而报错。

## 问题现象
- ParamsDialog.vue 混入 dialogMixins.js 将 id 声明为 prop
- this.$attrs.id 为 undefined，请求体缺失 printConfigId 而报错

## 解决方案
- confirm 方法须直接使用 this.id 赋值 this.form.printConfigId

## 验证与来源
- 验证证据：src=产品2.0/069.md
- 涉及文件：zhi2-web-admin/src/views/tool/print/components/ParamsDialog.vue、PrintParamsTable.vue、PrintDialog.vue、tool/print/index.vue、mixins/dialogMixins.js、subTableMixins.js、table.js、tableComponents.js
- 所属项目：产品2.0；来源会话：6fdd2549-8d41-469b-94b8-8cd8fe8a1f20；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "paramsdialog_id_loss",
  "source_extraction_id": "fa9fbf6cda8447e593386f0779b08270",
  "version": 1,
  "memory_type": "entities"
}
-->