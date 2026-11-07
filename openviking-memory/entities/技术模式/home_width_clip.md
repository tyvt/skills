# 首页主体宽度致右栏裁切
门户首页因 .app-main 设 width:max-content 导致左侧业务入口撑宽整页，右侧栏常用功能 2×2 网格被裁切的 bug 与修复要点。

## 根因
- layout/index.vue 中 .app-main 设 width:max-content，左侧 10 个业务入口（min-width:84px 不换行）撑宽整页
- 右侧栏贴在页面最右边，常见视口下只能看到左半部分，常用功能 2×2 网格右侧两格被裁切

## 修复要点
- .portal-home-layout .app-main 改 width/max-width:100%，去掉 max-content
- index-new.vue 增 min-width:0 与 overflow-x:hidden
- HomeLayoutSidebar 限制宽度、align-items:start；侧栏常用功能取消 height:100% 撑满
- 左侧图标行改为横向滚动，不再撑开整页宽度
- homeDataMixin.js 临时 return 'developer' 改回 resolveHomeLayoutVariant

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
- 验证证据：extracted source=cursor project=门户
- 验证证据：cursor 会话提取
- 所属项目：门户；来源会话：ee891822-605e-45ff-93b7-d9fe4dab6497

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_width_clip",
  "source_extraction_id": "852f63b02f764f4283bf1f49d7c63473",
  "version": 2,
  "memory_type": "entities"
}
-->