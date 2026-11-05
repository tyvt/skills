# ParamsDialog 打印配置保存缺 printConfigId 修复
系统工具-打印配置保存报错因请求体缺 printConfigId，已修复。

## 问题根因
- ParamsDialog.vue 的 confirm 方法原写 `this.form.printConfigId = this.$attrs.id`
- ParamsDialog 混入 dialogMixins，其中 id 已声明为 prop，prop 不在 $attrs 中，导致 $attrs.id 始终 undefined
- 后端因缺 printConfigId 返回「打印配置ID不能为空」

## 修复内容
- 改为 `this.form.printConfigId = this.id` 直接使用 prop

## 验证与归属
- 数据流：PrintDialog → PrintParamsTable(:id="form...") → ParamsDialog
- 涉及文件：ParamsDialog.vue、dialogMixins.js、PrintParamsTable.vue、PrintDialog.vue
- 所属项目：产品2.0；来源会话：6fdd2549-8d41-469b-94b8-8cd8fe8a1f20；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "print_config_id_fix",
  "source_extraction_id": "3ea283b432954418bfe9e179e58be66d",
  "version": 1,
  "memory_type": "entities"
}
-->