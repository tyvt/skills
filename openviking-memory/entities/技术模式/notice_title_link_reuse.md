# 在公告标题链接中复用详情路由
门户规范：公共公告标题列通过高亮链接复用详情路由。

## 目的
- 通过 $emit('navigate', { kind: 'notice-detail', record: row }) 复用“查看”详情路由
- 在标题中保持高亮蓝色、粗体和省略号样式

## 实现
- InformationPages.vue 使用插槽 #cell-title 渲染 button.portal-link.portal-notice-title
- PortalTable.vue 和 PortalDialogHost.vue 支持 navigate 事件
- mock/notices.js 提供用于测试的公告数据

## 验证
- E2E 测试 public-portal-interactions.spec.ts 验证点击标题打开详情并返回
- 验证证据: src=门户/020.md; 会话: c58d5c89-4619-4408-90ad-208094cad341

## 文件
- src/views/home/publicPortal/pages/InformationPages.vue
- src/views/home/publicPortal/components/PortalTable.vue
- src/views/home/publicPortal/PortalDialogHost.vue
- src/views/home/publicPortal/mock/notices.js 和 portal.scss
- tests/e2e/public-portal-interactions.spec.ts, fixtures/public-portal-designs.ts, _tmp-debug-title.spec.ts

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "notice_title_link_reuse",
  "source_extraction_id": "eedff5713f73492399aa37cd69b61f82",
  "version": 1,
  "memory_type": "entities"
}
-->