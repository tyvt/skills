# 门户新首页隐藏布局壳层并豁免超管
门户 index-new 等首页对普通用户隐藏 Sidebar/TagsView，但超管保留壳层。
## 实现规则
- 页面仍对所有用户设置 hideLayoutChrome（或等价 store 标志），不在页面写死 if 超管
- layout/index.vue 用 shouldHideLayoutChrome = hideLayoutChrome && !isSuperAdmin；Sidebar/TagsView 的 v-if 取反该值
- store/getters 增加 isSuperAdmin：roles 含 admin 或 permissions 含 *:*:*；其他路由不受影响
## 验证与归属
- zhi2-web-admin/src/store/getters.js
- zhi2-web-admin/src/layout/index.vue
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/src/views/home/index-wrapper.vue
- 所属项目：门户；来源会话：95749b8f-c23e-4b86-8c56-1a8cf40f95d2；代码基线：35a76be
- 验证证据：先实现首页隐藏 Sidebar 与 TagsView，再要求超管首页保留壳层，最终由 Layout 根据 isSuperAdmin 决定

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_home_hide_chrome",
  "source_extraction_id": "d1c4f5df3e10427d9609e97a7b9ada3f",
  "version": 1,
  "memory_type": "entities"
}
-->