# 企业注册审核按钮权限与flowViewer挂载三道闸
园区公共收益项目中，company:companyRegister:approval 仅约束 zs-button 渲染，不会触发 flowViewer；flowViewer 调用受 bizState、busCode、dataId 三道闸拦截。

## 问题根因
- v-hasPermi 的 company:companyRegister:approval 只控制按钮壳，特定角色无审核按钮且 Network 无 /flowable/task/flowViewer 时勿先查此权限
- zs-approval 仅在 OperationBtnGroup 中 bizState==1 && showApproval 时挂载；flowViewer 在挂载且 getKey() 未提前 return 时才调用
- getKey() 在 !getId()&&!id 或 !$route.meta.busCode 时直接 return，常见为该角色菜单树叶子路由未配 busCode（经 /system/menu/listRouters 按角色生成 meta）

## 排查与解决方案
- 排查顺序：当前路由 meta.busCode → URL/primaryKey 取 dataId → form.bizState → 对比角色菜单配置
- 次要原因：角色看到 bizState !== 1 导致组件未挂载
- 确保角色菜单「企业注册」叶子路由配置 busCode，或从待办/全量菜单进入与残缺菜单进入 meta 一致

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：会话 af6dbc70 用户反馈特定角色未调 flowViewer、超管正常，结论列三道拦截及菜单 busCode 按角色下发差异
- 涉及文件：zs-approval/index.vue、OperationBtnGroup/index.vue、companyRegister/detail.vue、system/menu/index.vue
- 所属项目：园区公共收益；来源会话：af6dbc70-f0b6-4b96-8516-bdf350b8dbe6；代码基线：b6bf87d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "approval_flowviewer_gate",
  "source_extraction_id": "2d8c5d9579cd49e0af90cf0231ceaa4e",
  "version": 1,
  "memory_type": "entities"
}
-->