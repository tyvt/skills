# 选择楼幢弹窗关闭自动查询修复
苏州市房地产监测V3 项目中「选择楼幢」弹窗因公共组件自动查询导致列表被清空，已通过关闭自动查询修复。

## 问题根因
- 公共组件 `zs-select-dialog` 在弹窗 `opened`（动画结束）时默认执行 `getList()`，而 `getList()` 一开始就会 `this.tableData = []`
- `PresaleSelectBuildingDialog` 自己请求 `/presale/permit/building/available` 写 `tableData`，未配置 `url`，`opened` 后 `getList()` 只清空表格，导致一直显示「暂无数据」
- 时序：`visible=true` → `loadBuildings()` 返回列表短暂出现 → 弹窗 `opened` → `getList()` → 列表被清空

## 修复内容
- `PresaleSelectBuildingDialog.vue` 增加 `:no-auto-query="true"`
- `CashsaleSelectBuildingDialog.vue` 同样处理（现售选楼幢逻辑相同，避免同类问题）
- 与同项目 `BranchOneDialog` 等用法一致

## 验证与归属
- 验证：重新打开「预售许可申请 → 选择楼幢」验证列表稳定显示并可勾选
- 涉及文件：`PresaleSelectBuildingDialog.vue`、`CashsaleSelectBuildingDialog.vue`、`PresaleBuildingSection.vue`
- 所属项目：苏州市房地产监测V3；来源会话：df800cf7-e2ef-4b89-a4a7-01dba797550d；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_building_fix",
  "source_extraction_id": "2f9e7f3da1c347d38634b6e9b9ecabfa",
  "version": 1,
  "memory_type": "entities"
}
-->