# 首页三角色布局变体
门户首页 index-new.vue 作为编排器，按 layoutVariant（admin/developer/broker）渲染不同角色布局，数据逻辑抽至 homeDataMixin.js。

## 架构设计
- index-new.vue 作为编排器，按 layoutVariant 字段分发渲染 admin/developer/broker 三种布局
- 数据逻辑抽离至 homeDataMixin.js，布局配置集中在 homeLayout.js
- 新增 HomeHeroBanner 等组件承载各角色区块

## 涉及文件
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/api/portal/home.js
- zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/views/home/components/HelloCard.vue
- zhi2-web-admin/src/layout/components/Navbar.vue
- zhi2-web-admin/src/store/modules/user.js
- zhi2-web-admin/src/utils/terminalUser.js
- zhi2-web-admin/src/views/home/index-wrapper.vue
- zhi2-web-admin/tests/e2e/portal-home-visual.spec.ts

## 验证与归属
- 验证证据：cursor 会话提取
- 所属项目：门户；来源会话：6756ce12-ea8e-4edc-8e34-96c59e3ed137

## 首页布局审查结论（会话034544ce）
- 首页已统一用 `businessFlows` 驱动 admin/侧栏布局，并移除 `BROKER_SECTION_CODES`。
- listPerms 同时有商品房、存量房板块权限时，按顺序首行商品房、次行存量房，两者可同时展示（相对旧版经纪侧栏只显示二手/租赁、开发侧栏只显示商品房，为预期修复）。
- `resolveHomeLayoutVariant` 不再根据「仅有二手/租赁板块权限」自动切到 broker 皮肤，broker/developer 主要看 roleKey。
- 待确认 HIGH 项：若「只有二手权限、没有经纪 roleKey」的用户仍应看到经纪统计条，需补回基于 `bizSectionCodes` 的 fallback 或书面确认产品已改为「皮肤只看角色」。
- 审查结论 BLOCK，待上述 HIGH 项与产品口径对齐后再合；其余为 MEDIUM（仅二手+租赁时排版与 admin 对齐、权限判定改进、`fetchStats` 时机等），无 CRITICAL 安全问题。
- 涉及审查文件：home、homeDataMixin.js、HomeLayoutSidebar.vue、index-new.vue；来源会话ID：034544ce-33ea-4a3e-a159-062dba42270d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_layout_variant",
  "source_extraction_id": "04a383200b2048969f86cf9638b3ae40",
  "version": 2,
  "memory_type": "entities"
}
-->