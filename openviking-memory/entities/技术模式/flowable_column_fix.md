# 流程列表上步处理列调整（flowable）
园区公共收益项目已从「已办」和「我发起的」列表移除上步处理相关 3 列，「待办」保持不变。

## 修改内容
- finished.vue：移除 LAST_HANDLE_COLUMNS 的 import 及 columns 展开
- process.vue：同上
- todo.vue 仍保留上步处理结果、上步处理人、上步处理时间 3 列

## 验证结果
- finished.vue、process.vue 不再引用 LAST_HANDLE_COLUMNS，无 linter 报错
- 可在页面分别打开三个菜单确认列展示

## 验证与归属
- 涉及文件：finished.vue、process.vue、todo.vue（zhi2-web-admin/src/views/flowable/）
- 所属项目：园区公共收益；来源会话：3924b519-9c9c-4c23-8add-6fd9b72aa24a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flowable_column_fix",
  "source_extraction_id": "41ebe72cbac94dce89aa5307c597c661",
  "version": 1,
  "memory_type": "entities"
}
-->