# 窄屏网格右列minmax死宽致侧栏盖主区
窄屏两栏网格使用 minmax(280px,1fr) 使右列不可变窄且 overflow:visible，右侧栏绘制于主内容上方。
## 问题根因
- HomeLayoutSidebar.vue 与 HomeLayoutAdmin.vue 第二列用 minmax(280px,1fr) 使右列不可变窄
- overflow:visible 导致右侧栏绘制于主内容上方
## 修复要点
- 第二列改 minmax(0,1fr)；≤1280px 采用单列布局
- 主区 z-index:1、侧栏 z-index:0 并加 overflow:hidden
- 窄屏存量房等模块纵向排列
## 涉及文件
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/views/home/components/layouts/HomeLayoutAdmin.vue
- zhi2-web-admin/src/views/home/components/layouts/HomeLayoutSidebar.vue
- zhi2-web-admin/src/views/home/components/HomeBizSection.vue
- zhi2-web-admin/src/views/home/components/HomeUserCard.vue
- zhi2-web-admin/src/views/home/index.vue
- zhi2-web-admin/src/views/home/config/homeLayout.js
## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 来源会话：94f6bd16-5aae-45b8-9e02-e7fe99ee07bc
- 验证证据：cursor 会话 94f6bd16-5aae-45b8-9e02-e7fe99ee07bc
- 所属项目：门户

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "grid_minmax_sidebar",
  "source_extraction_id": "1d49aac6516c4c9a82922a2614ce2404",
  "version": 1,
  "memory_type": "entities"
}
-->