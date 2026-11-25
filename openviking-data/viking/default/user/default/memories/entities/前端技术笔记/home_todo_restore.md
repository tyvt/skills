# 首页待办卡片内容行恢复（bug 6959）
苏住房防汛C端移动查询H5（zhi2-mobile-query-h5-c）首页待办卡片在 hop3 因「修复过度」删掉了内容行，2026-11-25 按用户决策以「单行摘要」方案恢复。

## 改动
- 文件 src/pages/home/index.vue：恢复 todoText ref + data.todoText 赋值
- 模板 .todo-head 下恢复单行 .todo-sub「任务标题：部门」（taskTitle：taskLocation），顶格左对齐新闻公告
- 样式 .todo-sub 12px / $on-variant / 左对齐（$on-variant 定义于第 525 行）
- .todo-more「共X项待办需处理」保持删除，不显示提示、不重复计数
- 数据层 portalData.ts:180/193 的 fetchHome 已返回 todoText = taskTitle：taskLocation（不含尾巴），无需改动

## 验证与交付
- npm test 18 个测试文件全绿 + uni build -m test Build complete（TEST_EXIT=0）
- agent-browser（CDP 9229 + token 注入）实机截图显示「待办事项 4912 + 内容摘要行」，用户确认通过
- 禅道 6959 回写：status=resolved / resolution=fixed / resolvedBy=tiany / assignedTo=lichandan，zt_action id=99536、附图 fileID=24348（原值 product=9 / project=141 / execution=142 / openedBy=lichandan，回写前 status=active）
- commit d2effe51842d8795acb53ff2fb935bba93487dac 提交 dev 并推送 origin/dev（远程 SHA 一致）
- 产物 $env:TEMP\zentao-6959\ 与 .task-state 已删，dist 为 gitignore 保留未提交，链路终止


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "home_todo_restore",
  "source_extraction_id": "d53ff4e5e5a146dbb9e52d9832912ade",
  "version": 1,
  "memory_type": "entities"
}
-->