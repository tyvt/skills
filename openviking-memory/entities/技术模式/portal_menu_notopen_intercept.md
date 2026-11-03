# 门户存量房菜单暂未开放拦截
UnifiedLogin 对未上线菜单项加 `notOpen: true`，点击时提示「暂未开放」并阻止进入二级页面，三处入口统一拦截。

## 实现规则
- 菜单配置对未上线项加 `notOpen: true`（保留原 path，开放时去掉标记即可恢复跳转）
- `handleMenuClick` 在 `openPortal` 前判断 notOpen，命中则 `this.$message.warning('「xx」暂未开放，敬请期待')` 并 return
- 须同步透传到 `getMenuChildren` 预览映射与 `getMenuMoreItems`，并在 `handleMenuMoreSelect` 做同样早返回，防止「更多」弹窗或接口配置绕过

## 验证与归属
- E2E 对这类项应断言出现 `.el-message` 且 `.public-portal-screen` 不存在
- 验证证据：用户诉求「点了先提示暂未开放，不要进入二级页面」；结论列出 4 项存量房菜单加 notOpen 及三处拦截 + spec 调整
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue、zhi2-web-admin/tests/e2e/public-portal-interactions.spec.ts
- 所属项目：门户；来源会话：session_189d43301512159d00ca913b34ce741d；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_menu_notopen_intercept",
  "source_extraction_id": "53c603737d434329a97690f706a618f0",
  "version": 1,
  "memory_type": "entities"
}
-->