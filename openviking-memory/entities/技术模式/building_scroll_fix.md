# 新增委员楼幢分页修复
泰兴G 业主自治新增委员时楼幢数据缺失前端分页，已改回滚动自动加载并修复列表未撑满问题。

## 问题背景
- 业主自治-新增委员显示的楼幢数据缺少前端分页，且列表未撑满无法滚动导致加载不了下一页

## 修复内容
- zs-select-dialog-func.vue：恢复滚动到底部自动请求下一页并追加数据
- 新增 checkTreeFill：当前页未撑满列表高度时自动继续加载下一页直到出现滚动条或数据完毕
- 移除左侧楼幢列表底部页码分页控件
- CandidateDialog.vue 保留 treePageSize: 10，每页仍按 10 条请求

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴G
- 涉及文件：zs-select-dialog-func.vue、CandidateDialog.vue
- 所属项目：泰兴G；来源会话：908f5228-a584-4485-a746-432febf5a60f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_scroll_fix",
  "source_extraction_id": "711b02c3051d41118a09a64828ded27d",
  "version": 1,
  "memory_type": "entities"
}
-->