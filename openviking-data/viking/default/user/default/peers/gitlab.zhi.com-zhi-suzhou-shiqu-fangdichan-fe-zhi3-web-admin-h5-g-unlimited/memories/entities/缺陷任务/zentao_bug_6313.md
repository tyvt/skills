# 禅道Bug 6313 预售许可申请市级审核待办穿透到受理页
房产管理系统zhi2-web-admin中，预售许可申请-市级审核（一审）待办任务点“处理”跳转到预售许可受理页而非审核页，且受理页因node-type限制看不到审核按钮。

## 根因与定位
- 预售许可各阶段菜单（申请/受理/初审/复审/预公告/终审）详情页为同组件薄壳，但 node-type 不同，仅落到当前流程节点对应阶段页才显示审批按钮
- 后端待办 menuRoutes 无法区分阶段：SYS_MENU 中仅“申请”(BUS_CODE=ysxksq)与“受理”(FLOW_BUS_CODE=ysxksq)带业务编码，初审/复审/终审菜单 BUS_CODE 为空，匹配不到
- 前端 resolveTodoTaskNavigation 的 pickRouteByComponents 按“审批页启发式”取首个命中（受理），导致落到 accept/detail（node-type=taskAccept），而 currentNode 为 taskReview1（BPMN 确认“市级审核（一审）”=taskReview1），受理页只放受理按钮，审核按钮被隐藏

## 修复方案
- todoRouteRegistry.js 新增 TODO_STAGE_COMPONENT_BY_TASK_NAME 与 getTodoStageComponent，按待办任务名（BPMN 用户任务名）映射到对应阶段组件（如“市级审核（一审）”→presale/permit/review/detail）
- ruoyi.js 的 resolveTodoTaskNavigation 前置阶段精确解析，未授权时回退原链路
- todo-route-resolution.spec.js 补充 #6313 用例

## 验证与交付
- 单测 18/18 通过（含 #6313 的 6 项）
- npm run build 成功；nginx 8098 已部署新包（index-CbxLkJmV.js 含阶段映射）
- lint 改动文件无新增错误（ruoyi.js 保持基线 83 条存量）
- 子模块 zhi2-web-admin 提交 67bb1b719 推送 origin/develop/v3.0.0（worktree szfc-v3-wt-bug6313 合并删除）
- 父仓库 gitlink 提交 4a7c712 推送 origin/develop/v3.0.0
- 禅道 DBX 事务回写：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=zhunan，附根因+修复+验证备注（action 88598）


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6313",
  "source_extraction_id": "3b8c0f53c1df488cb8c3d1069aa9d726",
  "version": 1,
  "memory_type": "entities"
}
-->