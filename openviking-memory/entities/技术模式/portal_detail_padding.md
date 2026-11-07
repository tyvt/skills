# 门户详情弹窗正文内边距统一规则
portal.scss 对 .portal-detail-dialog 正文区统一上下 24px、左右 40px（与 form-box 一致），窄屏 max-width 650px 时左右 16px。

## 规范要点
- 正文区统一内边距：上下 24px、左右 40px，与 form-box 一致
- 窄屏（max-width: 650px）时左右内边距改为 16px

## 例外情况
- 房屋详情 portal-house-body 保持各自布局（右侧照片留白）
- 租赁人员 rental-person-body 保持各自布局（右侧照片留白）

## 改造范围
- PropertyDetailDialog / RentalDetailDialog 去掉正文重复的 margin 与垂直 padding，避免与全局规则叠两层
- 租赁企业/信用弹窗由 32px 改为走全局 40px

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：会话 8088d086 按「首页所有弹窗」统一内边距；租赁企业/信用弹窗由 32px 改为走全局 40px
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue、portal.scss、PropertyDetailDialog.vue、RentalDetailDialog.vue、UnifiedLoginMenuMoreDialog.vue
- 所属项目：门户；来源会话ID：8088d086-ac9e-4292-b17b-9ffd0590a85f；代码基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_detail_padding",
  "source_extraction_id": "e0e7df219ed7408bb18e5d442e1b453c",
  "version": 2,
  "memory_type": "entities"
}
-->