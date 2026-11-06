# 分支机构「注销」按钮样式修复
苏州市房地产监测V3 修复 G 端「经纪机构管理 > 分支机构信息」页「注销」按钮样式对比度低的问题。

## 修复内容
- `AgencyBranchList.vue`：将「注销」按钮 `attrs` 由 `{ type: 'warning', plain: true }` 改为 `{ plain: true }`，与「编辑」按钮一致
- 「注销」弹窗逻辑未改动

## 效果
- 修改前：橙色 `warning` 描边，对比度低、文字几乎看不清
- 修改后：白底 + 深灰文字 + 浅灰边框，与「编辑」按钮相同
- 刷新 G 端页面即可看到效果

## 验证与归属
- 涉及文件：`AgencyBranchList.vue`
- 所属项目：苏州市房地产监测V3；来源会话：179c726e-0dbb-4fbb-9cb6-41517bdd74a9
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_cancel_btn",
  "source_extraction_id": "40b6465dd8ab4f0bb97d559feedd42fc",
  "version": 1,
  "memory_type": "entities"
}
-->