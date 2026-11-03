# 楼盘表选择弹窗统一约定
所有涉及楼盘表选择的弹窗（14处）Tab切换时高度跳动、内容撑破弹窗，需统一公共组件与弹窗属性固定尺寸。

## 现象与根因
- 楼幢详情、房屋拆分/合并、业主自治表决范围、维修资金缴存范围ScopeSelectDialog、收益管理等14处弹窗切换「列表视图/楼盘表视图」时高度跳动、内容撑破弹窗
- 各弹窗独立实现Tab切换，v-if切换导致面板重建、尺寸随内容浮动，缺乏统一尺寸约束

## 解决方案
- 抽公共组件BuildingTableViewTabs.vue：zs-tabs type="line"，文案「列表视图/楼盘表视图」，两面板v-show切换保留DOM防高度跳动
- 内容区固定高度，表格/楼盘表超出时在面板内部滚动
- zs-select-dialog新增building-table-mode属性：宽80%（最大1300px）、高固定720px、左右分栏自适应、内容区不撑开弹窗
- owner/company版ScopeSelectDialog的v-if改v-show；新增同类弹窗直接复用

## 已知缺陷与修复
- BuildingTableViewTabs列表视图分页裁切：表格区min-height与分页栏合计超panel min-height且overflow:hidden，分页只露上半截。修复：flex链表格容器min-height:0，表格区flex:1内滚，分页flex-shrink:0+padding-bottom；zs-select-dialog右侧补display:flex列。文件BuildingTableViewTabs.vue、zs-select-dialog.vue、DecisionRangeTable.vue；会话e0c9e026；基线0abcb96
- ScopeSelectDialog（缴存范围选择）zs-table未设table-tr时默认约10行固定高度，叠加搜索分页超弹窗可视高度被裁切。修复：表格外包scope-select-table-wrap绑:table-tr="listTableTr"，ResizeObserver动态算行数，onOpen/getTable/tabClick刷新；布局表格区flex:1 min-height:0，搜索分页flex-shrink:0。文件company/depositNotice/.../ScopeSelectDialog.vue等；会话773efa7a；基线0abcb96

## 关联信息
- 涉及文件：zs-select-dialog.vue、building/detail.vue、accountOpen/owner/components/ScopeSelectDialog.vue
- 所属项目：园区物管2.0；来源会话929d6385；基线d7a305a44
- 验证：会话929d6385新增组件与属性，14处弹窗统一改造，v-show防跳动、固定720px内部滚动

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "building_table_tabs",
  "source_extraction_id": "14ba31c6dc8f4d5282d0b9f4f6413e26",
  "version": 3,
  "memory_type": "entities"
}
-->