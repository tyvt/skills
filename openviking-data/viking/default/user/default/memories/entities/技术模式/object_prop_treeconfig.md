# Object prop 不合并默认值致 treeMethod 报错
Vue Object prop 整体替换默认值不合并，致 zs-select-dialog-func 缺失 treeMethod 调 this.$undefined 报错。

## 问题描述
- Vue Object 类型 prop 传入对象整体替换默认值不合并
- pubExpenditureContract/detail.vue 缺失 treeMethod 时，zs-select-dialog-func.vue 的 getTree 调 this.$undefined 报错

## 解决方案
- 组件内提取 DEFAULT_TREE_CONFIG 合并配置
- 或调用处显式声明 treeMethod 可消除异常

## 涉及文件
- zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue
- zhi2-web-admin/src/views/benefit/pubAllotNotice/detail.vue
- zhi2-web-admin/src/views/benefit/pubExpenditureContract/detail.vue
- zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue
- zhi2-web-admin/src/main.js
- zhi2-web-admin/src/views/benefit/pubBankReceiptApply/detail.vue
- zhi2-web-admin/src/views/benefit/pubRegulatoryAgreement/detail.vue
- zhi2-web-admin/src/views/benefit/pubRegulatoryStopAgreement/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：园区公共收益/036.md
- 来源会话：e19f246b-8b3f-4ed0-b2bc-12291e2e6315；代码基线：none
- 所属项目：园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "object_prop_treeconfig",
  "source_extraction_id": "6c92fed8893d4123a7051e661689f0c0",
  "version": 1,
  "memory_type": "entities"
}
-->