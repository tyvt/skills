# 门户首页角色化布局改造
门户首页改为按 layoutVariant 渲染三种角色布局（admin/developer/broker），构建已通过。

## 架构
- index-new.vue 作为编排器，按 layoutVariant 渲染布局
- 数据逻辑抽到 homeDataMixin.js
- 配置集中在 homeLayout.js

## 三种布局变体
- admin：G 端或超管，四指标+三业务板块+8 常用功能+全宽待办
- developer：B 端仅有商品房权限，10 入口横排+右侧栏+待办
- broker：B 端有存量房/租赁权限，三指标+绿/橙板块+右侧栏+待办

## 新增组件
- HomeHeroBanner、HomeStatCard、HomeStatsBar、HomeBizSection、HomeDeveloperIconRow 等 9+2 布局壳

## 涉及文件
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/api/portal/home.js
- zhi2-web-admin/tests/e2e/portal-home-visual.spec.ts
- zhi2-web-admin/src/views/home/components/HelloCard.vue

## 验证与归属
- 验证证据：cursor 会话提取；所属项目：门户；来源会话：6756ce12-ea8e-4edc-8e34-96c59e3ed137


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_role_layout_refactor",
  "source_extraction_id": "6313d7294504464dbdd902f7fd29842d",
  "version": 1,
  "memory_type": "entities"
}
-->