# TagsView 标签无法跳转：router-link custom 未用插槽导航
zhi2-web-admin 布局 TagsView 中 router-link 加 custom 后未接 v-slot navigate，导致点击无反应。

## 问题根因
- Vue Router 4 下给 router-link 加 custom 后不会自动渲染可点击链接
- 只写 custom 又不接 v-slot="{ navigate }" 插槽时表现为「点了没反应」

## 解决方案
- 不需要完全自定义 DOM 时，直接去掉 custom，保留 :to 即可恢复默认跳转
- 坚持 custom 时，把点击区域绑到 navigate 上

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 90372e07，用户反馈 TagsView 不能点击跳转，去掉 custom 后恢复
- 涉及文件：zhi2-web-admin/src/layout/components/TagsView/index.vue
- 所属项目：2-0（产品2.0）；来源会话：90372e07-25eb-4a0f-84f3-f63f39000430；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tagsview_routerlink_custom",
  "source_extraction_id": "4ed02f8bfd3c4575a720e18d89269ce4",
  "version": 1,
  "memory_type": "entities"
}
-->