# 评级详情复选框缺bizState致隐藏

`table.vue` 中复选框列因父页未传 `bizState` 始终隐藏，改为未传时也显示并绑定 `isSelectable`。`detail.vue` 查看模式基本信息改用 `DetailTemplate` 蓝框并置顶，`dialog.vue` 查看模式同用蓝框、标题按模式显示、宽度 `mini`、分值区间等宽且格式化展示。

**验证证据**：extracted source=cursor session=15e3f1e2-9505-4347-bf12-82cca18b71ec

**涉及文件**：d:/repository/园区物管2.0/zhi2-web-admin/src/views/evaluation/ratingRule/detail.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/evaluation/ratingRule/table.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/evaluation/ratingRule/dialog.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/mixins/subTableMixins.js、d:/repository/园区物管2.0/zhi2-web-admin/src/mixins/detailMixins.js、d:/repository/园区物管2.0/zhi2-web-admin/src/views/evaluation/ratingRule/index.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/evaluation/surveyRelease/release/detail.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/mixins/dialogMixins.js

**所属项目**：园区物管2.0
**来源会话**：15e3f1e2-9505-4347-bf12-82cca18b71ec
**代码基线**：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rating_checkbox_ui",
  "source_extraction_id": "f667ae03057146ae8933dff0fd05df44",
  "version": 2,
  "memory_type": "entities"
}
-->