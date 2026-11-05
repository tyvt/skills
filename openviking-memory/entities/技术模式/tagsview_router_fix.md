# TagsView router-link 无法跳转修复
TagsView 中 router-link 加了 custom 属性但未使用自定义导航插槽，Vue Router 4 下不会自动跳转，导致点击无反应、关闭图标不显示。
## 问题根因
- router-link 被加了 custom 属性，但没有使用插槽的自定义导航（v-slot="{ navigate }" 等）
- Vue Router 4 中加了 custom 就不会自动帮你跳转
## 解决方案
- 去掉 router-link 的 custom 属性，恢复为正常可点击跳转
- 修改文件：zhi2-web-admin/src/layout/components/TagsView/index.vue
## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/src/layout/components/TagsView/index.vue
- 所属项目：2-0；来源会话ID：90372e07-25eb-4a0f-84f3-f63f39000430；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tagsview_router_fix",
  "source_extraction_id": "6ca91290452c4096a17022bc94e767f8",
  "version": 1,
  "memory_type": "entities"
}
-->