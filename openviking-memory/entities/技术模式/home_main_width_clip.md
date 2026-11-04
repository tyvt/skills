
# 首页主体宽度致右栏裁切修复
门户首页因 .app-main 设 width:max-content 致整页撑宽、右侧栏 2×2 网格被裁切，已通过宽度约束与溢出隐藏修复。

## 问题根因
- layout/index.vue 中 .app-main 设 width:max-content，左侧业务入口不换行撑宽整页
- 导致右侧栏常用功能 2×2 网格右侧被裁切

## 修复要点
- .portal-home-layout .app-main 改 width/max-width:100%
- index-new.vue 增 min-width:0 与 overflow-x:hidden，图标行改为横向滚动
- 修正 homeDataMixin.js 的 layoutVariant 返回值

## 涉及文件
- zhi2-web-admin/src/views/home/index.vue
- zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- zhi2-web-admin/src/api/portal/home.js
- zhi2-web-admin/tests/e2e/fixtures/portalHomeMock.ts
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/views/home/components/HomeDeveloperIconRow.vue
- zhi2-web-admin/src/views/home/config/homeLayout.js
- zhi2-web-admin/src/views/home/components/layouts/HomeLayoutSidebar.vue

## 验证与归属
- 验证证据：cursor 会话提取
- 所属项目：门户；来源会话：ee891822-605e-45ff-93b7-d9fe4dab6497


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_main_width_clip",
  "source_extraction_id": "5492aad7d0ce437a9c142e7cf60496d6",
  "version": 1,
  "memory_type": "entities"
}
-->