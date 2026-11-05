# 侧栏显隐仅判terminalType致经纪留白
portalLayout.js 的 shouldShowLayoutSidebar 仅判断 terminalType === 'B'，经纪机构账号未标 B 仍渲染空 sidebar-container 留白。
## 问题根因
- shouldShowLayoutSidebar 仅依据 terminalType === 'B' 决定是否显示侧栏
- 经纪机构账号未标记为 B 时仍渲染空的 sidebar-container，造成页面留白
- portalLayout.js 中 shouldShowLayoutSidebar 原实现仅返回 shouldPersistHideLayoutChrome(rootState)，未对齐首页更宽的 roleKey 判断（如 jjjg_*、portal:bizSection:* 板块权限等）
## 修复要点
- 侧栏仅对主管部门/超管显示，按 roleKey 等拓宽判断条件
- 不再仅依赖 terminalType，避免经纪账号空侧栏
## 涉及文件
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
- zhi2-web-admin/src/views/home/index.vue
- zhi2-web-admin/src/views/home/components/layouts/HomeLayoutSidebar.vue
- zhi2-web-admin/src/views/home/components/layouts/HomeLayoutAdmin.vue
- zhi2-web-admin/src/views/home/index-wrapper.vue
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/utils/portalLayout.js
- zhi2-web-admin/src/utils/terminalUser.js
- zhi2-web-admin/src/layout/index.vue
## 验证与归属
- 验证证据：cursor 会话 bec4fb19-9aca-4ba2-84f0-886af959966f
- 所属项目：门户

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sidebar_terminaltype_blank",
  "source_extraction_id": "6313d7294504464dbdd902f7fd29842d",
  "version": 2,
  "memory_type": "entities"
}
-->