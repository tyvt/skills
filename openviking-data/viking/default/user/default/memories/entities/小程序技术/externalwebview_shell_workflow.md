# 门户首页作壳不自动开 web-view
externalWebview 作为小程序首页时，带 complexId/houseId 入参不自动激活 web-view，仅二级菜单点击拼接 H5。

## 行为规则
- 路由 query 带 complexId、houseId 时，页面初始化不自动激活 `<web-view>`，先展示本页菜单/门户 UI
- 仅用户点击当前页「二级菜单」时再打开 web-view
- 参数拼接规则与原 H5 跳转保持一致（token、complexId、houseId 等）
- H5 地址改为「配置的基础地址 + 原页面路由路径」，不整段外链硬编码

## 目的
- 区分「带房号深链进首页」与「从首页点进子业务 H5」两种路径，避免一进小程序就全屏 web-view 盖住门户

## 验证与归属
- 验证证据：「如果query参数里面有complexId和houseId，也不要激活webview，现在本页面作为首页，只有二级菜单使用webview」
- 涉及文件：pages/webview/externalWebview.vue、pages.json
- 所属项目：小程序；来源会话ID：b1d684d7-0aba-4f92-948d-241c1309f18c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "externalwebview_shell_workflow",
  "source_extraction_id": "2b34d842ccf94a47b62d912a34a3a9c0",
  "version": 1,
  "memory_type": "entities"
}
-->