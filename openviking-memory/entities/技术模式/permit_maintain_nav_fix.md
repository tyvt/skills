# 预售许可申请页维护按钮跳转修复
苏州市房地产监测V3 中预售许可申请详情页「维护」按钮改用 `buildPresalePlanPageNavigation`，解决隐藏菜单缺失时无法跳转的问题。

## 问题根因
- 原 `detail.vue` 的「维护」调用 `openPlanPage`，仅依赖 `buildNavigationByFilePath` 查找隐藏页 `presale/permit/plan/detail`（`busCode: ysfawh`）
- 环境未配置该隐藏菜单或菜单解析不到可注册路由时，提示「没有授权相关菜单」或 `router.push` 无效，点方案无法跳转

## 修复内容
- `permitConstants.js` 新增 `buildPresalePlanPageNavigation`：优先走菜单解析；解析不可路由时按当前详情 URL 推导（如 `.../presale/permit/detail/add` → `../presale/permit/plan/detail/add`）
- `detail.vue` 的「维护」改为使用该函数，路由失败给出明确提示
- 若仍打不开，需在后台增加与 E2E 配置一致的隐藏菜单

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`permitConstants.js`、`detail.vue`、`PermitPlanPanel.vue`
- 所属项目：苏州市房地产监测V3；来源会话：1252ba73-a7e5-4f6d-b909-cfd87d0c44ef；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_maintain_nav_fix",
  "source_extraction_id": "acdf608e6c0e448bb2d07a9151e852b1",
  "version": 1,
  "memory_type": "entities"
}
-->