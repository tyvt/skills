# 门户首页 index-wrapper 路由与挂载
门户首页 `/index` 经 index-wrapper.vue 按 localStorage.cwzxt 在 index-new.vue 与 index-bak.vue 间分流，设计以 index-new 为准。

## 路由与挂载规则
- `/index` 指向 `index-wrapper.vue`，无 `localStorage.cwzxt` 时挂载 `index-new.vue`（业务中心/常用功能/待办/公告）
- 存在 `cwzxt` 时改用财务专用 `index-bak.vue`
- 设计还原与首页改版以 `index-new.vue` 为准，勿误改已废弃的 `index.vue`

## 数据与权限
- 业务中心数据可由 `/portal/home/functions` 覆盖默认 `DEFAULT_BUSINESS_FLOWS`
- 板块显隐受权限 `portal:bizSection:{functionCode}` 控制

## 验证与归属
- 验证证据：探索结论写明「当前生产路由指向新版首页 index-new.vue」；index-wrapper 按 cwzxt 在 index-bak 与 index-new 间分流
- 涉及文件：zhi2-web-admin/src/router/index.js、zhi2-web-admin/src/views/home/index-wrapper.vue、zhi2-web-admin/src/views/home/index-new.vue、zhi2-web-admin/src/api/portal/home.js
- 所属项目：门户；来源会话：ef134e9f-783a-4c4b-b2ef-c977bdfedeb4；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_home_index_wrapper",
  "source_extraction_id": "53c603737d434329a97690f706a618f0",
  "version": 1,
  "memory_type": "entities"
}
-->