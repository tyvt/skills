# 门户管理侧栏按 G/B 端与超管判定
登录后左侧管理侧栏是否显示由 showLayoutSidebar（指向 shouldShowLayoutSidebar）控制，须按 G/B 端与超管综合判定，而非仅超管可见。

## 控制条件
- 显示条件：outLink!=1 且非 contentFullscreen
- shouldShowLayoutSidebar 与 shouldPersistHideLayoutChrome 同源

## 判定规则
- 有 user 时，非门户 B 端企业用户（G 端主管部门等）显示侧栏
- isPortalSuperAdmin（roles 含 admin 或 permissions 含 *:*:*）即使被判为 B 端企业用户也强制显示
- B 端企业/经纪/开发企业等 isPortalEnterpriseEndUser===true 且非超管时不显示

## 排查建议
- 排查「其他用户看不到菜单」应先核对 terminalUser.js 的 B 端判定与角色/板块权限，而非假设只有超管有菜单

## 涉及文件与验证
- 涉及：zhi2-web-admin/src/utils/portalLayout.js、terminalUser.js、zhi2-web-admin/src/layout/index.vue、src/store/getters.js
- 验证：对照 portalLayout.js、terminalUser.js、layout/index.vue 与 getters isSuperAdmin，明确否定「仅超管显示侧栏」
- 所属项目：门户；来源会话 ID：92954991-a2a3-4de6-bff0-9d78b9e27081；代码基线：8c17ba3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_mgmt_sidebar_visibility",
  "source_extraction_id": "edf38fe4ee324ea4ba2b9502ab8058e8",
  "version": 1,
  "memory_type": "entities"
}
-->