# 门户 PortalBreadcrumb 行内左排对齐
对外门户经纪人等详情页面包屑整体靠左，当前级文字与 › 分隔符同一水平中线，不可整行居中。

## 样式规则
- 容器 display: flex; align-items: center，不要用 justify-content: center 拉整行居中
- 面包屑按钮用 inline-flex、固定 height 与 line-height 一致（示例 26px），避免文字相对箭头偏上/偏下
- 分隔符左右间距按稿面单独设（示例 28px / 20px），与共享 PortalBreadcrumb 组件并存时保留 .broker-breadcrumb 等 E2E 类名

## 关联与验证
- 与「仅层级页展示 PortalBreadcrumb」条目配合：先决定是否展示，再调行内对齐
- 验证证据：会话 cd7c3e24，用户澄清整体放左侧、文字与中间右箭头对齐；去掉 justify-content:center，align-items:center，按钮 inline-flex height 26px，箭头间距 28px/20px
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/pages/BrokerPages.vue、zhi2-web-admin/src/views/home/publicPortal/portal.scss、zhi2-web-admin/src/views/home/publicPortal/components/PortalBreadcrumb.vue
- 所属项目：门户；来源会话：cd7c3e24-462c-463d-8739-3c5df8d5e314；代码基线：2785dd9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_breadcrumb_align",
  "source_extraction_id": "c5ddad6824164d7095ceeab2e97eb65d",
  "version": 1,
  "memory_type": "entities"
}
-->