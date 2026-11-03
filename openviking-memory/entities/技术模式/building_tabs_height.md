# BuildingTableViewTabs切换列表弹窗高度塌陷
楼盘表/列表双视图用 v-show 切换时，切回列表会重算 zs-table 高度致 zs-select-dialog 整体缩小。

## 问题根因
- v-show 切回列表按当前表格行数重算 zs-table 高度，连带 zs-select-dialog 缩小（与 :has() 误判不同根因）

## 解决方案
- .tabs-content 与列表面板设 min-height:400px
- 列表侧 zs-table 传 :table-tr="pageSize" 固定每页行数占位
- BuildingTableViewTabs 切换时 emit view-change，宿主回列表时 doLayout() 并重算弹窗高度
- 弹窗内可固定 pageSize 行高 table-tr，与列表页空表紧凑空态按场景选用

## 验证与归属
- 验证：会话 0c03606c 用户反馈「切换回列表视图高度太小」；归纳 Tab+v-show 重算高度与表格随行数变化两因
- 涉及文件：components/BuildingTableViewTabs.vue、autonomy/candidateCollect/components/CandidateDialog.vue
- 所属项目：园区公共收益；来源会话：0c03606c-2172-4607-9beb-eb92aee5b6d4；代码基线：7458acc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_tabs_height",
  "source_extraction_id": "684fafd2b29640698c2b0bf8580c7d26",
  "version": 1,
  "memory_type": "entities"
}
-->