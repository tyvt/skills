# 门户公示公告标题列高亮链接
门户 InformationPages.vue 的公示公告标题列改为高亮链接，点击与「查看」走同一条详情路由。

## 改动内容
- 新增 `#cell-title` 插槽：`button.portal-link.portal-notice-title`，点击 `$emit('navigate', { kind: 'notice-detail', record: row })`，与「查看」按钮路由一致
- 样式 `.portal-notice-title { color:#38649e; font-weight:700; overflow:hidden; text-overflow:ellipsis }`：蓝色高亮加粗，标题过长保留省略号
- hover 复用 `.portal-link` 的下划线效果

## 验证与测试
- `tests/e2e/public-portal-interactions.spec.ts` 在公示公告用例补充标题链接点击→详情→返回断言，「查看」原有断言保留
- 交互用例 `notice search...` 通过（3.0s），ESLint（InformationPages.vue）无告警

## 涉及文件与归属
- 涉及文件：InformationPages.vue、public-portal-interactions.spec.ts、PortalTable.vue、PortalDialogHost.vue
- 所属项目：门户；来源会话ID：c58d5c89-4619-4408-90ad-208094cad341；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_notice_title_link",
  "source_extraction_id": "e094ff0ee23d42e5bdcbc819349ae6e5",
  "version": 1,
  "memory_type": "entities"
}
-->