# B/G 部门树回归

在 2.6.1 中，逻辑为 `terminalType != 'B'`，在 B 端隐藏部门树。在 2.6.2 (task490) 中改为 `isGTerminalLike`/`isBTerminalPractitioner`，导致 B 端企业管理员仍然看到空的部门树 —— 回归。

## 上下文
- 2.6.1: `terminalType != 'B'` 在 B 端隐藏部门树
- 2.6.2 (task490): 修改的条件破坏了 B 端的行为

## 事实
- B 端企业管理员在 task490 后继续看到空的部门树
- 条件 `isGTerminalLike`/`isBTerminalPractitioner` 引入了回归

## 验证与归属
- 涉及文件: property/complex/components/RegionTreeLayout.vue, benefit/housePart/index.vue, utils/terminalUser.js, mixins/table.js, mixins/listMixins.js, property/complex/components/regionTree.vue, property/serviceItem/index.vue, store/modules/user.js
- 所属项目: 产品2.0; 来源: 036.md; 会话: 33328664-0183-4781-807e-7e1586e6d95d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bg_dept_regress",
  "source_extraction_id": "48b19525c64140a5b949b1bdad141457",
  "version": 1,
  "memory_type": "entities"
}
-->