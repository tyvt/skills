# BuildingTableViewTabs 列表分页信息修复
园区物管2.0 「选择户室」弹窗列表视图底部缺少「共 N 条记录」分页信息，已完成修复。

## 问题原因
- BuildingTableViewTabs 组件预留 list-footer 插槽，但业委会选举申请等页面的「选择户室」弹窗（如 RangeTable.vue）使用列表视图时未传入分页配置，底部不显示记录总数

## 修复方案
- 增强 BuildingTableViewTabs 组件：新增 listData 属性，传入后自动客户端分页、底部显示「共 N 条记录」、通过 `#list="{ list }"` 作用域插槽提供当前页数据
- 更新所有相关页面（共12处），包括 election/components/apply/RangeTable.vue（截图对应页面）及其他使用相同楼盘表/列表视图模式的「选择户室」弹窗
- 已有自定义 list-footer 的页面（如楼盘详情）不受影响，仍用原有服务端分页

## 效果
- 业委会选举申请→投票范围→选择户室弹窗中，列表视图底部正确显示「共 8 条记录」；数据超过 5 条显示分页控件

## 验证与归属
- 验证：会话 4fa38c48-5759-47ff-967b-9289cd0f35ff
- 涉及文件：RangeTable.vue、election/components/apply/RangeTable.vue、zs-select-dialog.vue、zs-pagination.vue
- 所属项目：园区物管2.0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_table_pagination",
  "source_extraction_id": "9b5384f8689e4e418c2790456bf0db71",
  "version": 1,
  "memory_type": "entities"
}
-->