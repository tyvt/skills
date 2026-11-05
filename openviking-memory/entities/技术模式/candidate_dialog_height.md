
# CandidateDialog 户室选择列表高度塌陷修复
园区公共收益项目修复切换回列表视图后弹窗高度过小问题。

## Description
- Tab 切换后高度塌陷：列表/楼盘表用 v-show 切换，切回列表时内容区高度重算致弹窗缩小
- 表格高度随行数变化：zs-table 按当前页数据行数算高度，未固定为每页 10 行

## 修改文件
- BuildingTableViewTabs.vue：为 .tabs-content、列表/楼盘表面板设 min-height:400px；列表插槽增 pageSize；切换 Tab 触发 view-change
- CandidateDialog.vue：列表表格增 :table-tr="pageSize" 固定 10 行；监听 @view-change 切回列表执行 doLayout() 重算高度

## Relations
- 来源会话：0c03606c-2172-4607-9beb-eb92aee5b6d4（extracted source=cursor）
- 所属项目：园区公共收益；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_dialog_height",
  "source_extraction_id": "d4a2273348f648869d27d1c30c8e9cb9",
  "version": 1,
  "memory_type": "entities"
}
-->