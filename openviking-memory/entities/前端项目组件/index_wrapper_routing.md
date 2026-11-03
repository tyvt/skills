# 门户登录后首页 index-wrapper 路由
路由 /index 的组件链为 index-wrapper.vue → index-new.vue（默认主工作台）→ index-bak.vue（localStorage.cwzxt 存在时渲染）。
## 组件说明
- index-new.vue：当前主工作台，含横幅、业务中心、统计、待办、公告，API 为 src/api/portal/home.js
- index-bak.vue：财务子系统专用首页，当 localStorage.cwzxt 存在时由 wrapper 渲染
- index.vue：旧版问候+快捷导航首页，wrapper 未引用
## 注意事项
- 改首页行为前先确认用户是否处于财务子系统分支
## 涉及文件
- zhi2-web-admin/src/views/home/index-wrapper.vue
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/views/home/index-bak.vue
- zhi2-web-admin/src/router/index.js
- zhi2-web-admin/src/api/portal/home.js

<!-- MEMORY_FIELDS
{
  "category": "前端项目组件",
  "name": "index_wrapper_routing",
  "source_extraction_id": "7037bdfe688c4a78a39bfd8eeba60a8f",
  "version": 1,
  "memory_type": "entities"
}
-->