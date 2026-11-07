# 楼幢信息详情楼盘表统一改造
园区物管2.0 楼幢信息详情相关弹窗已统一改造，新增共用组件 `BuildingTableViewTabs.vue` 并增强 `zs-select-dialog`，共 14 处页面按参考样式对齐。
## 改造内容
- 新增 `BuildingTableViewTabs.vue`：用 `zs-tabs type="line"`（蓝色下划线），Tab 文案为「列表视图 / 楼盘表视图」，`v-show` 切换避免高度跳动，内容区固定高度内部滚动
- 增强 `zs-select-dialog`：新增 `building-table-mode` 属性，弹窗宽 80%（最大 1300px）、高 720px，左右分栏自适应，内容区不撑开弹窗
## 涉及页面
- 楼幢管理：`building/detail.vue`、`buildingChange/detail.vue`
- 房屋拆分/合并：`houseSplit/detail.vue`、`houseMerge/detail.vue`、`houseMerge/components/RangeTable.vue`
- 业主自治：`general/option/multiply/repair` 下 `DecisionRangeTable.vue`、`preparatoryRangeTable.vue`、`CandidateDialog.vue` 等
## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：BuildingTableViewTabs.vue 及上述各页面
- 所属项目：园区物管2.0；来源会话：929d6385-61c5-4f3f-bea0-a34f4b6d5432；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_table_view_tabs",
  "source_extraction_id": "477bafa538a146f292640a311974b9bc",
  "version": 1,
  "memory_type": "entities"
}
-->