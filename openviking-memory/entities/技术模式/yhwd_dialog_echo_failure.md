# YhwdDialog 无详情接口和时序导致显示失败
在项目 苏州市房地产监测V3 中，`YhwdDialog.vue` 未调用详情接口也未格式化值，且 `YhwdTable.vue` 未在 `$nextTick` 后打开对话框，导致银行网点展示失败。

## 问题根因
- `YhwdDialog.vue` 未调用详情接口且未格式化表单值
- `YhwdTable.vue` 未在 `$nextTick` 后打开对话框

## 主要修复
- `YhwdDialog.vue` 新增 `loadDetail()` 和 `normalizeFormValues()` 以填充和转换数据
- `YhwdTable.vue` 对行数据进行浅拷贝并在 `$nextTick` 后触发 `@open`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/219.md
- 涉及文件: supervision/bank/cbyh/components/YhwdDialog.vue, supervision/bank/cbyh/components/YhwdTable.vue, api/jgyh/yhwdgl.js, supervision/bank/superviseBank/components/YhwdDialog.vue, supervision/bank/jgwd/detail.vue, components/OperationBtnGroup/index.vue, maintenance/bank/components/YhwdDialog.vue, mixins/dialogMixins.js
- 所属项目: 苏州市房地产监测V3; 会话: 224ebc32-0868-4266-a756-0afa83014b18; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "yhwd_dialog_echo_failure",
  "source_extraction_id": "5b55fde1cd1b4f419a674259657b5c37",
  "version": 1,
  "memory_type": "entities"
}
-->