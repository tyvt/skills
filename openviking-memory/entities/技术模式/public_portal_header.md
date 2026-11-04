# 门户统一详情头 PortalDetailHeader 样式耦合全局 SCSS
publicPortal 的详情头组件 PortalDetailHeader 自身无 `<style>`，样式全部来自全局 portal.scss。

## 实现要点
- PortalDetailHeader.vue 本身不含 `<style>`，头部样式定义在 portal.scss
- 选择器形如 `.public-portal .portal-detail-backdrop .portal-detail-header`
- portal.scss 由 PortalDialogHost.vue 引入，弹窗需挂在其树下才能拿到样式
- 在 `.public-portal` 作用域外复用该组件会几乎无样式

## 可访问性约束
- 新增门户弹窗应挂在 PortalDialogHost 树下
- 必须保持 `aria-labelledby` 与 `title-id` 配对

## 注意事项
- MEDIUM 级技术债：组件与全局 SCSS 强耦合
- 来源会话 a8453950、8088d086；代码基线 e1f8e0b；所属项目 门户
- 验证证据：会话 a8453950 审查确认 DOM 与选择器一致、可访问性保持

## 涉及文件
- zhi2-web-admin/src/views/home/publicPortal/components/PortalDetailHeader.vue
- zhi2-web-admin/src/views/home/publicPortal/portal.scss
- zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "public_portal_header",
  "source_extraction_id": "b8492c87cabc41c1b1a1dc8590e752b1",
  "version": 2,
  "memory_type": "entities"
}
-->