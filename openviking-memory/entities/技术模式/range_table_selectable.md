# selectable 错误绑定导致无法离线投票
在项目太仓G的组件 DecisionRangeTable.vue 中，已提交的行无法被选中用于离线投票。

## 问题根因
- `selectable` 错误绑定到 `canEditRange` (仅草稿 `bizState==='0'` 可选中)
- 当 `bizState='2'` (已提交) 时，行不可选，且“离线投票入口”按钮被禁用

## 修复
- 新的计算属性 `isRowSelectable` 支持草稿或已提交且投票进行中 (`showSuccess && !voteDisabled`)
- 同时修复了模块 `optionDecision`

## 验证与文件
- 源会话: 1e824235-0e5e-44dd-9dc4-238cd6a1389a
- 涉及文件: optionDecision/detail.vue, DecisionRangeTable.vue, VoteRangeDialog.vue, ownerDecision/DecisionRangeTable.vue, ownerDecision/detail.vue, generalDecision/detail.vue, decisionCommon/DecisionRangeTable.vue, zsSelectColumn/index.vue
- 所属项目: 太仓G; 代码库: none

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 来源会话：1e824235-0e5e-44dd-9dc4-238cd6a1389a


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "range_table_selectable",
  "source_extraction_id": "e638529fe1a04b0d9c00eafeb905f6f1",
  "version": 1,
  "memory_type": "entities"
}
-->
