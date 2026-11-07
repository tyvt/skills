# returnTab路径未带staff前缀致跳转失败
泰兴小程序 src/staff/pages/complex-select/index.vue 中 3 处 returnTab 路径原名 /pages/... 缺失 staff 分包前缀，致 switchTab 因页面未注册失败。
## 问题根因
- src/staff/pages/complex-select/index.vue 中 3 处 returnTab 路径原名 /pages/... 缺失 staff 分包前缀。
- 导致 switchTab 因页面未注册失败。
## 解决方案
- 路径改为 /pages/staff/...（默认、organization、statistics），并在 pages.json 的 tabBar 完成注册。
## 验证与归属
- 所属项目：泰兴小程序
- 验证证据：extracted source=cursor project=泰兴小程序
- 验证证据：src=泰兴小程序/021.md
- 涉及文件：src/pages.json、src/staff/pages/complex-select/index.vue、src/pages/login/index.vue、src/pages/staff/organization/index.vue、src/pages/staff/statistics/index.vue、src/staff/pages/login/index.vue
- 来源会话ID：c9cbcb08-e40e-41ce-86b6-46ac5693abdf
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "returntab_staff_prefix",
  "source_extraction_id": "3035b0b609d145a6af09e8f9d214d24d",
  "version": 1,
  "memory_type": "entities"
}
-->