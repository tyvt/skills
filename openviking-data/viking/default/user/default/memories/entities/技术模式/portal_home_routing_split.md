# 门户对外与登录后首页路由分工
zhi2-web-admin 的「门户首页」有未登录对外（/UnifiedLogin）与登录后工作区（''→/index 的 index-wrapper）两套入口，职责分明。

## 未登录对外入口
- 走 /UnifiedLogin（UnifiedLogin.vue），含公示公告、platform-banner、publicPortal 宿主
- 全屏对外业务流在同一路由用 query ?portal=... 驱动 publicPortal/PortalDialogHost 与 pages 下各业务页
- 对外公告 API：src/api/portal/externalInfo.js

## 登录后工作区入口
- 首页为 ''→/index 的 index-wrapper.vue，默认 index-new.vue（按角色/布局的新首页）
- localStorage.cwzxt 存在时回退 index-bak（含 FastGuide）
- 登录后应用入口 API：src/api/portal/home.js

## 涉及文件与验证
- 涉及：src/router/index.js、src/views/home/UnifiedLogin.vue、src/views/home/index-wrapper.vue、src/views/home/publicPortal/PortalDialogHost.vue
- 验证：子代理只读探索汇总 router、index-wrapper 分流与 publicPortal 目录职责
- 所属项目：门户；来源会话 ID：sess_subagent_agent_79d2e82d-c4c2-482b-b06e-28d1e124cc15；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_home_routing_split",
  "source_extraction_id": "edf38fe4ee324ea4ba2b9502ab8058e8",
  "version": 1,
  "memory_type": "entities"
}
-->