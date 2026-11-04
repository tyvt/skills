# VoteRangeDialogLite 引用错误路径的 CandidateConfigTable
太仓G端 `VoteRangeDialogLite.vue` 误引用同目录下不存在的 `./CandidateConfigTable`，实际组件位于 `optionDecision` 模块，导致构建报错。

## 问题根因
- `VoteRangeDialogLite.vue` 误 import 同目录下 `./CandidateConfigTable`
- 该组件实际在 `optionDecision` 模块中，与 `optionDecision/components/VoteRangeDialog.vue` 用法一致（`url="/estate/optionGroup/list"`、表决项选择等）

## 修复方案
- 将 import 路径改为 `@/views/estate/optionDecision/components/CandidateConfigTable`，本地 `npm run test` 构建成功（约 55s）

## 验证与归属
- 验证证据：会话 a96ffabd 用户报构建报错，修复后通过
- 涉及文件：`VoteRangeDialogLite.vue`、`optionDecision/components/VoteRangeDialog.vue`、`optionDecision/components/CandidateConfigTable`
- 所属项目：太仓G；来源会话：a96ffabd-ef31-4e34-998f-48051d851e40；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "voterange_dialog_lite_import",
  "source_extraction_id": "d4d8cd2912bd44b5966e096f7fc2c02d",
  "version": 1,
  "memory_type": "entities"
}
-->