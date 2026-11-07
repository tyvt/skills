# 存量房弹窗独立入口与绿色表头
门户首页存量房「出售信息公示」与商品房「可售房源信息公示」共用入口导致表头混淆的 bug 与修复要点。

## 根因
- 存量房「出售信息公示」和商品房「可售房源信息公示」共用 portal:inventory
- 弹窗标题固定为「商品房可售房源展示」，存量房也显示绿色商品房表头

## 修复要点
- 存量房改为独立入口 portal:stock-inventory
- 标题改为「存量房出售信息公示」，页面内容与原先一致，表头仍为绿色
- 需刷新后点存量房→出售信息公示核对标题

## 涉及文件
- zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
- zhi2-web-admin/src/views/home/publicPortal/pages/InformationPages.vue

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：cursor 会话提取
- 所属项目：门户；来源会话：e9f92d71-8255-4a86-a77b-f58a8d4170ac

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stock_inventory_popup",
  "source_extraction_id": "852f63b02f764f4283bf1f49d7c63473",
  "version": 1,
  "memory_type": "entities"
}
-->