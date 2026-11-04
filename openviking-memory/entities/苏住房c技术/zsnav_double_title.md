# ZsNav漏配navigationStyle导致双标题
苏住房C 页面用了自定义 ZsNav 却在 pages.json 漏配 navigationStyle:"custom"，会出现系统导航栏与 ZsNav 两条标题叠加。

## 现象与根因
- 业主端「我的决策」列表页（pages_owner/decision/index.vue）头部标题重复显示两次，两条都写「我的决策」，用户截图报障
- 该页模板里用了自定义导航组件 ZsNav，但 pages.json 里这条路由仍保留默认系统导航（只配了 navigationBarTitleText），没设 navigationStyle:"custom"
- 于是系统顶栏渲染一次、ZsNav 再渲染一次，两条叠加；同模块其他带 ZsNav 的页面（如 income/index）都已配置 custom，只有 decision/index 漏了

## 解决方案
- 在 pages.json 对应页面节点补 "navigationStyle": "custom"，重新编译验证只剩一条头部
- 本项目成对约定：用了自定义导航组件就必须配 custom；反之没配 custom 的页面不要引 ZsNav，只保留系统导航（与决策详情等子页一致）
- 排查同类「双头/双标题」问题时，先拿 ZsNav 的使用点与 pages.json 的 navigationStyle 做一次全量对照；若配完仍双头，先清缓存、确认编译到的是最新包

## 验证与归属
- 会话 18d9a799：用户贴图报「慧物业-投票表决，查看我的决策头部重复显示两次」；结论给出根因（pages.json 未设 navigationStyle: custom）与修改项，并指出 income/index 等同类页面已配、只有此页漏了
- 涉及文件：pages_owner/decision/index.vue、src/pages.json、pages_owner/decision/detail.vue
- 所属项目：苏住房C；代码基线：4316025；来源会话ID：18d9a799-b438-480c-b29c-cf616ca0f008

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsnav_double_title",
  "source_extraction_id": "2e192de19d9f4bb18647ef27da14cff8",
  "version": 1,
  "memory_type": "entities"
}
-->