# zs-select-dialog-func的treeMethod缺失报错修复
园区公共收益项目中zs-select-dialog-func.vue因tree配置缺失treeMethod导致this.$undefined报错，已提取默认配置修复。

## 问题根因
- 报错this[treeConfig.treeMethod] is not a function出现在zs-select-dialog-func.vue的getTree方法中
- 该方法调用this['$'+treeMethod]（例如this.$get）
- pubExpenditureContract/detail.vue的showBankDialog里tree配置缺少treeMethod
- Vue的Object类型prop传入自定义对象时会整体替换默认值，不会与默认配置合并，因此treeMethod为undefined，最终变成调用this.$undefined

## 修复方案
- 在zs-select-dialog-func.vue提取DEFAULT_TREE_CON默认树配置与传入配置合并
- 涉及文件：zs-select-dialog-func.vue、pubExpenditureContract/detail.vue

## 验证与归属
- 所属项目：园区公共收益
- 来源会话ID：e19f246b-8b3f-4ed0-b2bc-12291e2e6315
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_tree_fix",
  "source_extraction_id": "c62e01cbe3b346e0bca6472ceec35b7b",
  "version": 1,
  "memory_type": "entities"
}
-->