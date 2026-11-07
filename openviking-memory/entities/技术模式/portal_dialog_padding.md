# 门户详情弹窗正文内边距统一规则与例外
portal.scss 对 .portal-detail-dialog 正文区统一内边距规则，并规定例外与去重约束。

## 统一规则与去重
- .portal-detail-dialog 正文区统一：上下 padding 24px、左右 40px（与 form-box 一致）
- 窄屏 max-width 650px 时左右 padding 降为 16px
- 租赁企业/信用弹窗已由 32px 改为走全局 40px
- PropertyDetailDialog / RentalDetailDialog 应去掉正文重复的 margin 与垂直 padding，避免与全局规则叠加形成两层 padding

## 例外布局
- 房屋详情 portal-house-body 保持各自布局
- 租赁人员 rental-person-body（右侧照片留白）保持各自布局

## 涉及文件
- zhi2-web-admin/src/views/home/publicPortal/portal.scss
- zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue
- zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue
- zhi2-web-admin/src/views/home/components/UnifiedLoginMenuMoreDialog.vue
- zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- zhi2-web-admin/src/views/home/publicPortal/components/PortalDetailHeader.vue
- zhi2-web-admin/package.json
- zhi2-web-admin/tests/e2e/public-portal-visual.spec.ts

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 会话 8088d086 按「首页所有弹窗」统一内边距；租赁企业/信用弹窗由 32px 改为走全局 40px
- 会话 a4628c5f 将分散在各组件的 padding 收敛至 portal.scss（PropertyDetailDialog、RentalDetailDialog、UnifiedLoginMenuMoreDialog）
- 验证证据：portal/038.md、portal/039.md；E2E 布局断言与 ESLint 通过
- 所属项目：门户；来源会话ID：8088d086-ac9e-4292-b17b-9ffd0590a85f、a4628c5f-d778-4c31-8176-5b38c95b7139；代码基线：e1f8e0b


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_dialog_padding",
  "source_extraction_id": "6f81cd5ab899430da326b422449948bc",
  "version": 3,
  "memory_type": "entities"
}
-->