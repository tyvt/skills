# 苏住房G 后台动态路由事实
苏住房G项目（zhi2-web-admin）后台路由不静态注册，由后端菜单动态下发。
## 路由机制
- 登录后 store/modules/permission.js 的 GenerateRoutes 调用 GET('/system/menu/listRouters')，flattenTree 存原表并经 dealWithRouter 注册。
- 组件按菜单 component 字段（如 publicQuery/monthlyReport/index）在 loadView 中遍历 import.meta.glob 的 views 模块做目录名匹配，匹配不到返回 undefined。
## 定位手法
- 静态搜 router/index.js 必然扑空属正常现象；正确姿势是按 views 目录反查业务关键词推定 URL。
- 代码内硬编码 push({ path }) 才是前端唯一能确认的路径来源；验证页面挂载只能登录看菜单或抓 listRouters 响应。

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "suzhufang_dynamic_routing",
  "source_extraction_id": "9e18b30cf1944ddd803c60e3d00c1c14",
  "version": 1,
  "memory_type": "entities"
}
-->