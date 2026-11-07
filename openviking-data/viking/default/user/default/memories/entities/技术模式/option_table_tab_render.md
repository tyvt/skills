# 选项表决切换Tab表格空白修复
太仓G端选项表决详情从「基本信息」切到「投票信息」Tab时，表格内容为空但分页显示有数据，需移除动态固定列并修正选择函数。

## 问题根因
- 切换到「投票信息」Tab 时 `showSearch` 变为 `true`，表格动态新增带 `fixed="right"` 的操作列
- Element UI 表格动态插入固定列后表体可能不渲染，表现为分页有数据但内容空
- `isRowSelectable` 原先返回布尔值，而 `selectable` 需要函数，影响表格渲染

## 修复方案
- `optionDecision/components/DecisionRangeTable.vue`：移除操作列 `fixed="right"`；`isRowSelectable` 改为方法 `rowSelectable(row)` 传给选择列
- 同上文件：`showSearch` 切换时清除 `voteWay`/`voteState` 筛选；缩短 `getList` 防抖；数据加载后执行 `doLayout`
- `optionDecision/detail.vue`：Tab 切换后数据请求完成延迟 400ms 执行 `doLayout`；「表决结果」按钮跳转同步刷新表格

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 c17819e8 选项表决详情切换 Tab 表格空白；修复后正常显示
- 涉及文件：zhi1-web-admin/src/views/estate/optionDecision/components/DecisionRangeTable.vue、optionDecision/detail.vue、decisionCommon/components/VoteRangeDialog.vue、ownerDecision/components/VoteRangeDialog.vue
- 所属项目：太仓G；来源会话：c17819e8-f61e-40ed-99cc-c04ba5efd9a5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_table_tab_render",
  "source_extraction_id": "78e0df094dee43b49796d6b7e7fe13b6",
  "version": 1,
  "memory_type": "entities"
}
-->