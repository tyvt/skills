
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


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_layout_variant",
  "source_extraction_id": "5492aad7d0ce437a9c142e7cf60496d6",
  "version": 1,
  "memory_type": "entities"
}
-->