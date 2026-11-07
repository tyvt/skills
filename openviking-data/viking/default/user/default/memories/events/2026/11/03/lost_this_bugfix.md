# Summary
A bug where `disabled: this.disableButton` passed a method reference that lost `this` context, causing `bizState` checks to fail and making single-row delete clickable in non-pending states. Fixed by adding a `canOperate` computed property in `houseTable.vue` (checking `bizState == 0 || bizState == '0'`) and binding delete via arrow functions `disabled: () => !this.canOperate` and `visible: () => this.canOperate`.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】方法引用丢this致bizState判断失效删可点
【内容】操作列 `disabled: this.disableButton` 方法引用传递致 `this` 上下文丢失，`bizState` 判断失效使非待提交状态单行删除可点击。`houseTable.vue` 新增计算属性 `canOperate` 统一判断 `bizState == 0 || bizState == '0'` 并控制批量/勾选/编辑，单行删除改用箭头函数 `disabled: () => !this.canOperate` 与 `visible: () => this.canOperate` 绑定上下文。
【验证证据】src=园区公共收益/014.md
【涉及文件】d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/assetsLeaseContractFiling/detail.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/assetLeaseApply/components/houseTable.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/mixins/subTableMixins.js ; d:/repository/园区公共收益/zhi2-web-admin/src/mixins/table.js ; d:/repository/园区公共收益/zhi2-web-admin/src/mixins/detailMixins.js ; d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/assetLeaseApply/detail.vue ; d:/repository/园区公共收益/zhi2-web-admin/src/mixins/form.js
【来源会话ID】f1d10e9a-1ce1-4000-b675-9ed44669437d
【代码基线】none

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益


<!-- MEMORY_FIELDS
{
  "event_name": "lost_this_bugfix",
  "goal": "Fix lost this context bug",
  "summary": "A bug where `disabled: this.disableButton` passed a method reference that lost `this` context, causing `bizState` checks to fail and making single-row delete clickable in non-pending states. Fixed by adding a `canOperate` computed property in `houseTable.vue` (checking `bizState == 0 || bizState == '0'`) and binding delete via arrow functions `disabled: () => !this.canOperate` and `visible: () => this.canOperate`.",
  "ranges": "7-13",
  "source_extraction_id": "7edae260dc5b4c619dbc8dc085a84546",
  "version": 1,
  "memory_type": "events"
}
-->
