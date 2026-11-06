# 选择楼幢弹窗关闭打开时自动查询
苏州市房地产监测V3 修复「选择楼幢」弹窗因公共组件 `zs-select-dialog` 在 `opened` 时自动执行 `getList()` 清空表格导致列表不显示的问题。

## 问题根因
- 公共组件 `zs-select-dialog` 在弹窗 `opened`（动画结束）时默认执行 `getList()`，而 `getList()` 一开始就会 `this.tableData = []`
- 自定义弹窗未配置 `url`，不会再去拉接口，只会清空表格，时序变为：加载数据短暂出现 → opened 清空 → 一直显示「暂无数据」

## 修复内容
- `PresaleSelectBuildingDialog.vue` 增加 `:no-auto-query="true"`
- `CashsaleSelectBuildingDialog.vue` 同样处理（现售选楼幢逻辑相同）
- 与同项目 `BranchOneDialog` 等用法一致：自定义加载数据的弹窗关闭打开时自动查询

## 验证与归属
- 涉及文件：`PresaleSelectBuildingDialog.vue`、`CashsaleSelectBuildingDialog.vue`、`PresaleBuildingSection.vue`
- 所属项目：苏州市房地产监测V3；来源会话：df800cf7-e2ef-4b89-a4a7-01dba797550d；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_building_noauto",
  "source_extraction_id": "704eceb5659240c28189d77cb51cf0c7",
  "version": 1,
  "memory_type": "entities"
}
-->