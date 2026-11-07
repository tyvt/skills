# BuildingTableViewTabs列表视图分页缺失
园区物管2.0 中多个「选择户室」弹窗用楼盘表组件列表视图时缺「共 N 条」分页，因消费方未传分页配置。

## 问题根因
- BuildingTableViewTabs 预留 list-footer 插槽，但列表视图分页/统计能力非自带
- 消费方只用了插槽而没传分页配置，组件不做客户端分页也不渲染统计条
- 非样式丢失，而是配置契约缺失

## 解决方案
- 增强组件：新增 listData 属性，传入后自动客户端分页、底部渲染「共 N 条记录」、通过 #list="{ list }" 作用域插槽提供当前页数据
- 全局排查所有使用列表视图的「选择户室」弹窗（本批 12 处）统一补传 listData
- 已有自定义 list-footer 页面（如楼盘详情走服务端分页）不受影响，增强须向后兼容既有插槽消费方

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：修复为新增 listData 属性，更新 12 处弹窗，楼盘详情等已有自定义 list-footer 页面不受影响
- 涉及文件：autonomy/election/components/apply/RangeTable.vue、autonomy/record/components/CandidateDialog.vue
- 所属项目：园区物管2.0；代码基线 f101dd464；来源会话 4fa38c48-5759-47ff-967b-9289cd0f35ff

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_tabs_listdata",
  "source_extraction_id": "732ef96d5bf7463e9ae98e333c3decbd",
  "version": 1,
  "memory_type": "entities"
}
-->