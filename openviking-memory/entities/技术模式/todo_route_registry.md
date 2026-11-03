# 待办跳转前端常量注册表
提交与审批菜单分离时，待办跳转用前端常量注册表 todoRouteRegistry.js 按 busCode 映射路由，不依赖后端菜单数据。

## 背景与问题
- 本项目把「提交」和「审批」拆成两个菜单，单子在 A 菜单提交，待办要点进 B 菜单审核
- 后端待办行只返回 nodeMenuId/nodeMenuPath，getFlowList 只取 menuVos.get(0) 常拿到提交菜单而非审批菜单
- busCode 反查依赖 SYS_MENU.FLOW_BUS_CODE 库表字段，项目未落全；两条路都依赖后端数据质量不可靠

## 解决方案
- 前端维护常量注册表 src/constants/todoRouteRegistry.js：busCode 为键→{ path, 参数名 }，本项目已回填 fzjgbg→/agencyBranchChange/<变更单ID>，共 94 条且组件逐条命中磁盘文件
- 待办点击按 busCode 查注册表拼目标路由，带 formMode=view 跳转（审批视角只读）
- 补齐审批菜单入口页如 src/views/institution/agencyBranchChange/detail.vue 承载分支机构变更（busCode=fzjgbg）
- 关键坑：备案详情组件被独立变更路由复用时主键位置不同，必须在 AgencyBranchDetail.vue 的 changeActive 补 isChangeRoute 判定
- 注册表为过渡方案，后端根治清单：SYS_MENU.FLOW_BUS_CODE 补全、待办行返回 nodeMenuId/nodeMenuPath、getFlowList 取全；配 e2e 用例锁路由解析

## 验证与归属
- 会话 session-546f850e-d156-4e7e-a38e-1815ba8aca58（基线 a86bf95）用户诉求 1，最终结论写明 fzjgbg 已回填、注册表 94 条、changeActive 补 isChangeRoute
- 涉及文件：todoRouteRegistry.js、ruoyi.js、todo.vue、agencyBranchChange/detail.vue、AgencyBranchDetail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_route_registry",
  "source_extraction_id": "03080adbda084b2aac671362ab310a10",
  "version": 1,
  "memory_type": "entities"
}
-->