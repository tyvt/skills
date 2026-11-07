# 门户弹层页头标题命名约定
门户 publicPortal 弹层页头标题须与首页「更多」菜单文案保持一致的后缀规范。

## 问题背景
- 首页「更多」菜单文案为「可售房源信息公示」，弹层蓝色标题栏曾误写为「商品房可售房源展示」
- 与存量房一致的做法：页头只在菜单名前加「商品房」，后缀保持「信息公示」，而非改成「展示」

## 修改与规范
- PortalDialogHost 中 inventory 标题已改为「商品房可售房源信息公示」
- 同步更新 E2E 与设计稿配置里的期望标题
- 重新从首页进入「可售房源信息公示」后，页头应与菜单一致

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 涉及文件：PortalDialogHost.vue、tests/e2e/public-portal-interactions.spec.ts、src 下 publicPortal
- 所属项目：门户；来源会话ID：06427c5a-9173-45f7-a7df-44983a3e8b04；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_dialog_title",
  "source_extraction_id": "8ea22524996d48c6aef67b1869dae806",
  "version": 1,
  "memory_type": "entities"
}
-->