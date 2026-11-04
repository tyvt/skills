# 同名prop与data冲突致Vue组件告警
`zs-select-dialog.vue`的`selectable`同时声明为prop与`@/mixins/table`的data，Vue禁止同名致告警，需改用tableComponents混入。

## 根因
- `zs-select-dialog.vue`的`selectable`同时声明为prop与`@/mixins/table`的data，Vue禁止同名prop与data而告警。

## 解决方案
- 改`mixins: [table]`为`mixins: [tableComponents]`剔除`selectable` data。
- `tableComponents`仅注册`zs-table`、`zs-select-column`等组件。

## 涉及文件
- src/components/zs-select-dialog/zs-select-dialog.vue
- src/mixins/table.js
- src/views/property/workOrder/report/components/AddOrderDialog.vue
- src/mixins/tableComponents.js

## 验证与归属
- 验证证据：src=产品2.0/072.md
- 来源会话ID：09ed34db-94d4-41c6-856b-023f0668f865
- 代码基线：none
- 所属项目：产品2.0（zhi2-web-admin）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "prop_data_conflict",
  "source_extraction_id": "55bb34ba05c74db7846be6cfd5d6ceb5",
  "version": 1,
  "memory_type": "entities"
}
-->