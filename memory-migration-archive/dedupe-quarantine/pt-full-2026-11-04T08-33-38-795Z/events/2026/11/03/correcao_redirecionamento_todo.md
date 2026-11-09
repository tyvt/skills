# Summary
Router.push('/todo') e DEFAULT_LANDING_PATH='/todo' causavam 404 pois a rota /todo é registrada dinamicamente via listRouters; o navigation guard avançava antes do addRoute concluir. router/index.js passou a usar needsDynamicRoutes() e loadDynamicRoutes (Promise singleton) para garantir registro das rotas de menu antes do redirecionamento.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】硬编码跳待办页早于动态路由注册致404
【内容】多处硬编码 router.push('/todo') 且 DEFAULT_LANDING_PATH 设为 '/todo'，但待办路由由 listRouters 动态注册；导航守卫中 roles 就绪而 addRoute 未完成时直接 next 访问未注册路径命中通配符 404。router/index.js 使用 needsDynamicRoutes() 与 loadDynamicRoutes 单例 Promise 保证菜单路由注册完毕再跳转。
【验证证据】src=苏州市房地产监测V3-rest/111.md
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/router/index.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/store/modules/permission.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/permission.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/login.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/main.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/store/modules/user.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/ruoyi.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/home/index.vue
【来源会话ID】5657d5ac-3d67-4095-b7de-c93ba44cfa41
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "correcao_redirecionamento_todo",
  "goal": "Corrigir falha roteamento",
  "summary": "Router.push('/todo') e DEFAULT_LANDING_PATH='/todo' causavam 404 pois a rota /todo é registrada dinamicamente via listRouters; o navigation guard avançava antes do addRoute concluir. router/index.js passou a usar needsDynamicRoutes() e loadDynamicRoutes (Promise singleton) para garantir registro das rotas de menu antes do redirecionamento.",
  "ranges": "23-29",
  "source_extraction_id": "7d93cb8ae368422f9c4b1c74a757c166",
  "version": 1,
  "memory_type": "events"
}
-->