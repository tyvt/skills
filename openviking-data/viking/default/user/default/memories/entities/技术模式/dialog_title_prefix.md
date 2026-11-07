# 弹层页头标题遵循菜单名加商品房前缀
首页「更多」菜单文案为"可售房源信息公示"，弹层标题误用"商品房可售房源展示"。
## 问题根因
- 首页「更多」菜单文案为"可售房源信息公示"
- 弹层标题误用"商品房可售房源展示"与菜单名不一致
## 修复要点
- PortalDialogHost 中 inventory 标题改为"商品房可售房源信息公示"
- 弹层页头仅加"商品房"前缀，后缀保持"信息公示"
- 同步 E2E 与设计稿
## 涉及文件
- zhi2-web-admin/tests/e2e/public-portal-interactions.spec.ts
- zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- zhi2-web-admin/src/views/home/publicPortal/pages/InformationPages.vue
- zhi2-web-admin/src/views/home/publicPortal/portal.scss
- zhi2-web-admin/tests/e2e/fixtures/public-portal-designs.ts
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 来源会话：06427c5a-9173-45f7-a7df-44983a3e8b04
- 验证证据：cursor 会话 06427c5a-9173-45f7-a7df-44983a3e8b04
- 所属项目：门户

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_title_prefix",
  "source_extraction_id": "1d49aac6516c4c9a82922a2614ce2404",
  "version": 1,
  "memory_type": "entities"
}
-->