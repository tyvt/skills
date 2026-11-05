# 单位代缴与个人缴存表格及弹窗优化
园区物管2.0 中 company 模块单位代缴与个人缴存共用优化逻辑，涉及 ScopeSelectDialog、BuildingTable、PaymentRangeTable、PaymentDetailTable。

## 实现要点
- ScopeSelectDialog 弹窗 Tab 顺序：列表视图在前、楼盘表视图在后，默认显示列表视图，左侧选择楼幢面板，右侧 line 型 Tab，列表带搜索表单
- BuildingTable.vue 按单元最大户室数动态计算列数与宽度，修复单元标题框过窄
- PaymentRangeTable 增加 bottom-summary-variant="table" 底部汇总，小计行序号列显示「小计」
- PaymentDetailTable 增加 show-summary、autoHeight、bottom-summary-variant="table" 与金额列小计
- 个人缴存同步引用同组件生效

## 涉及文件
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/company/components/ScopeSelectDialog.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/company/components/BuildingTable.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/company/components/PaymentRangeTable.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/company/components/PaymentDetailTable.vue
- d:/repository/园区物管2.0/zhi2-web-admin/src/views/company/components/detail.vue

## 验证与归属
- 来源会话：7ab3d503-eead-4cf4-9a49-d05a7c4d6a39
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "payment_table_pattern",
  "source_extraction_id": "8fd086c5b14348fdb561b38364784a04",
  "version": 1,
  "memory_type": "entities"
}
-->