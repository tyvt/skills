# 监管银行弹窗新旧方案跨模块复用
苏州市房地产监测V3 中监管银行模块弹窗存在新旧方案跨模块复用关系。

## 描述
- `cbyh` 模块的 `YhwdDialog.vue` 为网点增删改查新方案弹窗
- `cbyh` 模块的 `WdmcDialog.vue` 为联行选择旧方案弹窗
- `jgwd` 模块 `detail.vue` 复用 `cbyh` 的 `WdmcDialog`
- `superviseBank` 模块 `detail.vue` 为左树右表管理页

## 涉及文件
- src/api/jgyh/yhwdgl.js、cbyh.js
- src/views/supervision/bank/cbyh/index.vue、detail.vue
- src/views/supervision/bank/jgwd/detail.vue
- src/views/supervision/bank/superviseBank/detail.vue
- src/views/supervision/bank/cbyh/components/YhwdDialog.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/143.md
- 来源会话：cfe56384-8c0c-4afc-a527-e02f0ce80e0d
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_dialog_cross_module",
  "source_extraction_id": "f03252ab12034d9281cc6024c18c407b",
  "version": 1,
  "memory_type": "entities"
}
-->