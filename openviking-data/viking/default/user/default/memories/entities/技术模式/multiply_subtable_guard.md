# multiply_subtable_guard
多议题表决详情页的子表（VotingItemsTable / DecisionRangeTable）增删编辑须由单据 bizState 与 formMode 共同判定，提交审核后转只读。

## 门禁规则
- 详情页维护统一 canEditSubTable 判定，条件同时包含 formMode 与 bizState（草稿/退回态才允许，审核中与已通过一律只读）。
- 该判定以 prop 下发给子表组件，控制新增/删除/编辑按钮的 v-if 与 disabled，不只藏父页按钮。
- 子表组件内部对既有行保留查看与关联数据展示，不直接删组件（与 #542 readOnly 思路一致）。

## 前后端校验
- 后端若做拦截，前端仍保留拦截逻辑，避免审核中用户点开弹窗填完再报错。
- 与 #353 区分：B 端备案/变更单编辑只看 bizState 不掺 approvalState；本条落到详情页子表增删粒度且强调 prop 下发。

## 验证与归属
- 验证：会话 b8619a81 用户诉求「提交审核后还可新增删除表决项，应按 bizState 判断」；最终提交含修复 VotingItemsTable。
- 涉及文件：zhi2-web-admin/src/views/autonomy/multiply/components/VotingItemsTable.vue、DecisionRangeTable.vue、detail.vue
- 所属项目：产品2.0；来源会话：b8619a81-5f6d-4775-8a6d-cb0bad651497；代码基线：6accf9a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "multiply_subtable_guard",
  "source_extraction_id": "1ce6084d6ca64635b40c426f08a19a89",
  "version": 1,
  "memory_type": "entities"
}
-->