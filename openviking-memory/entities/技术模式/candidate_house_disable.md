# 筹备组征集选户室双视图已报名不可选
candidateCollect 选户室弹窗中已报名户室在楼盘表与列表双视图统一不可选，避免双视图状态分叉。

## 置灰规则
- exist==1 表示已报名：BuildingTable 传 disableCheck，列表 selectable 与 isHouseSelectable 一致置灰

## 状态同步
- 加载楼幢时 checked 初始为字符串 '0'，不要把已报名户室预置选中
- checked 统一用 '0'/'1' 字符串，楼盘表点击后同步列表选中

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateDialog.vue、zhi2-web-admin/src/views/components/BuildingTable.vue
- 所属项目：园区公共收益；来源会话：473e272c-6e60-4e72-b905-e02eba29cfd7；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_house_disable",
  "source_extraction_id": "7f591e2941124ffe888ff01baea64df3",
  "version": 1,
  "memory_type": "entities"
}
-->