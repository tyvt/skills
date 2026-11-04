# Summary
On 2026-11-04, `ProjectDialog.vue` was fixed: the default interface was changed from `/building/projectinfo/page` to `/building/project/page`, `bizState` was set to `2` to align with `SelectDialog`, and `el-table-column` was replaced with `zs-table-column` with a `doLayout()` call to fix the column width collapse.
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】fact
【标题】价格备案弹窗接口错配且表格未用zs组件
【内容】`ProjectDialog.vue` 默认接口误用 `/building/projectinfo/page` 且 `bizState` 未对齐 `SelectDialog`，`el-table-column` 引发列宽塌陷。改接口为 `/building/project/page`、`bizState` 置 `2`，替换 `el-table-column` 为 `zs-table-column` 并调用 `doLayout()`。
【验证证据】extracted source=cursor session=2968a509-de10-4547-8a3b-9515e436aa52
【涉及文件】d:/repository/产品2.0/zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue ; d:/repository/产品2.0/zhi2-web-admin/src/api/pricemng/recordPriceMng.js ; d:/repository/产品2.0/zhi2-web-admin/src/views/components/ProjectDialog.vue ; d:/repository/产品2.0/zhi2-web-admin/src/views/projectManagement/buildinginfo/changeDetail.vue ; d:/repository/产品2.0/zhi2-web-admin/src/views/building/building/index.vue ; d:/repository/产品2.0/zhi2-web-admin/src/views/building/project/index.vue ; d:/repository/产品2.0/zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue ; d:/repository/产品2.0/zhi2-web-admin/src/components/ProjectDialog/index.vue
【来源会话ID】2968a509-de10-4547-8a3b-9515e436aa52
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "project_dialog_fix",
  "goal": "Fix project dialog interface mismatch",
  "summary": "On 2026-11-04, `ProjectDialog.vue` was fixed: the default interface was changed from `/building/projectinfo/page` to `/building/project/page`, `bizState` was set to `2` to align with `SelectDialog`, and `el-table-column` was replaced with `zs-table-column` with a `doLayout()` call to fix the column width collapse.",
  "ranges": "6-13",
  "source_extraction_id": "a37ced02215c453b8a84fce285c86860",
  "version": 1,
  "memory_type": "events"
}
-->