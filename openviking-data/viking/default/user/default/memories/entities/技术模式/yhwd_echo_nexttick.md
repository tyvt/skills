# 承办银行网点回显规范动态API与nextTick
苏州市房地产监测V3 中承办银行网点弹窗未动态调详情接口且 onOpen 时序不当致回显失败，改用动态 API 与 nextTick 规避。

## 问题根因
- `YhwdDialog.vue` 未动态调详情接口且 `onOpen` 时序不当致回显失败

## 解决方案
- 新增 `detailApiFull` 计算属性与 `loadDetail()` 填表
- `normalizeFormValues()` 转字符串保单选框回显
- `YhwdTable.vue` 浅拷贝行数据并于 `$nextTick` 后开弹窗，规避 `@open` 的 prop 未更新

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/019.md
- 涉及文件：supervision/bank/cbyh/components/YhwdDialog.vue、YhwdTable.vue、api/jgyh/yhwdgl.js、superviseBank/components/YhwdDialog.vue、jgwd/detail.vue、components/OperationBtnGroup/index.vue、maintenance/bank/components/YhwdDialog.vue、mixins/dialogMixins.js
- 所属项目：苏州市房地产监测V3；来源会话：224ebc32-0868-4266-a756-0afa83014b18；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "yhwd_echo_nexttick",
  "source_extraction_id": "0bcf481cb340407cb990dac81fe58681",
  "version": 1,
  "memory_type": "entities"
}
-->